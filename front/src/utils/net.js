/* eslint-disable new-cap */

// 请求工具类

import axios from 'axios'

const axiosInstance = axios.create({
  timeout: 5000,
  withCredentials: true
})

// 请求返回的中间拦截, response: {data: Object, status: 200, statusText: "OK", headers: Object, config: Object, request: XMLHttpRequest }
axiosInstance.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

// net 网络请求组件
function net () {
}

net.prototype.get = function (url, params) {
  let _params = params || {}
  return new Promise((resolve, reject) => {
    return axiosInstance.get(url, {params: _params}).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}

net.prototype.post = function (url, params, config) {
  let _params = params || {}
  return new Promise((resolve, reject) => {
    axiosInstance.post(url, _params, config).then(response => {
      resolve(response.data)
    }).catch(err => {
      reject(err)
    })
  })
}

export default new net()
