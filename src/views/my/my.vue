<template>
  <div class="my">
    <div class="my_head">
      <div class="flex a-center pb30 bold" @click="goSet">
        <img class="top_head" :src="myData.user?myData.user.avatar:'../../assets/head.jpg'" alt="">
        <div class="ml25">
          <div class="fs32 b">{{ myData.user?myData.user.name:'' }}</div>
          <div class="mt10 fs26 c8c">{{ myData.user?myData.user.address:'' }}</div>
        </div>
      </div>
      <div class="flex between mt30 pl15 pr15">
        <div class="flex column a-center mtwrap" @click="goTopNav(1)">
          <img class="icon_mytop" src="../../assets/myHome.png" alt="">
          <div class="fs24 mt15">我的小区</div>
        </div>
        <div class="flex column a-center mtwrap" @click="goTopNav(2)">
          <img class="icon_mytop" src="../../assets/mepay.png" alt="">
          <div class="fs24 mt15">生活缴费</div>
          <span v-if="myData.data.un_pay_num>0" class="fs22 cf flex a-center">{{ myData.data?myData.data.un_pay_num:'' }}</span>
        </div>
        <div class="flex column a-center mtwrap" @click="goTopNav(3)">
          <img class="icon_mytop" src="../../assets/mesteward.png" alt="">
          <div class="fs24 mt15">访客管理</div>
          <span v-if="myData.data.un_visit_record>0" class="fs22 cf flex a-center">{{ myData.data?myData.data.un_visit_record:'' }}</span>
        </div>
        <div class="flex column a-center mtwrap" @click="goTopNav(4)">
          <img class="icon_mytop" src="../../assets/meupload.png" alt="">
          <div class="fs24 mt15">上传门禁</div>
          <i v-if="myData.data&&!myData.data.is_bind_face" class="fs20 c8c flex a-center">未上传</i>
        </div>
      </div>
    </div>
    <div class="my_cen">
      <img class="my_banner" src="../../assets/mybanner.png" alt="">
    </div>
    <div class="my_block">
      <a class="wuye flex a-center" :href="'tel:'+myData.data.today_phone">
        <img class="wy_dianhua" src="../../assets/s_dianhua.png" alt="">
        <div class="ml25">
          <div>物业值班电话：{{ myData.data?myData.data.today_phone:'' }}</div>
          <div class="mt10 c8c fs22">有问题，物业帮你解决</div>
        </div>
        <div class="boda fs22 cf ml40">去拨打</div>
      </a>
      <div class="h104 bold flex a-center between" @click="goListNav(1)">
        <div class="flex a-center">
          <img class="icon_lf" src="../../assets/myrecord.png" alt="">
          <span>缴费记录</span>
        </div>
        <img class="icon_rig" src="../../assets/right.png" alt="">
      </div>
      <div class="h104 bold flex a-center between" @click="goListNav(2)">
        <div class="flex a-center">
          <img class="icon_lf" src="../../assets/fklb.png" alt="">
          <span>访客列表</span>
        </div>
        <img class="icon_rig" src="../../assets/right.png" alt="">
      </div>
    </div>
    <getUser />
  </div>
</template>

<script>
import getUser from '../../components/getUser'
import { Dialog } from 'vant'
export default {
  components: {
    getUser
  },
  data() {
    return {
      myData: {},
      pigcms_id: '',
      village_id: ''
    }
  },
  mounted() {
    const village = JSON.parse(localStorage.getItem('village'))
    // console.log(village)
    this.pigcms_id = village.pigcms_id
    this.village_id = village.village_id
    if (this.village_id && this.pigcms_id) {
      this.getData()
    } else {
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
    }
  },
  methods: {
    getData() {
      this.$post('HouseApi&a=village_my', {
        pigcms_id: this.pigcms_id,
        village_id: this.village_id
      }).then((res) => {
        // console.log(res)
        this.myData = res.result || {}
        // console.log(res.result)
      })
    },
    goTopNav(item) { // 我的top nav
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
      switch (item) {
        case 1:
          this.$router.push({
            path: '/myCommity'
          })
          break
        case 2:
          this.$router.push({ path: '/bill', query: { user: JSON.stringify(this.myData) }})
          break
        case 3:
          this.$router.push('/visitor-index')
          break
        case 4:
          this.$router.push({ path: '/upImg', query: { user: JSON.stringify(this.myData) }})
          break
        default:
          break
      }
    },
    goListNav(item) {
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
      switch (item) {
        case 1:
          this.myData.active = 1
          this.$router.push({ path: '/bill', query: { user: JSON.stringify(this.myData) }})
          break
        case 2:
          this.$router.push('/visitor-list')
          break
        default:
          break
      }
    },
    goSet() {
      this.$router.push('/myset')
    }
  }
}
</script>

<style lang="scss" scoped>
.my {
    height: 100%;
    background: #f5f5f5;
    overflow-y: auto;
    box-sizing: border-box;
    .my_head{
      width: 702px;
      height: 383px;
      background: #fff;
      border-radius: 12px;
      margin: 24px auto;
      padding: 42px 24px 32px;
      box-sizing: border-box;
    }
    .my_cen{
      width: 702px;
      height: 200px;
      margin: 24px auto;
    }
    .top_head {
      width: 140px;
      height: 140px;
      border-radius: 50%;
   }
    .icon_mytop{
      width: 56px;
      height: 56px;
    }
    .mtwrap{
      position: relative;
      span,i{
        position: absolute;
        top: -10px;
        right: 0px;
        height: 30px;
        // line-height: 30px;
        padding: 0 10px;
        border-radius: 15px;
        background: #ED5348;
      }
      i{
        right: -40px;
        background: #EFEFEF;
      }
    }
    .my_banner{
      width: 702px;
      height: 200px;
      background: #fff;
      border-radius: 12px;
      margin: 24px auto;
    }
    .my_block{
      width: 702px;
      background: #FFFFFF;
      border-radius: 12px;
      margin: 24px auto;
      padding: 32px 24px;
      box-sizing: border-box;
      .wuye{
        width: 654px;
        background: #F8F8FA;
        border-radius: 12px;
        margin: 0 auto;
        padding: 32px 0 32px 24px ;
        box-sizing: border-box;
        .wy_dianhua{
          width: 66px;
          height: 66px;
        }
        .boda{
          width: 110px;
          height: 50px;
          line-height: 50px;
          background: #29C9B9;
          border-radius: 6px;
          text-align: center;
        }
      }
      .h104{
        height: 104px;
        line-height: 104px;
      }
      .icon_lf {
        width: 40px;
        height: 40px;
        margin-right: 20px;
      }
      .icon_rig{
        width: 18px;
        height: 18px;
      }
    }
}
</style>
