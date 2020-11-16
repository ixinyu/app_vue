<template>
	<div class="mycom">
		<van-tabs v-model="active" type="card" @click="onClick">
		  <van-tab title="未审核">
		   <van-list v-if="is.isList" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
		   	<div class="mycom_list flex a-center" v-for="(item,index) in list" :key='index'>
		   		<img class="my_head mr20" :src="item.img" alt="">
		   		<div class="flex1 flex between column">
		   			<div class="flex between a-center">
		   				<div>
		   					<span>{{item.username}}</span>
		   					<span class="jiebang">{{getStatus(item.status)}}</span>
		   				</div>
		   				<div class="del_btn cf bgcolorred" v-if="item.status == '0'" @click="delApply('2',item)">拒绝</div>
		   			</div>
		   			<div class="flex between a-center mt10">
		   				<div class="mt10">{{item.create_time}}</div>
		   				<div class="del_btn cf" v-if="item.status == '0'" @click="confirm(item)">通过</div>
		   			</div>
		   		</div>
		   	</div>
		   </van-list>
		  </van-tab>
		  <van-tab title="已通过">
		   <van-list v-if="is.isList" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
		   	<div class="mycom_list flex a-center" v-for="(item,index) in list" :key='index'>
		   		<img class="my_head mr20" :src="item.img" alt="">
		   		<div class="flex1 flex between column">
		   			<div class="flex between a-center">
		   				<div>
		   					<span>{{item.username}}</span>
		   					<span class="jiebang">{{getStatus(item.status)}}</span>
		   				</div>
		   				<div class="del_btn cf bgcolorred" v-if="item.status == '0'" @click="delApply('2',item)">拒绝</div>
		   			</div>
		   			<div class="flex between a-center mt10">
		   				<div class="mt10">{{item.create_time}}</div>
		   				<div class="del_btn cf" v-if="item.status == '0'" @click="confirm(item)">通过</div>
		   			</div>
		   		</div>
		   	</div>
		   </van-list>
		  </van-tab>
		  <van-tab title="已拒绝">
		   <van-list v-if="is.isList" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
		   	<div class="mycom_list flex a-center" v-for="(item,index) in list" :key='index'>
		   		<img class="my_head mr20" :src="item.img" alt="">
		   		<div class="flex1 flex between column">
		   			<div class="flex between a-center">
		   				<div>
		   					<span>{{item.username}}</span>
		   					<span class="jiebang">{{getStatus(item.status)}}</span>
		   				</div>
		   				<div class="del_btn cf bgcolorred" v-if="item.status == '0'" @click="delApply('2',item)">拒绝</div>
		   			</div>
		   			<div class="flex between a-center mt10">
		   				<div class="mt10">{{item.create_time}}</div>
		   				<div class="del_btn cf" v-if="item.status == '0'" @click="confirm(item)">通过</div>
		   			</div>
		   		</div>
		   	</div>
		   </van-list>
		  </van-tab>
		  <van-tab title="全部">
		   <van-list v-if="is.isList" v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
		   	<div class="mycom_list flex a-center" v-for="(item,index) in list" :key='index'>
		   		<img class="my_head mr20" :src="item.img" alt="">
		   		<div class="flex1 flex between column">
		   			<div class="flex between a-center">
		   				<div>
		   					<span>{{item.username}}</span>
		   					<span class="jiebang">{{getStatus(item.status)}}</span>
		   				</div>
		   				<div class="del_btn cf bgcolorred" v-if="item.status == '0'" @click="delApply('2',item)">拒绝</div>
		   			</div>
		   			<div class="flex between a-center mt10">
		   				<div class="mt10">{{item.create_time}}</div>
		   				<div class="del_btn cf" v-if="item.status == '0'" @click="confirm(item)">通过</div>
		   			</div>
		   		</div>
		   	</div>
		   </van-list>
		  </van-tab>
		</van-tabs>
		
		
		
		<div v-if="!is.isList" calss="zanwu">
			<img class="zanwu-img" src="../../assets/zanwu.png">
			<div class="zanwu-text">暂无访客数据</div>
		</div>
		<van-popup ref="popup" v-model="show" type="center" class="villageHousePopup">
			<div class="popup-box">
				<div class="popup-img1">
					<img src="../../assets/bg1.png" class="icon-img1">
				</div>
				<div class="popup-img pigcmsIdView">请选择户号</div>
				<div class="popup-list">
					<div v-for="(item,index) in ownerList" :key="index" class="popup-card" @click="delApply('1',item)">{{ item.address }}</div>
				</div>
				<div class="popup-btnl" @click="close">
					<img src="../../assets/guanbi.png" class="popup-img2">
				</div>
			</div>
		</van-popup>
	</div>
</template>

