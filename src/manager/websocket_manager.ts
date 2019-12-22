
import * as ws from 'ws'

type WebSocket = ws

export const WebSocketReadyState = {
  CONNECTION: 0,  /* 正在连接中 */
  OPEN: 1, /* 已连接，可以通行 */
  CLOSING: 2, /** 连接正在关闭 */
  CLOSED: 3 /** 连接已关闭 */
}

export interface WebSocketWrapper {
  key: string,
  websocket: WebSocket
}

export interface CacheWebSocket {
  [key: string]: WebSocketWrapper
}

export class WebSocketManager {

  private cache: CacheWebSocket = {}
  private static instance: WebSocketManager = null

  public getWebSocket (key: string): WebSocket | null {
    if (this.cache[key]) {
      return this.cache[key].websocket
    }
    return null
  }

  public saveWebSocket (key: string, websocket: WebSocket): WebSocketWrapper | null {
    if (this.getWebSocket(key) !== null && this.isWebSocketAlive(this.getWebSocket(key))) {
      return null
    }
    this.cache[key] = { key: key, websocket: websocket }
    return this.cache[key]
  }

  public isWebSocketAlive (webSocket: WebSocket): boolean {
    return webSocket.readyState === WebSocketReadyState.CONNECTION || webSocket.readyState === WebSocketReadyState.OPEN
  }

  public closeWebSocket (webSocket: WebSocketWrapper, code: number, reason: string): void {
    webSocket.websocket.close(code, reason)
    delete this.cache[webSocket.key]
  }


  public static getInstance (): WebSocketManager {
    if (WebSocketManager.instance == null) {
      WebSocketManager.instance = new WebSocketManager()
    }
    return WebSocketManager.instance
  }

}



