<template>
  <div class="login">
    <div class="fs40 textCenter">欢迎登录</div>
    <div class="mt120 bold">
      <input v-model="phone" class="ipt" type="text" placeholder="请输入手机号">
    </div>
    <div class="flex between a-center bold">
      <input v-model="pwd" class="ipt" type="text" placeholder="请输入密码">
      <!-- <div class="yzm">获取验证码</div> -->
    </div>
    <div class="login_btn mt50 textCenter" @click="login">登录</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      phone: '',
      pwd: ''
    }
  },
  methods: {
    login() {
      //
      this.$post('Login&a=login', {
        code: '',
        phone: this.phone,
        passwd: this.pwd
      }).then((res) => {
        // console.log(res)
        localStorage.setItem('ticket', res.result.ticket)
        localStorage.setItem('user', JSON.stringify(res.result.user))
        const obj = {
          village_id: res.result.village_info.village_id,
          pigcms_id: res.result.user_bind_info.pigcms_id
        }
        localStorage.setItem('village', JSON.stringify(obj))

        this.$router.push('/my')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.login{
  width: 100%;
  padding: 32px;
  box-sizing: border-box;
  .ipt{
    border:0;
    height: 80px;
    line-height: 80px;
  }
  .yzm{
    background: #06c1ae;
    color: #fff;
    padding: 10px 20px;
    border-radius: 10px;
  }
  .login_btn{
    background: #06c1ae;
    color: #fff;
    height: 80px;
    line-height: 80px;
    border-radius: 10px;
  }
}
</style>
