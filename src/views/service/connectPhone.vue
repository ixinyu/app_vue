<template>
  <div class="con_phone">
    <div v-for="(item,i) in phoneList" :key="i" class="cp_block">
      <div>{{ item.cat_name }}</div>
      <div v-for="(k,y) in item.phone_list" :key="y" class="cpb_btm mt20">
        <div class="flex between a-center h100 pl30 pr30">
          <span>{{ k.name }}</span>
          <a class="flex a-center" :href="'tel:'+k.phone">
            <span>{{ k.phone }}</span>
            <img class="icon_rig ml10" src="../../assets/right.png" alt="">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      village_id: '',
      pigcms_id: '',
      phoneList: []
    }
  },
  mounted() {
    const village = JSON.parse(localStorage.getItem('village'))
    this.pigcms_id = village.pigcms_id
    this.village_id = village.village_id
    this.getData()
  },
  methods: {
    getData() {
      this.$post('HouseApi&a=house_phone', {
        village_id: this.village_id,
        pigcms_id: this.pigcms_id
      }).then((res) => {
      // console.log(res)
        this.phoneList = res.result.phone_list
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.con_phone{
  height: 100%;
  background: #f5f5f5;
}
.cp_block{
  padding: 30px;
}
.cpb_btm{
  background: #fff;
  border-radius: 20px;
  overflow: hidden;
}
.h100{
  height: 100px;
}
.icon_rig{
  width: 30px;
  height: 30px;
}
</style>
