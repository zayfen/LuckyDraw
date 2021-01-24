import * as Koa from 'koa'

export default async function (ctx: Koa.Context, next: () => Promise<any>) {
  await next()
}
