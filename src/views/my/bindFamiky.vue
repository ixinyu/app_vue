<template>
  <div class="bind_famiky">
    <div>选择要绑定的房屋</div>
    <div class="flex between a-center p30 bgf mt20" @click="selectRoom">
      <div class="c9 flex1">
        <input v-model="room" class="ipt_f1" type="text" disabled placeholder="请选择要绑定的房屋">
      </div>
      <img class="icon_rig" src="../../assets/right.png" alt="">
    </div>
    <div class="mt40">家属身份</div>
    <div class="bg_jiashu">
      <div v-for="(item,y) in bindFamily.role_list" :key="item.type" class="bold pt20 pb20">
        <div class="flex a-center" @click="changeCheck((y+1),item.type)">
          <img class="icon_check mr15" :src="roleChecked==(y+1)?require('../../assets/checked.png'):require('../../assets/check.png')" alt="">
          <span class="fs34">{{ item.name }}</span>
        </div>
        <div v-if="item.relatives_type_desc.length>0&&roleChecked==(y+1)" class="ml55 jiashu pb10 wrap">
          <span v-for="(k,i) in item.relatives_type_desc" :key="k.relatives_type" :class="jiashu==(i+1)?'jsActive':''" @click="changJiashu((i+1),k.relatives_type)">{{ k.name }}</span>
        </div>
      </div>
    </div>
    <div class="mt40">家属信息</div>
    <div class="bgf mt20 radus16">
      <div class="bold">
        <input v-model="username" class="js_xinxi" type="text" placeholder="请输入家属姓名">
      </div>
      <div class="bold">
        <input v-model="sfz" class="js_xinxi" type="text" placeholder="请输入家属身份证号">
      </div>
      <div :class="isShowYzm?'bold':''">
        <input v-model="phone" class="js_xinxi" maxlength="11" type="text" placeholder="请输入家属手机号码" @input="onIpt" @focus="onFocus">
      </div>
      <div v-if="isShowYzm" class="flex between a-center js_xinxi">
        <input v-model="yzm" class="flex1" type="text" placeholder="请输入验证码">
        <div v-if="isShowMiao" class="bg cf yzm"> {{ miao }} s </div>
        <div v-else class="bg cf yzm" @click="getYzm">获取验证码</div>
      </div>
    </div>

    <van-popup v-model="show" class="bf_pop" round position="bottom">
      <div class="mt40 textCenter pb20">- 选择要绑定的房屋 -</div>
      <div class="bl_wrap">
        <div v-for="(item,i) in bindFamily.user_all_village_list_data" :key="i" class="p25 bind_lis fs32 c6" @click="checkRoom(item)">{{ item.room_address }}</div>
      </div>
    </van-popup>
    <div class="bf_btn" @click="bindSure">确认绑定</div>
  </div>
</template>