<script>
	import {
		Dialog,
		Toast
	} from 'vant'
	export default {
		data() {
			return {
				show: false,
				list: [],
				form: {
					page: 0
				},
				active:0,
				loading: false,
				finished: false,
				is: {
					isList: true
				},
				ownerList: [],
				status: [
					{
						id: 0,
						name: '申请中'
					},
					{
						id: 1,
						name: '业主同意'
					},
					{
						id: 2,
						name: '业主拒绝'
					}
				],
				id: ''
			}
		},
		mounted() {},
		methods: {
			onClick(name, title) {
			    this.search(name)
			},
			getStatus(id) {
				for (const i of this.status) {
					if (id == i.id) return i.name;
				}
			},
			confirm(item) {
				this.id = item.id
				if (item.address) {
					this.delApply('1', item)
				} else {
					this.getOwnerList()
				}
			},
			close() {
				this.show = false
			},
			getOwnerList() {
				this.$post('HouseApi&a=getRoom', {
					// village_id:'19'
					village_id: JSON.parse(localStorage.getItem('village')).village_id
				}).then(r => {
					if (r.code == '200') {
						this.ownerList = r.data
					} else {
						Toast(r.msg)
					}
					if (this.ownerList.length) {
						this.show = true
					}
				})
			},
			onLoad() {
				this.finished = false
				this.loading = true
				this.form.status = this.active
				this.form.page += 1
				this.getData()
			},
			getData() {
				this.$post('HouseApi&a=visitor_list_new', this.form).then((r) => {
					if (r && r.result && r.result.length) {
						this.list = this.list.concat(r.result)
					} else {
						this.finished = true
					}
					if (this.list.length) {
						this.is.isList = true
					} else {
						this.is.isList = false
					}
					this.loading = false
				})
			},
			search(status) {
				if(status < 3){
					this.form.status = status
				}else{
					delete this.form.status
				}
				this.finished = false
				this.loading = true
				this.form.page = 1
				this.list = []
				this.getData()
			},
			delApply(status, item) { // 申请中的删除
				var _this = this;
				let data = {
					id: item.id || this.id,
					status: status
				};
				if (status == '1') {
					if (item.address)
						data.address = item.address

					if (item.single_id)
						data.single_id = item.single_id

					if (item.floor_id)
						data.floor_id = item.floor_id

					if (item.layer_id)
						data.layer_id = item.layer_id

					if (item.vacancy_id)
						data.vacancy_id = item.vacancy_id
				}
				if (this.show) {
					_this.$post('HouseApi&a=examineVisitor', data).then((res) => {
						Toast(res.errorMsg || res.msg)
						this.show = false
						this.search()
					})
				} else {
					Dialog.confirm({
							title: '提示',
							message: '确定进行操作'
						})
						.then(() => { // 确定
							_this.$post('HouseApi&a=examineVisitor', data).then((res) => {
								Toast(res.errorMsg || res.msg)
								_this.show = false
								_this.search()
							})
						})
						.catch(() => { // 取消
						})
				}
			}
		}
	}
</script>
<style>
	.mycom .van-tabs__nav--card{
	  margin: 0;
	  border-color: rgb(6, 193, 174);
	}
	.mycom .van-tabs__nav--card .van-tab.van-tab--active{
	  background-color: rgb(6, 193, 174);
	}
	.mycom .van-tabs__nav--card .van-tab{
		border-right: rgb(6, 193, 174);
		color: rgb(6, 193, 174);
	}
	.mycom .van-tabs__nav--card .van-tab.van-tab--active{
		color: #fff;
	}
	</style>
<style lang="scss">
	
	.villageHousePopup {
		overflow-y: visible;
	}

	.zanwu-img {
		width: 400px;
		height: 400px;
		margin: 150px 175px 40px;
	}

	.zanwu-text {
		text-align: center;
		color: #868686;
	}

	.mycom {
		height: 100%;
		background: #f5f5f5;
		overflow-y: auto;
	}

	.tag {
		color: #fff;
		padding: 4px 20px;
		margin-left: 10px;
		border-radius: 6px;
	}

	.my_head {
		width: 100px;
		height: 100px;
		border-radius: 20px;
	}

	.jiebang {
		color: #2681F3;
	}

	.del_btn {
		height: 50px;
		line-height: 50px;
		padding: 0 20px;
		background: #2681F3;
		color: #fff;
		border-radius: 20px;
	}

	.mycom_list {
		height: 180px;
		background: #fff;
		width: 690px;
		border-radius: 12px;
		margin: 20px auto;
		padding: 30px;
		box-sizing: border-box;
	}

	.mc_foot {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 90px;
		line-height: 90px;
		color: #fff;
		z-index: 3;
		text-align: center;
		font-size: 32px;
	}

	.mc_foot>div:nth-child(1) {
		width: 50%;
		background: #1ED19F;
	}

	.mc_foot>div:nth-child(2) {
		width: 50%;
		background: #2681F3;
	}

	.bgcolorred {
		background: red;
	}

	.bgcolor1 {
		background: #ffcf49;
	}

	.bgcolor2 {
		background: #6CA5FF;
	}

	.bgcolor3 {
		background: #1ED19F;
	}

	.popup-box {
		width: 610px;
		height: 720px;
		border-radius: 10px;
	}

	.popup-img {
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: 100px;
	}

	.popup-img1 {
		width: 300px;
		height: 300px;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		top: -150px;
	}

	.pigcmsIdView {
		font-size: 40px;
		font-weight: 600;
		color: #333;
	}

	.icon-img1 {
		width: 100%;
		height: 100%;
	}

	.popup-list {
		position: absolute;
		top: 185px;
		width: 540px;
		height: 560px;
		border-radius: 10px;
		overflow: hidden;
	}

	.popup-card {
		width: 439px;
		height: 77px;
		border-radius: 10px;
		font-size: 30px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 77px;
		letter-spacing: 0px;
		color: #333333;
		border-radius: 5px;
		/*background: rgba(245, 245, 245, 1);*/
		margin: 10px auto;
		cursor: pointer;
	}

	.popup-btnl {
		position: absolute;
		bottom: -100px;
		left: 50%;
		transform: translateX(-50%);
		width: 40px;
		height: 40px;
		border-radius: 58px;
		font-size: 26px;
		background-color: #ffffff;
		padding: 16px;
	}

	.popup-img2 {
		width: 100%;
		height: 100%;
	}

	.popup-btnr {
		position: absolute;
		bottom: 57px;
		right: 90px;
		font-size: 26px;
		width: 200px;
		height: 80px;
		background: rgba(6, 193, 174, 1);
		border-radius: 40px;
		color: #ffffff;
		line-height: 80px;
	}
</style>
