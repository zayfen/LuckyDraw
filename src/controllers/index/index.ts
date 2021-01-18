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
import { textChangeRangeIsUnchanged } from 'typescript'

function str2hex (str: string): string {
  return Buffer.from(str, 'utf-8').toString('hex')
}

class Index implements BaseRouter {
  prefix: string = '/'
  name: string = '张云峰'

  public classMiddlewares(): Array<MiddleWare | string> {
    return ['auth']
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
      ctx.body = { code: 0, message: 'success', data: value.users }
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


  // 创建一个新的奖品抽奖
  @POST('/api/createLuck')
  public async createLuck (ctx: Koa.Context) {
    const { session, prizes, count } = ctx.request.body
    console.log(`/api/createLuck  session: ${session}; prizes: ${prizes}; count: ${count}`)
    const luck = new LuckModel({
      session,
      prizes,
      count
    })

    try {
      const luckDoc: LuckDocument = await luck.save()
      ctx.body = { code: 0, message: 'success', data: luckDoc }
    } catch (err) {
      const mongoError = err as MongoError
      ctx.body = { code: mongoError.code, message: mongoError.errmsg }
    }
  }

  @GET('/api/getLatestLuck')
  public async getLatestLuck (ctx: Koa.Context) {
    const { session: string, currentLuckId: number } = ctx.request.query
    try {
      const luckDoc = LuckModel.findOne({ session,  luckId: currentLuckId + 1 })

    } catch (err) {
      const me = err as MongoError
      ctx.body = { code: me.code, message: me.errmsg }
    }
  }


  @POST('/api/saveLuckyPeople')
  public async saveLuckyPeople (ctx: Koa.Context) {
    const { session, luckId, luckPeople } = ctx.request.body
    const luckyPeople = new LuckyPeopleModel({
      session: session,
      luckId: luckId,
      users: luckPeople
    })

    try {
      const luckyPeopleDoc: LuckyPeopleDocument = await luckyPeople.save()
      ctx.body = { code: 0, message: 'success', data: luckyPeopleDoc }

    } catch (err) {
      const mongoError = err as MongoError
      ctx.body = { code: mongoError.code, message: mongoError.errmsg }
    }
  }



  @GET('/api/queryLuckyPeople')
  public async queryLuckyPeople (ctx: Koa.Context) {
    const { session, luckId } = ctx.request.query
  }
}

/**
   export: Index Router
*/

export default Index