<script>
import { Toast, Dialog } from 'vant'
export default {
  data() {
    return {
      show: false,
      bindFamily: '',
      room: '',
      phone: '',
      pigcms_id: '',
      village_id: '',
      username: '',
      sfz: '',
      yzm: '', // 验证码
      roleChecked: -1,
      jiashu: -1,
      type: '',
      relatives_type: '',
      isShowYzm: false, // 是否展示验证码
      miao: 60,
      isShowMiao: false
    }
  },
  mounted() {
    this.getData()
  },
  methods: {
    getData() {
      this.$post('HouseApi&a=empty_bind_relatives')
        .then((res) => {
          this.bindFamily = res.result
        })
    },
    selectRoom() {
      this.show = true
    },
    checkRoom(item) {
      this.show = false
      this.room = item.room_address
      this.pigcms_id = item.pigcms_id
      this.village_id = item.village_id
    },
    changeCheck(idx, type) {
      this.roleChecked = idx
      this.type = type
    },
    changJiashu(idx, relatives_type) {
      this.jiashu = idx
      this.relatives_type = relatives_type
    },
    onFocus() {
      if (!this.room) {
        Dialog.alert({
          title: '提示',
          message: '请选择绑定房间'
        }).then(() => {
        // on close
        })
        return
      }
    },
    onIpt() {
      if (this.phone.length === 11) {
        this.$post('HouseApi&a=empty_bind_relatives_user', {
          pigcms_id: this.pigcms_id,
          village_id: this.village_id,
          relatives_user_phone: this.phone
        }).then((res) => {
          // console.log(res)
          if (!res.result.phone) {
            this.isShowYzm = true
          } else {
            this.isShowYzm = false
          }
        })
      }
    },
    getYzm() {
      this.$post('Login&a=sendCode', {
        phone: this.phone,
        type: '4'
      }).then((res) => {
        // console.log(res)
        this.isShowMiao = true
        this.changeMiao()
      })
    },
    changeMiao() {
      var _this = this
      var timer = setInterval(() => {
        _this.miao = _this.miao - 1
        if (_this.miao <= 0) {
          clearInterval(timer)
          _this.isShowMiao = false
          _this.miao = 60
        }
      }, 1000)
    },
    bindAdd() {
      // 绑定
      this.$post('HouseApi&a=bind_relatives_add', {
        type: this.type,
        relatives_type: this.relatives_type,
        pigcms_id: this.pigcms_id,
        name: this.username,
        phone: this.phone,
        id_card: this.sfz
      }).then((res) => {
        // console.log(res)
        Toast(res.result)
        this.$router.go(-1)
      })
    },
    bindSure() {
      console.log(this.room, this.phone)
      var reg = /^1[0-9]{10}$/
      if (!this.room) {
        Toast('请选择绑定房间')
        return
      }
      if (!this.type) {
        Toast('请选择家属身份')
        return
      }
      if (!this.phone) {
        Toast('请输入手机号')
        return
      }
      if (!reg.test(this.phone)) {
        Toast('手机号格式不正确')
        return
      }
      if (this.isShowYzm) {
        if (!this.yzm) {
          Toast('请输入验证码')
          return
        }
      }
      if (!this.isShowYzm) {
        this.bindAdd()
      }

      // 如果用户没有注册，帮用户注册
      if (this.isShowYzm) {
        this.$post('Login&a=login', {
          code: this.yzm,
          phone: this.phone,
          client: '2'
        }).then((res) => {
          console.log(res)
          this.bindAdd()
        })
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.bind_famiky{
  height: 100vh;
  background: #f5f5f5;
  padding: 30px;
  width: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  input{
    border: 0;
    background: none;
  }
  .bgf{
    background: #fff;
    border-radius: 10px;
  }
  .icon_rig{
    width: 30px;
    height: 30px;
  }
  .ipt_f1{
    width: 100%;
  }
  .bind_lis{
    background: #f5f5f5;
    width: 690px;
    box-sizing: border-box;
    margin: 0 auto 40px;
    border-radius: 10px;
  }
  .bf_pop{
    height: 500px;
  }
  .bl_wrap{
    height: 350px;
    overflow-y: auto;
    box-sizing: border-box;
  }
  .bf_btn{
    background: #06C1AE;
    color:#fff;
    font-size: 32px;
    text-align: center;
    height: 90px;
    line-height: 90px;
    border-radius: 45px;
    margin-top: 200px;
  }
  .bg_jiashu{
    padding:0 20px 20px;
    border-radius: 16px;
    box-sizing: border-box;
    margin-top: 20px;
    background: #fff;
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
  .js_xinxi{
    width: 100%;
    height: 90px;
    line-height: 90px;
  }
  .radus16{
    border-radius: 16px;
    padding: 0 20px;
  }
  .yzm{
    height: 60px;
    line-height: 60px;
    width: 200px;
    text-align: center;
    // padding: 0 20px;
    border-radius: 12px;
  }
}
</style>
