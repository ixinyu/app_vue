<template>
</template>
<script>
// import { Dialog } from 'vant'
import { JSToNativeAPP } from '../utils/common'
export default {
  name: 'GetUser',
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
        // if (!localStorage.getItem('village_info')) {
        //   localStorage.setItem('village_info', data[2]) // 路海朋使用变量
        // }
      }

      // Dialog.alert({
      //   title: '标题',
      //   message: 'village=' + localStorage.getItem('village')
      // }).then(() => {
      // // on close

      // })
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
      // if (!localStorage.getItem('village_info')) {
      //   localStorage.setItem('village_info', params3) // 路海朋使用变量
      // }

      // Dialog.alert({
      //   title: '标题',
      //   message: 'params=' + params + 'params2=' + params2 + 'params3=' + params3
      // }).then(() => {
      //   // on close

      // })
    }
  }
}
</script>
