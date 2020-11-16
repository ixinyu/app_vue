<template>
  <div class="container">
    <!-- 搜索框 -->
    <div class="seach-box" style="background-color: rgb(6, 193, 174);">
      <div class="search">
        <div class="search-icon">
          <img src="../../assets/search.png" class="search-img">
        </div>
        <input v-model="form.keyword" type="text" placeholder="请输入社区名" class="input-box" @keyup.enter="search">
      </div>
    </div>
    <div v-if="!is.isList" calss="zanwu">
      <img class="zanwu-img" src="../../assets/zanwu.png">
      <div class="zanwu-text">请通过搜索查询社区</div>
    </div>
    <van-list v-if="is.isList" v-model="loading" :finished="finished" finished-text="没有更多了" class="container-box" @load="onLoad">
      <div class="h1">社区列表</div>
      <div v-for="(item,index) in list" :key="index" class="card" @click="navGo(item)">
        <div class="village-icon">
          <img :src="item.village_logo" class="village-img">
        </div>
        <div class="address-box">
          <div class="title-box">
            <div class="title">{{ item.village_name }}</div>
            <img v-if="item.isverify == 1" src="../../assets/wancheng.png" mode="" class="renzheng">
          </div>
          <div class="distance-box">
            <div class="text">{{ item.property_address }}</div>
            <!-- <div class="text1">000</div> -->
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
	import {
	  Dialog
	} from 'vant'
export default {
  data() {
    return {
      show: false,
      notedata: '',
      form: {
        keyword: '',
        page: 0,
        property_id: 0,
        referer_type: '',
        user_lat: '',
        user_long: ''
      },
      list: [],
      is: {
        isList: true
      },
      ownerList: [],
      item: {},
      loading: false,
      finished: false
    }
  },
  mounted() {},
  methods: {
    onLoad() {
      this.finished = false
      this.loading = true
      this.form.page += 1
      this.getList()
    },
    search() {
      this.finished = false
      this.loading = true
      this.form.page = 1
      this.list = []
      this.getList()
    },
    getList() {
      this.$post('HouseApi&a=village_list', this.form).then(r => {
        if (this.form.keyword) {
          if (r && r.result && r.result.village_list && r.result.village_list.length) {
            this.list = this.list.concat(r.result.village_list)
          } else {
            this.finished = true
          }
        }
        if (this.list.length) {
          this.is.isList = true
        } else {
          this.is.isList = false
        }
        this.loading = false
      })
    },
    navGo(item) {
		this.$router.push({
			  path: '/visitor-community',
			  query: {
				village_info: JSON.stringify(item)
			  }
		})
    },
    toIndex(item) {
      let obj = {}
      if (item) {
        Object.assign(obj, this.item, item)
      } else {
        obj = this.item
      }
      // let aa = localStorage.getItem('village_info')
      // if (JSON.stringify(obj) != localStorage.getItem('village_info')) {
      // localStorage.setItem('village_info', JSON.stringify(obj))
      // }
      if (this.form.keyword) {
        if (obj && !obj.is_bind) {
          this.$router.push({
            path: '/bindCommunity',
            query: {
              village_info: JSON.stringify(obj)
            }
          })
        } else {
          JSToNativeAPP('index', obj)
        }
      } else {
        JSToNativeAPP('index', obj)
      }
    },
    close() {
      this.show = false
    }
  }
}
</script>

<style scoped lang="scss">
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

	.container {
		margin: 0;
		padding: 0;
		background: #ffffff;
	}

	.seach-box {
		position: fixed;
		top: 0px;
		background: rgba(33, 192, 175, 1);
		overflow: hidden;
		width: 100%;
		z-index: 99;
	}

	.search {
		width: 686px;
		height: 88px;
		margin: 25px auto;
		background-color: #ffffff;
		box-shadow: 0px 0px 46px 0px rgba(20, 96, 88, 0.06);
		border-radius: 15px;
		display: flex;
		flex-direction: row;
		align-items: center;
		overflow: hidden;
	}

	.search-icon {
		width: 32px;
		height: 32px;
		margin: 0 auto;
	}

	.search-img {
		width: 100%;
		height: 100%;
	}

	.input-box {
		width: 600px;
		height: 88px;
		background-color: #ffffff;
		box-shadow: 0px 0px 46px 0px rgba(20, 96, 88, 0.06);
		border-radius: 15px;
		border: none;
	}

	.container-box {
		display: flex;
		flex-direction: column;
		padding-top: 150px;
	}

	.h1 {
		font-size: 34px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 60px;
		letter-spacing: 0px;
		color: #333333;
		margin-left: 32px;
		margin-top: 18px;
	}

	.card {
		display: flex;
		flex-direction: row;
		align-items: center;
		width: 690px;
		height: 174px;
		background-color: #ffffff;
		box-shadow: 0px 0px 17px 1px rgba(216, 216, 216, 0.68);
		border-radius: 20px;
		margin: 14px auto;
	}

	.village-icon {
		width: 100px;
		height: 100px;
		flex-shrink: 0;
		margin: 0 30px;
		box-shadow: 0px 0px 16px 0px rgba(182, 182, 182, 0.38);
		padding: 12px;
		border-radius: 100%;
	}

	.village-img {
		width: 100%;
		height: 100%;
		border-radius: 135px;
	}

	.address-box {
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.title-box,
	.distance-box {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
	}

	.title {
		font-size: 36px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 60px;
		letter-spacing: 0px;
		color: #202020;
	}

	.text {
		font-size: 24px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 32px;
		letter-spacing: 0px;
		color: #333333;
		margin-top: 12px;
		overflow: hidden;
		text-overflow: ellipsis;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
	}

	.title1 {
		width: 140px;
		height: 46px;
		background-image: linear-gradient(90deg, #feb40d 0%, #ff6030 100%), linear-gradient(#cce198, #cce198);
		background-blend-mode: normal, normal;
		box-shadow: 0px 0px 8px 1px rgba(248, 88, 40, 0.35);
		font-size: 22px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 46px;
		letter-spacing: 0px;
		color: #ffffff;
		text-align: center;
		border-radius: 25px 0 0 25px;
	}

	.renzheng {
		width: 40px;
		height: 40px;
		display: inline-block;
		padding-right: 25px;
	}

	.text1 {
		font-size: 26px;
		font-weight: normal;
		font-stretch: normal;
		line-height: 60px;
		letter-spacing: 0px;
		color: #666666;
		text-align: center;
		margin-right: 36px;
		display: flex;
		flex-shrink: 0;
	}

	/* 房间号弹层 */
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

	/* 提示窗口 */
	.uni-tip {
		padding: 15px;
		width: 300px;
		background: #fff;
		box-sizing: border-box;
		border-radius: 10px;
	}

	.uni-tip-title {
		text-align: center;
		font-weight: bold;
		font-size: 16px;
		color: #333;
	}

	.uni-tip-content {
		padding: 15px;
		font-size: 14px;
		color: #666;
	}

	.uni-tip-group-button {
		margin-top: 10px;
		display: flex;
	}

	.uni-tip-button {
		width: 100%;
		text-align: center;
		font-size: 14px;
		color: #3b4144;
	}

	.tip {
		display: flex;
		justify-content: center;
		align-items: center;
		font-size: 14px;
		color: #666;
		padding: 10px 0;
		background: #f8f8f8;
	}

	.tip image {
		width: 20px;
		height: 20px;
		margin-right: 5px;
	}

	.uni-popup__wrapper-box {
		border-radius: 20px;
		overflow-y: visible !important;
	}
</style>
