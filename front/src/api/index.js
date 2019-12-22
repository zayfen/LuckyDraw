import Net from '@/utils/net'

function buildUrl(action) {
  return '/api/' + action
}

function createWebsocket (url) {
  if (window.WebSocket) {
    return new window.WebSocket(url)
  }
  if (window.MozWebSocket) {
    return new window.MozWebSocket(url)
  }
  return null
}

class Api {

  static register (name, avatar, session) {
    let url = buildUrl('register')
    return Net.post(url, { avatar, name, session })
  }

  /**
   * @param {string} session
   * @param {Function} onopenFn 
   * @param {Function} onmessgaeFn 
   * @param {*} oncloseFn 
   */
  static syncUser (session, onopenFn, onmessgaeFn, oncloseFn) {
    let host = window.location.host
    let url = 'ws://' + host + '/syncUser?session=' + session
    console.log('url: ', url)
    let websocket = createWebsocket(url)
    if (websocket === null) {
      throw Error('Browser dont support websocket')
    }
    websocket.onopen = function (evt) {
      typeof onopenFn === 'function' && onopenFn(evt)
    }

    websocket.onmessage = function (evt) {
      typeof onmessgaeFn === 'function' && onmessgaeFn(evt)
    }

    websocket.onclose = function (evt) {
      typeof oncloseFn === 'function' && oncloseFn(evt)
    }
  }
}


export default Api
