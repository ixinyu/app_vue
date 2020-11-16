<template>
  <div class="mt20">
    <div class="h104 flex a-center between bold" @click="modifyPwd">
      <div>密码修改</div>
      <img class="icon_rig" src="../../assets/right.png" alt="">
    </div>
    <div class="h104 flex a-center between bold" @click="goProblem">
      <div>问题反馈</div>
      <img class="icon_rig" src="../../assets/right.png" alt="">
    </div>

    <div class="fs32 h92 f_btn" @click="logout">退出登录</div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { JSToNativeAPP } from '../../utils/common.js'
export default {
  methods: {
    modifyPwd() { // 修改密码
      this.$router.push('/modifyPwd')
    },
    goProblem() { // 问题反馈
      this.$router.push('/feedback')
    },
    logout() { // 退出登录
      Dialog.confirm({
        title: '提示',
        message: '确认要退出登录吗'
      })
        .then(() => {
          // on confirm
          JSToNativeAPP('logout')
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.icon_rig{
  width: 18px;
  height: 18px;
}
.h104{
  width: 702px;
  margin: 0 auto;
  height: 104px;
  line-height: 104px;
  background: #fff;
}
.h92{
  height: 92px;
  line-height: 92px;
  text-align: center;
  color: #FA5252;
}
.f_btn{
  position: fixed;
  bottom: 68px;
  width: 100%;
  background: #F6F7FA;
}
</style>
