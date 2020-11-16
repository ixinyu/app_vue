<template>
  <div class="bind_rool">
    <div v-if="roolData" class="bind_top fs28">
      <div>{{ roolData.find_info.village_name }}（{{ roolData.find_info.house_address }}）</div>
      <div class="flex a-center mt20">
        <img class="img_address mr15" src="../../assets/address.png" alt="">
        <div>{{ roolData.find_info.village_address }}</div>
      </div>
    </div>
    <div class="rool_top">
      <div class="br_block p30">
        <div>我的角色</div>
        <div>
          <div v-for="(item,y) in roolData.role_list" :key="item.type" class="bold pb20">
            <div class="flex mt20 a-center" @click="changeCheck((y+1),item.type)">
              <img class="icon_check mr15" :src="roleChecked==(y+1)?require('../../assets/checked.png'):require('../../assets/check.png')" alt="">
              <span class="fs34">{{ item.name }}</span>
            </div>
            <div v-if="item.relatives_type_desc.length>0&&roleChecked==(y+1)" class="ml55 jiashu pt20 pb10">
              <span v-for="(k,i) in item.relatives_type_desc" :key="k.relatives_type" :class="jiashu==(i+1)?'jsActive':''" @click="changJiashu((i+1),k.relatives_type,item.type)">{{ k.name }}</span>
            </div>
          </div>
        </div>
      </div>
      <div v-if="roolData.room_true_find_status == 1" class="br_block pb30">
        <div class="lp_tit">请输入业主手机后四位 {{ roolData.room_true_find.test_phone }}</div>
        <van-password-input
          :value="lastPhone"
          length="4"
          :mask="false"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
        />
        <van-number-keyboard
          :show="showKeyboard"
          @input="onInput"
          @delete="onDelete"
          @blur="showKeyboard = false"
        />
      </div>
      <div class="br_block">
        <div class="mb20 pl30 pt30">申请人信息</div>
        <van-cell-group>
          <van-field
            v-model="username"
            required
            label="姓名"
            placeholder="请输入姓名"
          />
          <van-field
            v-model="phone"
            required
            label="手机号"
            placeholder="请输入手机号"
          />
          <van-field
            v-model="sfz"
            required
            label="身份证号"
            placeholder="请输入身份证号"
          />
        </van-cell-group>
      </div>
      <div class="br_sure fs30" @click="sure">确定</div>
    </div>
  </div>
</template>

<script>
import { Toast, Dialog } from 'vant'
import { JSToNativeAPP } from '../../utils/common'
export default {
  data() {
    return {
      pigcms_id: '',
      username: '',
      phone: '',
      sfz: '',
      roleChecked: '',
      jiashu: '',
      showKeyboard: false,
      lastPhone: '',
      roolData: '',
      type: '', // 角色类型
      relatives_type: '' // 家属关系
    }
  },
  mounted() {
    this.pigcms_id = this.$route.query.pigcms_id
    this.getData()
  },
  methods: {
    getData() {
      this.$post('HouseApi&a=empty_village_room_info', {
        pigcms_id: this.pigcms_id
      }).then((res) => {
        // console.log(res)
        this.roolData = res.result
        this.phone = res.result.user_phone
      })
    },
    sure() {
      console.log(this.type)
      if (!this.username) {
        Toast('请输入姓名')
        return
      }
      if (!this.phone) {
        Toast('请输入手机号')
        return
      }
      if (this.type === '') {
        Toast('请选择家属身份')
        return
      }
      if (!this.sfz) {
        Toast('请输入身份证号')
        return
      }
      this.$post('HouseApi&a=village_room_info_add', {
        type: this.type,
        relatives_type: this.relatives_type,
        pigcms_id: this.pigcms_id,
        name: this.username,
        phone: this.phone,
        id_card: this.sfz,
        dataList: [],
        master_phone: this.lastPhone
      }).then((res) => {
        // console.log(res)
        var _this = this
        if (res.errorCode === 0) {
          Dialog.alert({
            title: '提示',
            message: res.result || res.errorMsg
          }).then(() => {
            _this.$router.go(-2) // 返回到绑定之前的页面
            JSToNativeAPP('idxPage')
          })
        }
      })
    },
    changeCheck(idx, type) {
      this.roleChecked = idx
      this.relatives_type = ''
      this.jiashu = ''
      this.type = type
    },
    changJiashu(idx, relatives_type, type) {
      this.type = type
      this.jiashu = idx
      this.relatives_type = relatives_type
    },
    onInput(key) {
      // console.log(key)
      this.lastPhone = (this.lastPhone + key).slice(0, 4)
    },
    onDelete() {
      this.lastPhone = this.lastPhone.slice(0, this.lastPhone.length - 1)
    }
  }
}
</script>

<style lang="scss" scoped>
.bind_rool{
  height: 100vh;
  background: #f5f5f5;
  padding-bottom: 100px;
  box-sizing: border-box;
}
.br_block{
  background: #fff;
  margin-top: 20px;
}
.bind_top{
  height: 130px;
  background: rgb(6, 193, 174);
  color: #fff;
  font-weight: bold;
  padding: 10px 30px;
  box-sizing: border-box;
}
.br_sure{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 90px;
  line-height: 90px;
  text-align: center;
  background: #06C1AE;
  color:#fff;
  margin: 50px auto 0;
}
.img_address{
  width: 20px;
  height: 25px;
}
.jiashu span{
  padding: 10px 20px;
  background: #F4F4F4;
  margin: 20px 40px 0 0;
  border-radius: 8px;
}
.icon_check{
  width: 40px;
  height: 40px;
}
.jsActive{
  color: #06C1AE;
}
.lp_tit{
  height: 90px;
  line-height: 90px;
  margin-left: 30px;
}
</style>
