<template>
  <div>
    <div class="h104 flex a-center between bold">
      <label class="label" for="phone">手机号码</label>
      <input id="phone" v-model="phone" autocomplete="off" class="flex1" type="text" placeholder="请输入手机号码">
    </div>
    <div class="h104 flex a-center between bold">
      <label class="label" for="yzm">验证码</label>
      <input id="yzm" v-model="code" autocomplete="off" class="flex1" type="text" placeholder="请输入验证码">
      <div v-if="isshow" class="ml20"> {{ '还剩' + min + '秒' }} </div>
      <div v-else class="ml20" @click="sendCode">发送验证码</div>
    </div>
    <div class="h104 flex a-center between bold">
      <label class="label" for="pwd">新密码</label>
      <input id="pwd" v-model="newpwd" autocomplete="off" class="flex1" type="text" placeholder="请输入新密码">
    </div>
    <div class="fs32 cf bg wx_btn" @click="modifyPwd">完成</div>
  </div>
</template>

<script>
import { Toast, Dialog } from 'vant'
export default {
  data() {
    return {
      phone: '',
      newpwd: '',
      code: '',
      isshow: false,
      min: 120
    }
  },
  methods: {
    sendCode() { // 发送验证码
      if (!/^1\d{10}/.test(this.phone)) {
        Toast('手机号不正确')
        return
      }
      this.$post('Login&a=sendCode', {
        phone: this.phone,
        type: '4'
      }).then((res) => {
        // console.log(res)
        this.isshow = true
        var _this = this
        var timer = setInterval(() => {
          if (_this.min <= 0) {
            clearInterval(timer)
            _this.isshow = false
          } else {
            _this.min = _this.min - 1
          }
        }, 1000)
      })
    },
    modifyPwd() { // 完成
      this.$post('Login&a=findPwd', {
        phone: this.phone,
        type: 'chane',
        code: this.code,
        new_pwd: this.newpwd
      }).then((res) => {
        var _this = this
        if (res.errorCode === 0) {
          Dialog.alert({
            title: '提示',
            message: res.result
          }).then(() => {
            // on close
            _this.$router.go(-1)
          })
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.h104{
  width: 702px;
  margin: 0 auto;
  height: 104px;
  line-height: 104px;
  background: #fff;
}
.label{
  width: 140px;
}
input{
  border: 0;
  outline: none;
  height: 100px;
  box-sizing: border-box;
}
.wx_btn{
  width: 702px;
  height: 80px;
  line-height: 80px;
  background: #29C9B9;
  border-radius: 8px;
  margin: 90px auto 0;
  text-align: center;
}
</style>
