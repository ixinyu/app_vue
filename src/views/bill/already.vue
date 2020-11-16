<template>
	<div class="already">
		<van-tabs v-model="active" type="card" @click="onClick">
			<van-tab title="待缴费">
				<div v-for="(item,index) in list" :key="index" class="tip_box_data" @click="itemCheck(item)">
					<div class="check-box">
						<div>
							<van-checkbox v-model="item.checked" class="checkbox" />
						</div>
					</div>
					<div class="bigbox">
						<div class="contentbox">
							<div class="text">{{ item.name }}</div>
							<div v-if="item.paid_cycle" class="title">有账单</div>
						</div>
						<div class="textnum">
							<div class="num">￥{{ item.money }}</div>
							<div class="right-icon">
								<img src="../../assets/right.png" class="right-img">
							</div>
						</div>
					</div>
				</div>
			</van-tab>
			<van-tab title="已缴费">
				<div v-if="is.isBillList">
					<div v-for="(item,index) in billList" :key="index" class="cardbox">
						<div class="leftbox">
							<div class="text">{{ item.name }}</div>
							<div class="title">缴费时间：{{ item.time }}</div>
						</div>
						<div class="textnum">
							<div class="num" style="color: #000000;">￥{{ item.money }}</div>
							<div class="right-icon">
								<img src="../../assets/right.png" class="right-img">
							</div>
						</div>
					</div>
				</div>
				<div v-else>
					<div class="tip_box_no_data">
						<img class="no_data_img" src="../../assets/no_data.png">
						<div class="no_tip_content">
							<p>暂无缴费信息~</p>
						</div>
					</div>
				</div>
			</van-tab>
		</van-tabs>
		<div v-if="active === 0" class="pay-bottom">
			<div class="check-box1">
				<label class="uni-list-cell uni-list-cell-pd" @click="allCheck">
					<div>
						<van-checkbox v-model="checked" class="checkbox" />
					</div>
				</label>
			</div>
			<div class="paybox">
				<div class="payminbox">
					<div class="allpay">全选</div>
					<div class="allpaynum">合计：￥{{ num }}</div>
				</div>
				<div class="gopay" @click="gopay">去支付</div>
			</div>
		</div>
		<div v-if="active === 0" class="independent_payment" @click="goAutonomy">
			<img src="../../assets/independent.png" class="independent-img">
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
				num: 0,
				active: this.$route.query.user && JSON.parse(this.$route.query.user).active ? JSON.parse(this.$route.query.user).active :
					0,
				checked: false,
				form: {
					village_id: JSON.parse(window.localStorage.getItem('village')).village_id,
					pigcms_id: JSON.parse(window.localStorage.getItem('village')).pigcms_id
				},
				list: [],
				billList: [],
				is: {
					isBillList: false
				},
				all_post: []
			}
		},
		mounted() {
			this.getList()
		},
		methods: {
			gopay() {
				if (!this.num) {
					return Dialog.alert({
						message: '请选择缴费项目和金额'
					}).then(() => {})
				}
				const data = JSON.parse(JSON.stringify(this.form))
				data.all_post = this.all_post
				data.money = this.num
				this.$post('HouseApi&a=all_go_pay', data).then(r => {
					window.location.href = r.result.order_url + '&ticket=' + localStorage.getItem('ticket')
				})
			},
			onClick(name, title) {
				if (name) { // 已缴费
					this.getBillList()
				}
			},
			getBillList() {
				const data = JSON.parse(JSON.stringify(this.form))
				data.order_type = 'all'
				this.$post('HouseApi&a=village_my_pay_list', data).then(r => {
					this.billList = r.result.order_list
					if (this.billList.length) {
						this.is.isBillList = true
					}
				})
			},
			getList() {
				this.$post('HouseApi&a=village_my_pay', this.form).then(r => {
					for (const i of r.result.pay_list) {
						i.checked = false
					}
					this.list = r.result.pay_list
				})
			},
			allCheck() {
				for (const i of this.list) {
					i.checked = !i.checked
				}
				this.heji()
			},
			itemCheck(item) {
				item.checked = !item.checked
				this.heji()
			},
			heji() {
				let num = 0
				this.all_post = []
				for (const i of this.list) {
					if (i.checked == true) {
						i.text = '点击查看账单详情'
						this.all_post.push(i)
						num += i.money
					}
				}
				this.num = num
			},
			goAutonomy() {
				this.$router.push({
					path: '/autonomy',
					query: {
						user: this.$route.query.user
					}
				})
			}
		}
	}
