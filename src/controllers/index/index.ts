/**
   This is index router
 */
import 'koa-body'
import * as Koa from 'koa'
import { GET, POST, MIDDLEWARE } from '../../core/decorators'
import { BaseRouter, MiddleWare } from '../../core/types'
import { UserModel, UserDocument } from '../../models/user'
import { CheckinListModel, CheckinListDocument } from '../../models/checkin_list'
import { LuckModel, LuckDocument } from '../../models/luck'
import { LuckyPeopleDocument, LuckyPeopleModel } from '../../models/lucky_people'
import { WebSocketManager } from '../../manager/websocket_manager'
import { MongoError } from 'mongodb'
import Config from '../../../config/index'

const Minio = require('minio')

function str2hex (str: string): string {
  return Buffer.from(str, 'utf-8').toString('hex')
}

const client = new Minio.Client({
  endPoint: Config.minio.endpoint,
  port: Config.minio.port,
  useSSL: Config.minio.useSSL,
  accessKey: Config.minio.accessKey,
  secretKey: Config.minio.secretKey
})


class Index implements BaseRouter {
  prefix: string = '/'
  name: string = '张云峰'

  public classMiddlewares(): Array<MiddleWare | string> {
    return ['auth']
  }

  // 文件上传
  @GET('/api/minio/presignedUrl')
  public async fetchPresignedUrl (ctx: Koa.Context) {
    // ctx.response.set("Access-Control-Allow-Origin", "*");
    // ctx.response.set("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    // ctx.response.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    
    const fileName = ctx.request.query.name
    const res = await client.presignedPutObject('public', 'images/' + fileName)
    const visitUrl = res.split('?')[0]
    console.log('/presignedUrl: ', res, ' ; visitUrl: ', visitUrl)
    ctx.body = { code: 0, data: { url: res, visit_url: visitUrl }}
  }

  @POST('/api/register')
  public async register (ctx: Koa.Context) {
    let body: { avatar: string, name: string, session: string } = ctx.request.body
    let sid: string = str2hex([body.session, body.name].join('--'))
    let user = new UserModel({
      user: body.name,
      avatar: body.avatar,
      session: body.session,
      sid: sid
    })

    try {
      // check user if in checkinlist
      let found = await CheckinListModel.findOne({ session: body.session })
      let checkinListUsers = found.users || []
      if (checkinListUsers.indexOf(body.name) < 0) { // 此用户不在白名单中
        return ctx.body = { code: -2, message: '非法用户，请联系管理员添加用户!' }
      }
      
      let userDoc: UserDocument = await user.save()
      let message: string = JSON.stringify({ action: 'NewUser', data: { user: userDoc.user, avatar: userDoc.avatar, session: userDoc.session } })
      WebSocketManager.getInstance().dispatchSessionMessage(body.session, message)
      ctx.body = { code: 0, message: 'success', data: userDoc }
    } catch (error) {
      console.log('/api/register error: ', error)
      let mongoError = error as MongoError
      ctx.body = { code: mongoError.code, message: mongoError.errmsg }
    }
  }

  @POST('/api/checkinList')
  public async checkinList (ctx: Koa.Context) {
    let body: { session: string } = ctx.request.body
    console.log('/api/checkinList body: ', body)
    try {
      let value = await CheckinListModel.findOne({ session: body.session })
      console.log('CheckinListModel.findOne: ', value)
      ctx.body = { code: 0, message: 'success', data: value ? value.users : [] }
    } catch (err) {
      console.log("CheckinListModel.findOne error: ", err)
      let mongoError = err as MongoError
      ctx.body = { code: mongoError.code, message: mongoError.errmsg }
    }
  }

  @POST('/api/upsertCheckinList')
  public async upsertCheckinList (ctx: Koa.Context) {
    let body: { session: string, users: string[] } = ctx.request.body
    console.log('/api/upsertCheckinList body: ', body)
    try {
      await CheckinListModel.updateOne({ session: body.session }, { session: body.session, users: body.users }, { upsert: true })
      ctx.body = { code: 0, message: 'success' }
    } catch (error) {
      let mongoError = error as MongoError
      ctx.body = { code: mongoError.code, message: mongoError.errmsg }
    }
  }

