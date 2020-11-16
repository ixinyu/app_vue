<template>
  <div>
    <van-tree-select height="100vh" :items="items" :main-active-index.sync="active">
      <template #content>
        <div v-if="active === 0" class="ml20 mt20">
          <div>物业服务</div>
          <div class="flex wrap mt20">
            <div class="si_lis flex column a-center mt20" @click="serviceType(0)">
              <img class="icon_ser" src="../../assets/s_xinwen.png" alt="">
              <span>收费标准</span>
            </div>
            <div class="si_lis flex column a-center mt20" @click="serviceType(1)">
              <img class="icon_ser" src="../../assets/s_gonggao.png" alt="">
              <span>公告通知</span>
            </div>
            <div class="si_lis flex column a-center mt20" @click="serviceType(2)">
              <img class="icon_ser" src="../../assets/fklb.png" alt="">
              <span>门禁钥匙</span>
            </div>
            <div class="si_lis flex column a-center mt20" @click="serviceType(3)">
              <img class="icon_ser" src="../../assets/s_jiaofei.png" alt="">
              <span>我要缴费</span>
            </div>
            <div class="si_lis flex column a-center mt20" @click="serviceType(4)">
              <img class="icon_ser" src="../../assets/s_dianhua.png" alt="">
              <span>常用电话</span>
            </div>
            <div class="si_lis flex column a-center mt20" @click="serviceType(5)">
              <img class="icon_ser" src="../../assets/myrecord.png" alt="">
              <span>门禁教程</span>
            </div>
          </div>
        </div>
        <!-- <div v-if="active === 1" class="ml20 mt20">
          <div>其他服务</div>
        </div> -->
      </template>
    </van-tree-select>
    <getUser />
  </div>
</template>

<script>
import getUser from '../../components/getUser'
import { Dialog } from 'vant'
import { JSToNativeAPP } from '../../utils/common.js'
export default {
  components: {
    getUser
  },
  data() {
    return {
      active: 0,
      items: [{ text: '物业服务' }],
      pigcms_id: '',
      village_id: ''
    }
  },
  mounted() {
    // const village = JSON.parse(localStorage.getItem('village_info')) ? JSON.parse(localStorage.getItem('village_info')) : JSON.parse(localStorage.getItem('village'))
    const village = JSON.parse(localStorage.getItem('village'))
    this.pigcms_id = village.pigcms_id
    this.village_id = village.village_id
  },
  methods: {
    serviceType(idx) {
      if (!this.village_id || !this.pigcms_id) {
        Dialog.confirm({
          title: '提示',
          message: '暂未绑定该社区，去绑定'
        })
          .then(() => {
            // on confirm
            this.$router.push('/')
          })
          .catch(() => {
            // on cancel
          })
        return
      }

      switch (idx) {
        case 0:
          this.$router.push('/chargeStandard')
          break
        case 1:
          this.$router.push('/noticeList')
          break
        case 2:
          JSToNativeAPP('openDoor')
          break
        case 3:
          this.$router.push('/bill')
          break
        case 4:
          this.$router.push('/connectPhone')
          break
        case 5:
          this.$router.push('/guardTutorial')
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.van-sidebar-item--select::before {
  background: #65D7CC;
}
.icon_ser{
  width: 100px;
  height: 100px;
  // padding: 20px;
  // background: #65D7CC;
  border-radius: 50%;
}
.si_lis{
  width: 33%;
}
</style>
