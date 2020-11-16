<template>
  <div class="autonomy">
    <div class="container">
      <div class="top-head" style="background:rgb(6, 193, 174)">
        <div class="address-icon">
          <img src="../../assets/addressicon.png" class="address-img">
        </div>
        <div class="address-text">{{ user.user.address }}</div>
      </div>
      <div class="title">缴费事项</div>
      <input
        v-model="pay_name"
        type="text"
        class="inp-box"
        value=""
        placeholder-style="font-size: 28px;font-weight: normal;font-stretch: normal;line-height: 60px;letter-spacing: 0px;color: #c3c3c3;"
        placeholder="请填写缴费的事项"
      >
      <div class="title">缴费金额</div>
      <input
        v-model="money"
        type="digit"
        class="inp-box"
        value=""
        placeholder-style="font-size: 28px;font-weight: normal;font-stretch: normal;line-height: 60px;letter-spacing: 0px;color: #c3c3c3;"
        placeholder="请输入缴纳的费用（元）"
      >
      <div class="btn">
        <button type="primary" class="btn-pry" @click="goPay">去缴费</button>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Dialog
} from 'vant'
export default {
  data() {
    return {
      pay_name: '',
      money: '',
      village_info: JSON.parse(localStorage.getItem('village')),
      user: JSON.parse(this.$route.query.user)
    }
  },
  mounted() {
  },
  methods: {
    goPay() {
      if (!this.pay_name) {
        return Dialog.alert({
          message: '请选择缴费事项'
        }).then(() => {})
      }
      if (!this.money) {
        return Dialog.alert({
          message: '请选择缴费金额'
        }).then(() => {})
      }

      const data = {
        village_id: this.village_info.village_id,
        vacancy_id: this.village_info.vacancy_id,
        pigcms_id: this.village_info.pigcms_id,
        pay_name: this.pay_name,
        money: this.money
      }

      data.pay_type = 'custom'
      this.$post('HouseApi&a=custom_pay', data).then(r => {
        window.location.href = r.result.order_url + '&ticket=' + localStorage.getItem('ticket')
      })
    }
  }
}
</script>

<style lang="scss" scoped>
	.autonomy {
		height: 100vh;
		background: rgb(245, 245, 245);
	}

	.container {
		margin: 0;
		padding: 0;
	}

	.top-head {
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;
	}

	.address-icon {
		width: 20px;
		height: 30px;
		margin-right: 15px;
	}

	.address-img {
		display: block;
		width: 100%;
		height: 100%;
	}

	.address-text {
		font-size: 28px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 100px;
		letter-spacing: 0px;
		color: #ffffff;
	}

	.title {
		margin-left: 30px;
		font-size: 26px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 80px;
		color: #333333;
	}

	.inp-box {
		border: none;
		width: 80%;
		background: #FFFFFF;
		margin: 0px 30px;
		padding: 30px;
		border-radius: 10px;
	}

	.btn {
		margin: 74px 0px;
		height: 100%;
		width: 100%;
		text-align: center;
	}

	.btn-pry {
		border: none;
		color: #fff;
		margin: 0 auto;
		width: 550px;
		height: 98px;
		background: rgb(6, 193, 174);
		border-radius: 49px;
		line-height: 98px;
		margin-top: 220px;
	}
</style>
