<template>
	<div>
		<div>
			<div v-if="list.length>0" class="open-door-top">
				<div v-for="(item,i) in list" :key="i" :class="[active==i?'activeClass':'noActive','tag']" @click="changeActive(i,item.device_id)">{{ item.device_name }}</div>
			</div>
			<div v-if="list.length>0" class="open-door-cen">
				<div>
					<img class="pig_open" src="../../assets/pigopen.png" mode="">
				</div>
				<div class="iconopen_wrap" @click="isOpen">
					<img class="icon_open" src="../../assets/iconopen.png" mode="">
					<div class="open_door">密码</div>
				</div>
			</div>
			<div v-else class="noSheBei">该社区暂无添加门禁设备</div>
		</div>
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
				active: 0,
				list: [],
				village_id: '',
				pigcms_id: '',
				device_id: '',
				isLogin: ''
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
				this.$post('HouseApi&a=my_device', {
					village_id: this.village_id,
					pigcms_id: this.pigcms_id
				}).then((res) => {
					this.list = res.result.list
					this.device_id = res.result.list[0].device_id
				})
			},
			changeActive(i, device_id) {
				this.active = i
				this.device_id = device_id
			},
			isOpen() {
				var _this = this
				let data = new FormData();
				data.append('pigcms_id', _this.pigcms_id)
				data.append('device_id', _this.device_id)
				_this.$post('NewModer&a=getTemPwd', data, 'formdata').then((res) => {
					if (res.data.code == '0') {
						Dialog.confirm({
								title: '提示',
								message: '本次开门密码为:' + res.data.key + ',过期时间为五分钟'
							})
							.then(() => { // 确定

							})
							.catch(() => { // 取消
							})
					} else {
						Toast(res.data.msg)
					}

				})

			}
		}
	}
</script>

<style lang="scss" scoped>
	.pig_open {
		width: 622px;
		height: 539px;
		margin: 120px 0 120px;
	}

	.icon_open {
		width: 196px;
		height: 196px;
	}

	.iconopen_wrap {
		position: relative;
	}

	.open_door {
		color: #fff;
		position: absolute;
		z-index: 1;
		top: 100px;
		left: 70px;
	}

	.open-door-top {
		display: flex;
		width: 100%;
		box-sizing: border-box;
		padding: 20px;
		font-size: 28px;
		white-space: nowrap;
		border-bottom: 1px solid #eee;
	}

	.activeClass {
		background: #06C1AE;
		color: #fff;
	}

	.noActive {
		color: #666;
	}

	.tag {
		display: inline-block;
		padding: 0 30px;
		height: 50px;
		line-height: 50px;
		border-radius: 25px;
		margin-right: 10px;
	}

	.icon-yaoshi {
		width: 120px;
		height: 120px;
		border-radius: 50%;
	}

	.open-door-cen {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
		box-sizing: border-box;
		padding: 20px;
		color: #666;
		font-size: 28px;
	}

	.door-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 30px;
		background: rgba($color: #06C1AE, $alpha: 0.1);
		border-radius: 10px;
	}

	.noSheBei {
		text-align: center;
		margin-top: 50px;
		font-size: 26px;
	}
</style>
