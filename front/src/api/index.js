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

  /**
   * 获取签到表
   * @param {string} session 
   */
  static checkinList (session) {
    let url = buildUrl('checkinList')
    return Net.post(url, { session })
  }

  /**
   * 更新或者新增一个白名单
   * @param {string} session 
   * @param {string[]} users 签到表姓名
   */
  static upsertCheckinList (session, users) {
    let url = buildUrl('upsertCheckinList')
    return Net.post(url, { session, users })
  }

  /**
   * 提交一个新的抽奖会话
   */
  static upsertLuckSession ({ session, prizes, count, startTime, luckId }) {
    const url = buildUrl('upsertLuckSession')
    return Net.post(url, { session, prizes, count, startTime, luckId })
  }

  /**
   * 删除一个抽奖会话
   * @param {string} luckId 
   */
  static deleteLuckSession (luckId) {
    const url = buildUrl('deleteLuckSession')
    return Net.post(url, { luckId })
  }

  /**
   * 获取一个session的所有抽奖会话
   */
  static fetchLuckSessions (session) {
    const url = buildUrl('getLucks')
    return Net.get(url, { session })
  }

  static commitLuckyPeople ({ session, luckId, people }) {
    const url = buildUrl('saveLuckyPeople')
    return Net.post(url, { session, luckId, people })
  }

  /**
   * 获取所有的参加抽奖的用户
   * @param {string} session 
   */
  static fetchUsers (session) {
    const url = buildUrl(`sessions/${session}/users`)
    return Net.get(url)
  }
}


export default Api
