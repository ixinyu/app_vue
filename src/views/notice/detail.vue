<template>
  <div class="background">
    <!-- 公告 -->
    <div class="container-box">
      <div class="title">
        {{ item.title }}
      </div>
      <div class="text-box">
        <div class="address">科博睿尔</div>
        <div class="time">{{ item.add_time }}</div>
      </div>
      <div class="content-box">
        <p>{{ item.content }}</p>
      </div>
      <div class="read-box">
        <div class="read-num">阅读：{{ item.read_sum }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        news_id: this.$route.query.id,
        village_id: JSON.parse(window.localStorage.getItem('village')).village_id
      },
      item: ''
    }
  },
  mounted() {
    if (this.form.news_id) { this.getData() }
  },
  methods: {
    getData() {
      this.$post('HouseApi&a=village_news', this.form).then(r => {
        if (r && r.result && r.result.now_news) {
          this.item = r.result.now_news
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
	.background {
		height: 100vh;
		background: #f4f4f4;
	}

	.container-box {
		background-color: #FFFFFF;
	}

	.title {
		font-size: 32px;
		color: #333333;
		text-align: center;
		padding: 20px 20px 0;
	}

	.text-box {
		display: flex;
		flex-direction: row;
		justify-content: flex-start;
		margin-top: 30px;
	}

	.time {
		font-size: 24px;
		color: #999999;
		margin-left: 30px;
		line-height: 20px;
	}

	.address {
		font-size: 24px;
		color: #007AFF;
		margin-left: 30px;
		line-height: 20px;

	}

	.content-box {
		margin-top: 24px;
		/* text-indent: 50px; */
		margin-left: 30px;
		margin-right: 30px;
		padding-bottom: 24px;
	}

	.read-box {
		display: flex;
		flex-direction: row;
		justify-content: space-between;
	}

	.read-num {
		font-size: 24px;
		color: #999999;
		margin: 30px;
	}
</style>
