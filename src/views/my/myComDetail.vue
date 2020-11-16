<template>
  <div class="jiashu">
    <div>我的家属/租客</div>
    <div v-for="(item,i) in childData" :key="i" class="flex between a-center mt20 bold pb20">
      <div class="flex a-center">
        <img class="lg_head mr20" :src="item.child_avatar" alt="">
        <div>
          <div>{{ item.name }}</div>
          <div :class="[item.type==1?'bgcolor2':'bgcolor3','cf','mt10']">{{ item.type_desc }}</div>
        </div>
        <!-- <div v-if="item.status == 1">
          <div style="width: 100rpx;height: 60rpx;display: flex;justify-content: flex-end;align-items: center;" @tap="deletefamily(item.pigcms_id,item.village_id)">
            <div class="delete">
              <image src="../../../static/images/delete.png" class="delete-img" />
            </div>
          </div>
        </div>
        <div v-if="item.status == 2">
          <div class="ml20">
            <div class="untieBtn" @tap="confirmbind(item.village_id,item.pigcms_id)">确认绑定</div>
            <div class="untieBtn1" style="color: #2681f3;" @tap="openPopups(item.village_id,item.pigcms_id)">拒绝绑定</div>
          </div>
        </div> -->
      </div>
      <img class="icon_del" src="../../assets/del.png" alt="" @click="isDel(item)">
    </div>
  </div>
</template>

<script>
import { Dialog, Toast } from 'vant'
export default {
  data() {
    return {
      childData: []
    }
  },
  mounted() {
    this.childData = JSON.parse(this.$route.query.childData)
  },
  methods: {
    isDel(item) {
      var _this = this
      Dialog.confirm({
        title: '提示',
        message: '确实删除吗'
      })
        .then(() => {
          // on confirm
          _this.$post('HouseApi&a=delete_bind', {
            pigcms_id: item.pigcms_id,
            village_id: item.village_id
          }).then((res) => {
            // console.log(res)
            Toast(res)
          })
        })
        .catch(() => {
          // on cancel
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.jiashu{
  padding: 20px 30px;
  width: 100%;
  box-sizing: border-box;
  .lg_head{
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  .icon_del{
    width: 40px;
    height: 40px;
    padding: 10px 25px;
  }
  .bgcolor2{
    width: 90px;
    text-align: center;
    background: #6CA5FF;
    border-radius: 6px;
  }
  .bgcolor3{
    width: 90px;
    text-align: center;
    background: #1ED19F;
    border-radius: 6px;
  }
}

</style>
