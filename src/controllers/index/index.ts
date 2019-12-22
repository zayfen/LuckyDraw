/**
   This is index router
 */
import * as Koa from 'koa'
import { GET, POST, MIDDLEWARE } from '../../core/decorators'
import { BaseRouter, MiddleWare } from '../../core/types'
import 'koa-body'
import { UserModel, UserDocument } from '../../models/user'
import { WebSocketManager } from '../../manager/websocket_manager'
import { MongoError } from 'mongodb'

class Index implements BaseRouter {
  prefix: string = '/'
  name: string = '张云峰'

  public classMiddlewares(): Array<MiddleWare | string> {
    return ['auth']
  }

  @POST('/api/register')
  public async register(ctx: Koa.Context) {
    let body: { avatar: string, name: string, session: string } = ctx.request.body
    let user = new UserModel({
      user: body.name,
      avatar: body.avatar,
      session: body.session
    })
    try {
      let response: UserDocument = await user.save()
      let websocket = WebSocketManager.getInstance().getWebSocket(body.session)
      if (websocket) {
        websocket.send(JSON.stringify({ action: 'NewUser', data: body }))
      }
      ctx.body = { code: 0, message: 'success', data: response }
    } catch (error) {
      console.log('/api/register error: ', error)
      let mongoError = error as MongoError
      ctx.body = { code: mongoError.code, message: mongoError.errmsg }
    }
  }


  @GET('/syncUser')
  public syncUser(ctx: Koa.Context) {
    console.log('websocketRouter /syncUser')
    ctx.websocket.on('message', function (data) {
      console.log('message: ', data)
    })
    let session: string = ctx.query.session
    if (!WebSocketManager.getInstance().saveWebSocket(session, ctx.websocket)) {
      // websocket this session bound already existed.
      return ctx.websocket.close(100, 'websocket this session bound already existed')
    }

    console.log("session: ", session, 'websocket url: ', ctx.websocket)
    UserModel.find({ session: session }).then((docs: UserDocument[]) => {
      console.log('docs: ', docs)
      ctx.websocket.send(JSON.stringify({ action: 'AllUsers', data: docs }))
    })
  }
}

/**
   export: Index Router
*/

export default Index
