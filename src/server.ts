import * as path from 'path'
import * as Koa from 'koa'
import * as Router from 'koa-router'
import * as cors from 'koa2-cors'
import * as serve from 'koa-static'
import * as mount from 'koa-mount'
import * as mongoose from 'mongoose'
const websockify = require('koa-websocket')

import { boot } from './core/boot'
import * as session from 'koa-session'

import { UserModel, UserDocument } from './models/user'

const app = websockify(new Koa())
const router = new Router()
const websocketRouter = new Router()

app.keys = ['abcK2?xZ', '12D@KiS::)d', 'kSJDfkjwe(23r}{']

// connect to database
mongoose.connect("mongodb://www.zayfen.com:27017/luckydraw", {
  user: "zayfen",
  pass: "@mongodbKi3358KIN",
  dbName: "luckydraw",
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(_ => {
  console.log("mongodb connected!")
}).catch(err => {
  console.error('mongodb Connection Error: ', err)
  app.emit('db-error', err)
  throw new Error(err)
})

const CONFIG = {
  key: 'sid', 
  maxAge: 86400000,
  autoCommit: true, /** (boolean) automatically commit headers (default true) */
  overwrite: true, /** (boolean) can overwrite or not (default true) */
  httpOnly: true, /** (boolean) httpOnly or not (default true) */
  signed: true, /** (boolean) signed or not (default true) */
  rolling: true, /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
  renew: true, /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
}
// install session
app.use(session(CONFIG, app))

// initialized global
boot(router)

app.use(cors({
  origin: 'http://localhost:8081',
  credentials: true
}))

// render view
const StaticDir: string = path.join(__dirname, '../front/dist/')
app.use(serve(StaticDir))
app.use(mount('/register', serve(StaticDir)))

app.use(router.routes())
app.use(router.allowedMethods())

// websocketRouter.all('/syncUser', (ctx: Router.RouterContext, next: Koa.Next) => {
//   console.log('websocketRouter /syncUser')
//   ctx.request.ctx.websocket.on('message', function (data) {
//     console.log('message: ', data)
//   })
//   let session: string = ctx.query.session
//   console.log("session； ", session)
//   UserModel.find({session: session}).then((docs: UserDocument[]) => {
//     console.log('docs: ', docs)
//     ctx.request.ctx.websocket.send(JSON.stringify({ action: 'AllUsers', data: docs }))
//   })
// })
// app.ws.use(websocketRouter.routes())
app.ws.use(router.routes())

app.on('error', (err: any, ctx: Koa.Context) => {
  console.error("Error: ", err)
})

app.on('db-error', (err: any) => {
  console.error('Database Connection Error')
  process.emit('SIGINT', 'SIGINT')
})

const PORT = process.env.PORT || 8000
app.listen(PORT);


// graceful shutdown here
process.on('SIGINT', async function () {
  console.log('graceful shutdown...')
  await mongoose.disconnect()
})

console.log("Server Running On Port " + PORT)


