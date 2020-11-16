<template>
  <div class="flex column a-center">
    <textarea v-model="text" class="border" style="resize:none;" placeholder="请填写4字以上的反馈信息" />
    <div class="btn mt50" @click="sure">提交</div>
  </div>
</template>

<script>
import { Dialog, Toast } from 'vant'
export default {
  name: 'Feedback',
  data() {
    return {
      text: ''
    }
  },
  methods: {
    sure() {
      var _this = this
      // console.log(this.text)
      if (this.text.length > 4) {
        Dialog.confirm({
          title: '提示',
          message: '提交成功'
        })
          .then(() => {
            // on confirm
            _this.$router.push('/my')
          })
          .catch(() => {
            // on cancel
          })
      } else {
        Toast('请输入4个字以上反馈')
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.border{
  width: 690px;
  height: 200px;
  margin: 40px auto;
  border:1px solid #eee;
}
.btn{
  width: 690px;
  height: 80px;
  line-height: 80px;
  background: #14BD79;
  color: #fff;
  text-align: center;
  border-radius: 40px;
}
</style>
