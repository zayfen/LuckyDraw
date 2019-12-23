
import * as ws from 'ws'
import { throwStatement } from '@babel/types'

type WebSocket = ws

export const WebSocketReadyState = {
  CONNECTION: 0,  /* 正在连接中 */
  OPEN: 1, /* 已连接，可以通行 */
  CLOSING: 2, /** 连接正在关闭 */
  CLOSED: 3 /** 连接已关闭 */
}

export interface WebSocketWrapper {
  session: string,
  websockets: Array<WebSocket>
}

export interface CacheWebSocket {
  [session: string]: WebSocketWrapper
}

export class WebSocketManager {

  private cache: CacheWebSocket = Object.create(null)
  private maxSessions: number = 10
  private static instance: WebSocketManager = null

  public getWebSockets (session: string): Array<WebSocket> {
    if (this.cache[session]) {
      return this.cache[session].websockets
    }
    return []
  }

  public setMaxSessions (max: number): void {
    this.maxSessions = max
  }

  public sessionsFull (): boolean {
    return Object(this.cache).length >= this.maxSessions
  }

  public isNewSession (session: string): boolean {
    return Object.keys(this.cache).indexOf(session) < 0
  }

  public saveWebSocket (session: string, websocket: WebSocket): void {
    if (this.sessionsFull() && this.isNewSession(session)) {
      this.clearDeadWebSocket()
    }
    if (this.sessionsFull() && this.isNewSession(session)) {
      console.log('reach max sessions')
      return
    }

    if (this.getWebSockets(session).length === 0) {
      this.cache[session] = { session: session, websockets: [] }
    }
    console.log('cache[', session, '] websockets ', this.cache[session].websockets.length)
    this.cache[session].websockets.push(websocket)
  }

  public isWebSocketAlive (webSocket: WebSocket): boolean {
    return webSocket.readyState === WebSocketReadyState.CONNECTION || webSocket.readyState === WebSocketReadyState.OPEN
  }

  public closeWebSocket (websocket: WebSocket, code: number, reason: string): void {
    if (!websocket) {
      return
    }
    websocket.close(code, reason)
  }

  /**
   * 关闭会话
   * @param session 回话id
   * @param code 关闭会话的code
   * @param reason 关闭会话的原因
   */
  public closeSeesion (session: string, code: number, reason: string): void {
    let websocketWrapper = this.cache[session]
    websocketWrapper.websockets.forEach((ws: WebSocket) => {
      if (this.isWebSocketAlive(ws)) {
        this.closeWebSocket(ws, code, reason)
      }
    })
    delete this.cache[session]
  }

  public sendMessage (websocket: WebSocket, message: string): void {
    if (!websocket || !this.isWebSocketAlive(websocket)) {
      console.log('websocket is null or dead, can\'t send ', message)
      return
    }
    console.log('sendMessage: ', message)
    websocket.send(message)
  }

  public dispatchSessionMessage (session: string, message: string): void {
    let websockets: Array<WebSocket> = this.getWebSockets(session)
    if (websockets.length === 0) {
      return
    }
    console.log('dispatchSessionMessage: ')
    websockets.forEach((ws: WebSocket) => {
      console.log('alive: ', this.isWebSocketAlive(ws))
      if (this.isWebSocketAlive(ws)) {
        this.sendMessage(ws, message)
      }
    })
  }

  public resetSessionWebSockets (session: string, websockets: Array<WebSocket>): void {
    if (this.cache[session]) {
      this.cache[session].websockets = websockets
    }
  }

  public isEmptySession (session: string): boolean {
    return !this.cache[session] || this.cache[session].websockets.length === 0
  }

  public clearSessionDeadWebSocket (session: string): void {
    let newWebSockets: Array<WebSocket> = this.getWebSockets(session).filter((ws: WebSocket) => this.isWebSocketAlive(ws))
    this.resetSessionWebSockets (session, newWebSockets)
    if (this.isEmptySession(session)) {
      delete this.cache[session]
    }
  }

  public clearDeadWebSocket (): void {
    let sessions: Array<string> = Object.keys(this.cache)
    sessions.forEach(session => this.clearSessionDeadWebSocket(session))
  }

  public static getInstance (): WebSocketManager {
    if (WebSocketManager.instance == null) {
      WebSocketManager.instance = new WebSocketManager()
    }
    return WebSocketManager.instance
  }
}



