import axios from 'axios'
import { JSToNativeAPP } from '../utils/common'
// import { getToken } from './auth'
import { Toast, Dialog } from 'vant'
const baseUrl = '/' // 基础路径
var type = ''
// 创建axios实例
const http = axios.create({
  baseURL: baseUrl, // api的base_url
  timeout: 15000 // 请求超时时间
})

// http request 拦截器
http.interceptors.request.use(config => {
  if (type == 'formdata') {
    config.headers = {
      'content-type': 'multipart/form-data'
    }
  }
  return config
},
error => {
  return Promise.reject(error)
}
)

// http response 拦截器
http.interceptors.response.use(response => {
  if (response.data.errorCode === 0) {
    return response.data
  } if (response.data.errorCode === '20120004' || response.data.errorCode === '20120002' || response.data.errorCode === '30000001') {
    Dialog.confirm({
      title: '提示',
      message: response.data.errorMsg
    })
      .then(() => {
        JSToNativeAPP('toBind')
        // on confirm
        // window.location.href = 'https://001.ruer.coboriel.com/packapp/community/#/'
      })
      .catch(() => {
        // on cancel
      })
  } else {
    Toast(response.data.errorMsg)
  }
  return response.data
},
error => {
  alert('err')
  return Promise.reject(error)
}
)

export function get(url, params = {}, contentType) {
  type = contentType
  params['Device-Id'] = 'packapp'
  params.now_lang = ''
  params.wxapp_type = 'village'
  params.app_type = 'packapp'
  params.app_version = '1510'
  // params.ticket = process.env.NODE_ENV === 'production' ? localStorage.getItem('ticket'):''
  params.ticket = localStorage.getItem('ticket')
  return http({
    url: 'appapi.php?c=' + url,
    method: 'get',
    params
  })
}

export function post(url, data, contentType) {
  if (!data) {
    data = {}
  }
  type = contentType
  data['Device-Id'] = 'packapp'
  data.now_lang = ''
  data.wxapp_type = 'village'
  data.app_type = 'packapp'
  data.app_version = '1510'
  if (url !== 'Login&a=login') { // 登录没有tiket参数
    // data.ticket = process.env.NODE_ENV === 'production' ? localStorage.getItem('ticket')
    data.ticket = localStorage.getItem('ticket')
  }

  return http({
    url: 'appapi.php?c=' + url,
    method: 'post',
    data
  })
}

// export default http

