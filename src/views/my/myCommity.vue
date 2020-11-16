<template>
  <div class="mycom">
    <div class="mycomList">
      <div v-for="(item,i) in listdata" :key="i" class="mycom_list flex a-center" @click="item.child_list.length>0?navDetail(item.child_list):''">
        <img class="my_head mr20" src="../../assets/head.jpg" alt="">
        <div class="flex1 flex between column">
          <div class="flex between a-center">
            <div>
              <span>{{ item.name }}</span>
              <span class="tag bgcolor1">业主</span>
              <span v-if="item.status==2" class="jiebang">（申请中）</span>
            </div>
            <div v-if="item.child_list.length>0" class="jiebang">家属/租客>> </div>
            <div v-if="item.status==2" class="del_btn cf" @click="delApply(item.pigcms_id)">删除</div>
          </div>
          <div class="mt10">{{ item.room_address }}</div>
        </div>
      </div>
      <div v-for="item in numlist" :key="item.pigcms_id" class="mycom_list flex a-center">
        <img class="my_head mr20" src="../../assets/head.jpg" alt="">
        <div class="flex1 flex between column">
          <div class="flex between">
            <div>
              <span>{{ item.name }}</span>
              <span :class="[item.type==1?'bgcolor2':'bgcolor3','tag','bgcolor1']">{{ item.type_desc }}</span>
              <span v-if="item.status==2" class="jiebang ml20">({{ item.status_desc }})</span>
            </div>
          </div>
          <div class="mt10">{{ item.room_address }}</div>
        </div>
      </div>
    </div>
    <div class="mc_foot flex">
      <div @click="addRoom">加入房屋</div>
      <div @click="bindFamily">绑定家属</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      listdata: [],
      numlist: []
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      // console.log('aasrew')
      this.$post('HouseApi&a=my_village_list')
        .then((res) => {
          // console.log(res)
          this.listdata = res.result.my_village_list_data
          this.numlist = res.result.my_village_vacancy_data
        })
    },
    navDetail(item) { // 家属租客
      this.$router.push({
        path: '/myComDetail',
        query: {
          childData: JSON.stringify(item)
        }
      })
    },
    delApply(pigcms_id) { // 申请中的删除
      this.$post('HouseApi&a=delete_audit_yezhu', {
        pigcms_id: pigcms_id
      }).then((res) => {
        this.getData()
      })
    },
    addRoom() {
      this.$router.push({
        path: '/',
        query: {
          type: 1
        }
      })
    },
    bindFamily() {
      this.$router.push('/bindFamiky')
    }
  }
}
</script>

<style lang="scss">
.mycom{
  height: 100%;
  background: #f5f5f5;
  overflow-y: auto;
}
.mycomList{
	padding-bottom: 120px;
}
.tag{
  color: #fff;
  padding: 4px 20px;
  margin-left: 10px;
  border-radius: 6px;
}
.bgcolor1{
  background: #ffcf49;
}
.bgcolor2{
  background: #6CA5FF;
}
.bgcolor3{
  background: #1ED19F;
}
.my_head{
  width: 100px;
  height: 100px;
  border-radius: 20px;
}
.jiebang{
  color:#2681F3;
}
.del_btn{
  height: 50px;
  line-height: 50px;
  padding: 0 20px;
  background: #2681F3;
  color:#fff;
  border-radius: 20px;
}
.mycom_list{
  height: 180px;
  background: #fff;
  width: 690px;
  border-radius: 12px;
  margin: 20px auto 0;
  padding: 30px;
  box-sizing: border-box;
}
.mc_foot{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 90px;
  line-height: 90px;
  color:#fff;
  z-index: 3;
  text-align: center;
  font-size: 32px;
}
.mc_foot>div:nth-child(1){
  width: 50%;
  background: #1ED19F;
}
.mc_foot>div:nth-child(2){
  width: 50%;
  background: #2681F3;
}
</style>