  @GET('/syncUser')
  public onWebSocketConnection(ctx: Koa.Context) {
    console.log('websocketRouter /syncUser')
    ctx.websocket.on('message', function (data) {
      console.log('message: ', data)
    })
    let session: string = ctx.query.session
    WebSocketManager.getInstance().saveWebSocket(session, ctx.websocket)

    console.log("session: ", session, 'websocket url: ', ctx.websocket.url)
    UserModel.find({ session: session }).then((docs: UserDocument[]) => {
      console.log('docs: ', docs)
      WebSocketManager.getInstance().dispatchSessionMessage(session, JSON.stringify({ action: 'AllUsers', data: docs }))
    })
  }

  @GET('/api/sessions/:session/users')
  public async fetchSessionUsers (ctx: Koa.Context) {
    const { session } = ctx.params
    console.log("/api/sessions/session: ", ctx.params)
    try {
      const users = await UserModel.find({ session })
      console.log('/api/sessions/', users)
      ctx.body = { code: 0, message: 'success', data: users }
    } catch (err) {
      const error = err as MongoError
      ctx.body = { code: error.code, message: error.errmsg }
    }
  }


  // 创建一个新的奖品抽奖
  @POST('/api/upsertLuckSession')
  public async createLuck (ctx: Koa.Context) {
    let { session, prizes, count, startTime, luckId } = ctx.request.body
    luckId = luckId || (session + '-' + startTime)

    console.log(`/api/createLuck  session: ${session}; prizes: ${prizes}; count: ${count}; startTime: ${startTime}`)
    const model = {
      session,
      prizes,
      count,
      startTime: startTime,
      luckId
    }

    try {
      const luckDoc = await LuckModel.updateOne({ luckId }, model, { upsert: true })
      // const luckDoc: LuckDocument = await luck.save()
      console.log('/api/createLuck response; ', luckDoc)
      ctx.body = { code: 0, message: 'success', data: luckDoc }
    } catch (err) {
      const mongoError = err as MongoError
      console.log('/api/createLuck error: ', err) 
      ctx.body = { code: mongoError.code, message: mongoError.errmsg }
    }
  }

  // 删除一个抽奖会话
  @POST('/api/deleteLuckSession')
  public async deleteLuckSession (ctx: Koa.Context) {
    const { luckId } = ctx.request.body
    try {
      const lm = await LuckModel.remove({ luckId })
      ctx.body = { code: 0, message: 'success', data: lm }

    } catch (err) {

      const mongoErr = err as MongoError
      console.log('/api/deleteLuckSession error: ', err)
      ctx.body = { code: mongoErr.code, message: mongoErr.errmsg }
    }
  }

  @GET('/api/getLucks')
  public async getLucks (ctx: Koa.Context) {
    const { session } = ctx.request.query
    try {
      const luckDocs = await LuckModel.find({ session })
      // console.log(`/api/getLucks session: ${session} ; luckDocs: ${luckDocs}`)
      const luckyPeopleDocs = await LuckyPeopleModel.find({ session })
      
      ctx.body = { code: 0, message: 'success', data: { luckSessions: luckDocs, luckyPeople: luckyPeopleDocs } }
    } catch (err) {
      const me = err as MongoError
      ctx.body = { code: me.code, message: me.errmsg }
    }
  }


  @POST('/api/saveLuckyPeople')
  public async saveLuckyPeople (ctx: Koa.Context) {
    const { session, luckId, people } = ctx.request.body
    console.log('/api/saveLuckyPeople', ctx.request.body)
    const luckyPeople = new LuckyPeopleModel({
      session,
      luckId: luckId,
      users: people
    })

    try {
      // 更新luck的状态
      await LuckModel.updateOne({ luckId: luckId }, { finished: true }, { upsert: true })
      const luckyPeopleDoc: LuckyPeopleDocument = await luckyPeople.save()
      ctx.body = { code: 0, message: 'success', data: luckyPeopleDoc }

    } catch (err) {
      const mongoError = err as MongoError
      ctx.body = { code: mongoError.code, message: mongoError.errmsg }
    }
  }


  @GET('/api/queryLuckyPeople')
  public async queryLuckyPeople (ctx: Koa.Context) {
    const { luckId } = ctx.request.query
    console.log('/api/queryLuckyPeople: ', ctx.request.query)
    try {
      const luckyPeopleDoc = await LuckyPeopleModel.findOne({ luckId })
      ctx.body = { code: 0, message: 'success', data: luckyPeopleDoc.users }

    } catch (err) {
      const mongoError = err as MongoError
      ctx.body = { code: mongoError.code, message: mongoError.errmsg }
    }
  }
}

/**
   export: Index Router
*/

export default Index
