<template>
  <div class="background">
    <!-- 公告 -->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      class="content"
      @load="onLoad"
    >
      <div v-for="(item,index) in list" :key="index" class="tip_box">
        <div class="tip_box1">
          <div class="tip_title">{{ item.title }}</div>
          <div class="tip_content">{{ item.content }}</div>
          <div class="tip_foot">
            <div class="tip_time">{{ item.add_time }}</div>
            <div class="tip_more" @click="detail(item)">查看详情></div>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
export default {
  data() {
    return {
      finished: false,
      loading: false,
      village_info: {},
      form: {
        page: 0,
        cat_id: 6,
        village_id: '',
        pigcms_id: ''
      },
      list: [],
      is: {
        isList: false
      }
    }
  },
  created() {
    this.village_info = JSON.parse(window.localStorage.getItem('village'))
  },
  mounted() {
  },
  methods: {
    onLoad() {
      this.finished = false
      this.loading = true
      this.form.page += 1
      this.getList()
    },
    getList() {
      this.form.village_id = this.village_info.village_id
      this.form.pigcms_id = this.village_info.pigcms_id
      this.$post('HouseApi&a=village_newslist', this.form).then(r => {
        if (r && r.result && r.result.news_list && r.result.news_list.length) {
          this.list = this.list.concat(r.result.news_list)
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
    detail(item) {
      this.$router.push({ path: '/noticeDetail', query: { id: item.news_id }})
    }
  }
}
</script>

<style lang="scss" scoped>
	.background {
		height: calc(100vh - 12px);
		padding-top: 12px;
		background: #f4f4f4;
	}

	.tip_box {
		width: 94%;
		margin: 24px auto;
		background-color: #FFFFFF;
		padding: 24px;
		border-bottom: 1px solid #F5F5F5;
		box-sizing: border-box;
		border-radius: 12px;
	}

	.tip_box .tip_title {
		font-size: 32px;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: rgba(67, 67, 67, 1);
		padding-bottom: 24px;
		font-weight: bold;
	}

	.tip_box1 .tip_content {
		font-size: 26px;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: rgba(102, 102, 102, 1);
		line-height: 37px;
		text-shadow: 0px 4px 10px rgba(212, 212, 212, 0.2);
		padding-bottom: 12px;
		line-height: 40px;
	}

	.tip_foot {
		border-top: solid 1px #efefef;
		display: flex;
		flex-direction: row;
		justify-content: space-between;
		align-items: center;
		color: rgba(171, 171, 171, 1);
		padding-top: 20px;
		font-size: 24px;
	}

	.tip_time {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.tip_more {
		flex-shrink: 0;
	}

	.tip_box_no_data {
		padding-top: calc((100vh - 80px - 288px - 80px -21px)/2);
		font-size: 28px;
		text-align: center;
	}

	.tip_box_no_data .tip_title {
		width: 100%;
		text-align: center;
	}
</style>
