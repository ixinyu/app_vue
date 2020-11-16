<template>
	<div class="bind_rool">
		<div class="br_block visitor">
			<div class="mb20 pl30 pt30">申请人信息</div>
			<van-cell-group>
				<van-field v-model="obj.address||''" required label="访问地址" disabled/>
				<van-field v-model="form.username" required label="姓名" placeholder="请输入姓名" />
				<van-field v-model="form.phone" required label="手机号" placeholder="请输入手机号" />
				<van-field v-model="form.b_phone" required label="手机号" placeholder="请输入业主手机号" />
				<van-field v-model="form.id_card" required label="身份证号" placeholder="请输入身份证号" />
				<van-field v-model="form.visitor_time_start" required label="访问时间" placeholder="访问时间" disabled @click="time('visitor_time_start')" />
				<van-field v-model="form.visitor_time_end" required label="访问结束时间" placeholder="访问结束时间" disabled @click="time('visitor_time_end')" />
				<van-field v-model="form.reason" required label="访问理由" placeholder="请输入访问理由" />
			</van-cell-group>
		</div>
		<div style="height: 10px;"></div>
		<div class="br_block" v-show="form.phone">
			<div class="mb20 pl30 pt30">申请人人脸照片</div>
			<van-cell-group>
				<van-uploader v-model="fileList" :after-read="change" :max-count="1" @delete="shanchu" />
			</van-cell-group>
		</div>
		<div class="br_sure fs30" @click="sure">确定</div>
		<van-popup v-model="show" position="bottom" :style="{ height: '40%' }">
			<van-datetime-picker v-model="valueTime" title="选择年月日" :min-date="minDate" :max-date="maxDate" :formatter="formatter"
			 @confirm="queding" @cancel="quxiao" />
		</van-popup>
		<van-overlay :show="imgshow">
			<van-loading class="loading" type="spinner" color="#1989fa" />
		</van-overlay>
		<div class="zhezhaoc" v-if="chaoshi"> <p>该链接已超时</p></div>
	</div>
</template>

<script>
	import {
		Toast,
		Dialog
	} from 'vant'
	import EXIF from 'exif-js'
	import {
		upload
	} from '../../utils/up'
	export default {
		data() {
			return {
				chaoshi:false,
				minDate: new Date(2020, 0, 1),
				maxDate: new Date(2025, 10, 1),
				show: false,
				form: {
					username: '', //姓名
					id_card: '', //身份证id
					phone: '', //手机号
					b_phone:'',//业主手机号
					visitor_time_end: '', //访问结束时间
					visitor_time_start: '', //访问结束时间
					img: '', //图片
					reason: '' //访问理由
				},
				obj:JSON.parse(this.$route.query.item),
				key: '',
				valueTime: new Date(),
				fileList: [],
				imgshow: false,
				url: '',
			}
		},
		mounted() {
		
			
		},
		methods: {
			shanchu(item) {
				this.fileList = [];
				this.form.img = ''
			},
			async change(file) {
				if (!this.form.phone) {
					return Toast('请填写手机号码')
				}
				const self = this
				const base64 = file.content || file.target.files[0]
				let orientation = ''
				EXIF.getData(file.file, function() { // file input[type=file]的文件
					EXIF.getAllTags(this)
					orientation = EXIF.getTag(this, 'Orientation')
					// alert(orientation)
					upload(this, orientation, function(base64) {
						// self.up(base64)
						self.fileList[0].content = base64
						self.form.img = base64
					})
				})

				// f.append('imgFile', file.file)
			},
			formatter(type, value) {
				if (type === 'year') {
					return `${value}年`
				} else if (type === 'month') {
					return `${value}月`
				} else if (type === 'day') {
					return `${value}日`
				} else if (type === 'hour') {
					return `${value}时`
				} else if (type === 'minute') {
					return `${value}分`
				} else if (type === 'second') {
					return `${value}秒`
				}
				return value
			},
			time(key) {
				this.key = key;
				this.show = true
			},
			queding(val) {
				let year = val.getFullYear()
				let month = val.getMonth() + 1
				let day = val.getDate()
				let hour = val.getHours()
				let minute = val.getMinutes()
				if (month >= 1 && month <= 9) {
					month = `0${month}`
				}
				if (day >= 1 && day <= 9) {
					day = `0${day}`
				}
				if (hour >= 0 && hour <= 9) {
					hour = `0${hour}`
				}
				if (minute >= 0 && minute <= 9) {
					minute = `0${minute}`
				}
				let changTime = `${year}-${month}-${day} ${hour}:${minute}`
				if (this.key == 'visitor_time_end') {
					if (this.form.visitor_time_start >= changTime) {
						Toast('起始时间大于结束时间')
						return false;
					} else {
						this.form[this.key] = changTime;
					}
				}
				this.form[this.key] = changTime;
				this.$forceUpdate()
				this.valueTime = new Date()
				this.show = false
			},
			quxiao() {
				this.show = false
			},
			sure() {
				for (let key in this.form) {
					if (!this.form[key]) {
						Toast('必填项不可为空')
						return false;
					}
				}
				let o = Object.assign(this.obj,this.form)
				let data = JSON.parse(JSON.stringify(o))
				this.$post('HouseApi&a=visit_push', data).then((res) => {
					Toast(res.errorMsg||res.msg)
					return false;
				})
			},

		}
	}
</script>
<style>
	.visitor .van-field--disabled .van-field__label{
		color: #646566;
	}
</style>
<style lang="scss" scoped>
	
	.zhezhaoc{
		background: rgba($color: #000000, $alpha: .5);
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
	}
	.zhezhaoc p{
		color: #fff;
		line-height: 100vh;
		text-align: center;
		font-size: 36px;
	}
	.loading {
		position: fixed;
		top: 0;
		bottom: 0;
		left: 0;
		right: 0;
		display: flex;
		/*采用flex布局*/
		justify-content: center;
		/*loading-box中的内容 水平居中*/
		align-items: center;
		/*loading-box中的内容 垂直居中*/
	}

	.bind_rool {
		height: 100vh;
		background: #f5f5f5;
	}

	.br_block {
		background: #fff;
	}

	.bind_top {
		height: 130px;
		background: rgb(6, 193, 174);
		color: #fff;
		font-weight: bold;
		padding: 10px 30px;
		box-sizing: border-box;
	}

	.br_sure {
		position: fixed;
		bottom: 0;
		width: 100%;
		height: 90px;
		line-height: 90px;
		text-align: center;
		background: #06C1AE;
		color: #fff;
		margin: 50px auto 0;
	}

	.com {
		position: absolute;
		right: 0;
		border: none;
	}
</style>
