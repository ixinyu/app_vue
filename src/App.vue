<template>
  <div id="app">
    <router-view v-wechat-title="$route.meta.title" />
  </div>
</template>
<script>
import { JSToNativeAPP } from './utils/common'
export default {
  name: 'App',
  data() {
    return {

    }
  },
  mounted() {
    // 调用安卓和ios方法,调用安卓方法可以直接得到返回值
    JSToNativeAPP('getUser', '', function(res) {
      if (res) {
        var data = JSON.parse(res)
        localStorage.setItem('ticket', data[0])
        localStorage.setItem('user', data[1])
        localStorage.setItem('village', data[2])
      }
    })

    // Toast('另一种调用')
    // 提供全局方法供 安卓和ios 调用来接收返回的参数
    window.getToken = this.getToken
  },
  methods: {
    getToken(params, params2, params3) {
      localStorage.setItem('ticket', params)
      localStorage.setItem('user', params2)
      localStorage.setItem('village', params3)
    }
  }
}
</script>

<style>
html,body{
  height: 100vh;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  color: #434343;
  font-size: 28px;
  height: 100vh;
  overflow-y: auto;
  overflow-x: hidden;
}
</style>