</script>
<style>
	.already .van-tabs__nav--card {
		margin: 0;
		border-color: rgb(6, 193, 174);
	}

	.already .van-tabs__nav--card .van-tab.van-tab--active {
		background-color: rgb(6, 193, 174);
	}

	.already .van-tabs__nav--card .van-tab {
		border-right: rgb(6, 193, 174);
		color: rgb(6, 193, 174);
	}

	.already .van-tabs__nav--card .van-tab.van-tab--active {
		color: #fff;
	}
</style>
<style lang="scss" scoped>
	.tip_box_no_data {
		padding-top: calc((100vh - 80px - 588px - 80px -21px)/2);
		font-size: 28px;
		text-align: center;
	}

	.tip_box_no_data img {
		width: 70%;
		margin: 0 auto;
	}

	.tip_box_no_data .tip_title {
		width: 100%;
		text-align: center;
	}

	.already {
		height: 100vh;
		background-color: #f4f4f4;
	}

	.tip_box_data {
		margin-top: 20px;
		background: #FFFFFF;
		display: flex;
		justify-content: flex-start;
		padding: 30px;
	}

	.right-icon {
		width: 30px;
		height: 30px;
	}

	.right-img {
		width: 100%;
		height: 100%;
	}

	.check-box {
		padding-top: 10px;
		padding-right: 10px;
	}

	.check-box1 {
		margin-left: 15px;
		margin-right: 10px;
	}

	.bigbox {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		width: 100%;
	}

	.contentbox {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.text {
		font-size: 30px;
		font-weight: 700;
		font-stretch: normal;
		line-height: 60px;
		letter-spacing: 0px;
		color: #333333;
	}

	.title {
		font-size: 24px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 60px;
		letter-spacing: -1px;
		color: #9aabbc;
	}

	.textnum {
		display: flex;
		flex-direction: row;
		align-items: center;
	}

	.num {
		font-size: 28px;
		font-weight: 700;
		font-stretch: normal;
		line-height: 60px;
		letter-spacing: -1px;
		color: #ff6666;
		margin-right: 15px;
	}

	.pay-bottom {
		position: fixed;
		width: 100%;
		height: 100px;
		background: #FFFFFF;
		bottom: 0;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.paybox {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.payminbox {
		width: 100%;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.allpay {
		width: 100px;
		font-size: 32px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 60px;
		letter-spacing: -1px;
		color: #c7c7c7;
	}

	.allpaynum {
		width: 100%;
		font-size: 30px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 60px;
		color: #2681f3;
	}

	.gopay {
		width: 400px;
		text-align: center;
		font-size: 32px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 100px;
		letter-spacing: -1px;
		background: #2681f3;
		color: #ffffff;
	}

	.independent_payment {
		position: fixed;
		bottom: 165px;
		right: 24px;
		width: 102px;
		height: 102px;
		border-radius: 102px;
	}

	.independent-img {
		width: 100%;
		height: 100%;
		border-radius: 102px;
	}

	.cardbox {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-radius: 10px;
		background: #FFFFFF;
		margin-top: 30px;
		padding: 15px;
	}

	.cardbox:first-child {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		border-radius: 10px;
		background: #FFFFFF;
		padding: 15px;
	}
</style>
