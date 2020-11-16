<template>
  <div class="select_village">
    <div class="ml30">选择小区</div>
    <van-search v-model="village" placeholder="请输入小区名称" @search="onSearch" />
    <div class="mt20">
      <baidu-map class="map-contain" map-type="BMAP_SATELLITE_MAP" @ready="mapReady" />
      <div class="shequ pl30">定位城市：</div>
      <div class="flex between a-center mt20 ml30 mr30">
        <div class="flex a-center">
          <img class="icon_add mr15" src="../../assets/address1.png" alt="">
          <div>浙江省杭州市</div>
        </div>
        <!-- <div class="change_city">切换城市</div> -->
      </div>
    </div>
    <div class="mt20">
      <div class="shequ pl30">社区列表</div>
      <div class="mt20 ml30 mr30" @click="checkVillage">
        <div class="bold villa_lis">xxx小区</div>
        <div class="bold villa_lis">xxx小区</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      village: ''
    }
  },
  methods: {
    checkVillage() {
      this.$router.push('/bindVillage')
    },
    onSearch(val) {
      console.log(val)
    },
    mapReady({ BMap, map }) {
      // 下面注释是百度地图API官方实现方法
      var geolocation = new BMap.Geolocation()
      // 开启SDK辅助定位
      geolocation.enableSDKLocation()
      geolocation.getCurrentPosition(function(r) {
        console.log(r)
      }, {
        enableHighAccuracy: true// 要求浏览器获取最佳结果
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.select_village{
  width: 100%;
  box-sizing: border-box;
  padding: 30px 0;
}
.van-search{
  padding: 10px 30px;
}
.icon_add{
  width: 48px;
  height: 48px;
}
.shequ{
  height: 80px;
  line-height: 80px;
  background: #f5f5f5;
}
.villa_lis{
  height: 80px;
  line-height: 80px;
}
.change_city{
  color:#06C0AD
}
</style>
