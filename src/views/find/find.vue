<template>
  <div class="find">
    <div class="fs32">发现更多趣味</div>
    <!-- <div v-for="(item,i) in findData.list" :key="i" class="flex mt20 pb20 bold">
      <img class="f_img" :src="item.pic" alt="">
      <div class="flex column between ml20">
        <div>{{ item.store_name }}</div>
        <div>{{ item.address }}</div>
      </div>
    </div> -->
    <img class="img400" src="../../assets/zanwu.png" alt="">
    <div class="c9 fs24 textCenter">暂无发现内容~</div>
    <getUser />
  </div>
</template>

<script>
import getUser from '../../components/getUser'
export default {
  components: {
    getUser
  },
  data() {
    return {
      findData: ''
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$post('Home&a=plat_recommend', {
        noTip: 'true',
        page: '1'
      }).then((res) => {
        // console.log(res)
        this.findData = res.result
      })
    },
    navDetail(url) {
      this.$router.push(url)
    }
  }
}
</script>

<style lang="scss" scoped>
.find{
  width: 100%;
  padding: 30px;
  box-sizing: border-box;
}
.img400{
  width: 400px;
  height: 400px;
  margin: 40px auto;
}
.f_img{
  width: 200px;
  height: 150px;
}
</style>
