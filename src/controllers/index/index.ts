/**
   This is index router
 */
import 'koa-body'
import * as Koa from 'koa'
import { GET, POST, MIDDLEWARE } from '../../core/decorators'
import { BaseRouter, MiddleWare } from '../../core/types'
import { UserModel, UserDocument } from '../../models/user'
import { CheckinListModel, CheckinListDocument } from '../../models/checkin_list'
import { WebSocketManager } from '../../manager/websocket_manager'
import { MongoError } from 'mongodb'

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
    let user = new UserModel({
      user: body.name,
      avatar: body.avatar,
      session: body.session,
      sid: str2hex([body.session, body.name].join('--'))
    })
    try {
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
}

/**
   export: Index Router
*/

export default Index
