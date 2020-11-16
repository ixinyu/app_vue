<template>
  <div>
    <div class="bind_top fs28">
      <div>{{ village_info.village_name }}</div>
      <div class="flex a-center mt20">
        <img class="img_address mr15" src="../../assets/address.png" alt="">
        <div>{{ village_info.village_address }}</div>
      </div>
    </div>
    <div class="flex bind_btm">
      <div :class="[unitList.length>0?'wid25':'wid100','flex','column','htaotu']">
        <div v-for="(item,i) in buildList" :key="i" :class="[buildIdx==i?'active':'deActive','build']" @click="clickBuild(item,i)">{{ item.single_name }}</div>
      </div>
      <div v-if="unitList.length>0" :class="[pliesList.length>0?'wid25':'wid75','flex','column','boldlf','htaotu']" class="flex column">
        <div v-for="(item,i) in unitList" :key="i" :class="[unitIdx==i?'active':'deActive','build']" @click="clickUnit(item,i)">{{ item.floor_name }}</div>
      </div>
      <div v-if="pliesList.length>0" :class="[roomList.length>0?'wid25':'wid50','boldlf','htaotu']" class="flex column">
        <div v-for="(item,i) in pliesList" :key="i" :class="[pliesIdx==i?'active':'deActive','build']" @click="clickPlies(item,i)">{{ item.layer_name }}</div>
      </div>
      <div v-if="roomList.length>0" class="flex column htaotu boldlf wid25">
        <div v-for="(item,i) in roomList" :key="i" :class="[roomIdx==i?'active':'deActive','build']" @click="clickRoom(item,i)">{{ item.room }}</div>
      </div>
    </div>
  </div>
</template>
<script>
import { Dialog } from 'vant'
export default {
  data() {
    return {
      buildList: [],
      unitList: [],
      pliesList: [],
      roomList: [],
      buildIdx: -1,
      unitIdx: -1,
      pliesIdx: -1,
      roomIdx: -1,
      village_info: ''
    }
  },
  mounted() {
    this.village_info = JSON.parse(this.$route.query.village_info)
    console.log(JSON.parse(this.$route.query.village_info))
    this.getData()
  },
  methods: {
    getData() { // 获取楼栋
      this.$post('HouseApi&a=village_single_list', {
        village_id: this.village_info.village_id
      }).then((res) => {
        this.buildList = res.result.single_list
        if (!this.buildList.length) {
          Dialog.alert({
            title: '提示',
            message: '该小区下没有楼栋，请联系物业添加'
          }).then(() => {
          // on close
          })
        }
      })
    },
    getDanYuan(item) { // 获取单元
      this.$post('HouseApi&a=village_unit_list', {
        village_id: item.village_id,
        single_id: item.single_id
      }).then((res) => {
        this.unitList = res.result.unit_list
        if (!this.unitList.length) {
          Dialog.alert({
            title: '提示',
            message: '该楼栋下没有单元，请联系物业添加或选择其他单元'
          }).then(() => {
          // on close
          })
        }
      })
    },
    getFloor(item) { // 获取楼层
      this.$post('HouseApi&a=get_village_layer_list', {
        village_id: item.village_id,
        floor_id: item.floor_id
      }).then((res) => {
        this.pliesList = res.result.data_list
        if (!this.pliesList.length) {
          Dialog.alert({
            title: '提示',
            message: '该单元下没有楼层，请联系物业添加或选择其他楼层'
          }).then(() => {
            // on close
          })
        }
      })
    },
    getRoom(item) { // 获取房间
      this.$post('HouseApi&a=empty_village_room_new_list', {
        village_id: item.village_id,
        layer_id: item.layer_id
      }).then((res) => {
        this.roomList = res.result.vacancy_list
        if (!this.roomList.length) {
          Dialog.alert({
            title: '提示',
            message: '该单元下没有房间，请联系物业添加或选择其他楼层'
          }).then(() => {
            // on close
          })
        }
      })
    },
    clickBuild(item, i) {
      // console.log(item)
      this.buildIdx = i
      this.getDanYuan(item)
      this.unitIdx = -1
      this.unitList = []
      this.pliesList = []
      this.roomList = []
    },
    clickUnit(item, idx) {
      this.unitIdx = idx
      this.getFloor(item)
      this.pliesIdx = -1
      this.pliesList = []
      this.roomList = []
    },
    clickPlies(item, idx) {
      this.pliesIdx = idx
      this.getRoom(item)
      this.roomIdx = -1
    },
    clickRoom(item, idx) {
      // console.log(item)
      this.roomIdx = idx
      // this.$router.push('/bindRool')
      this.$router.push({
        path: '/bindRool',
        query: {
          pigcms_id: item.pigcms_id
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.bind_top{
  height: 130px;
  background: rgb(6, 193, 174);
  color: #fff;
  font-weight: bold;
  padding: 10px 30px;
  box-sizing: border-box;
}
.bind_btm{
  height: calc(100vh - 130px);
}
.active{
  color: #f8c717;
}
.deActive{
  color: #666;
}
.htaotu{
  height: 100%;
  overflow-y: auto;
}
.wid100{
  width: 100%;
}
.wid75{
  width: 75%;
}
.wid50{
  width: 50%;
}
.wid25{
  min-width: 25%;
}
.boldlf{
  border-left: 1px solid #eee;
}
.build{
  padding: 20px 0;
  border-bottom: 1px solid #eee;
  margin-left: 15px;
}
.img_address{
  width: 20px;
  height: 25px;
}
</style>
