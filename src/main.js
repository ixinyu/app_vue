import Vue from 'vue'
import Vant from 'vant'
import 'vant/lib/index.css'
import '@/styles/base.scss'
import 'lib-flexible'
import { get, post } from './utils/http.js'
import wx from 'weixin-js-sdk'
import router from '@/router/index'
import App from './App.vue'
import VueWechatTitle from 'vue-wechat-title'
import _ from 'lodash'
import BaiduMap from 'vue-baidu-map'

Vue.use(VueWechatTitle)
Vue.use(BaiduMap, {
  ak: '6TbzSt8r0vF3voZZqLWINiVMT3SazmMy'
})

// Vue.prototype.$http = http
Vue.prototype.$get = get
Vue.prototype.$post = post
Vue.prototype.$wx = wx
Vue.config.productionTip = false
Vue.prototype._ = _
Vue.use(Vant)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

