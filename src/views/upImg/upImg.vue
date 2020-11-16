<template>
  <div>
    <div class="shangchuan">
      <van-uploader v-model="fileList" :after-read="change" :max-count="1" @delete="shanchu" />
      <!-- <input type="file" /> -->
    </div>
    <!-- <img :src="src" /> -->
    <div class="pt20 pl20 pr20 wenzhi">
      <h2>注意事项</h2>
      <p class="pt16">1.为提高人脸识别的速度，请尽量正脸面对手机进行拍照</p>
      <p class="pt16">2.为保证人脸识别的真实性，添加图片时只能相机拍照上传</p>
      <p class="pt16">3.不同手机型号上传方式可能会不同</p>
      <ul class="flex between pt20" style="width: 94%; margin: 0 auto;">
        <li style="width: 25%;">
          <img style="width: 100%;" src="../../assets/selfie1.png">
          <h4 class="textCenter">正对手机</h4>
        </li>
        <li style="width: 25%;">
          <img style="width: 100%;" src="../../assets/selfie2.png">
          <h4 class="textCenter">光线充足</h4>
        </li>
        <li style="width: 25%;">
          <img style="width: 100%;" src="../../assets/selfie3.png">
          <h4 class="textCenter">动作缓慢</h4>
        </li>
      </ul>
    </div>
    <div v-if="url" class="textCenter pt40">
      <van-button type="info" class="but" @click="baocun">保存</van-button>
    </div>
    <van-overlay :show="show">
      <van-loading class="loading" type="spinner" color="#1989fa" />
    </van-overlay>

  </div>
</template>

<script>
import EXIF from 'exif-js'
import { Toast } from 'vant'
import { upload } from '../../utils/up'
export default {
  components: {},
  data() {
    return {
      show: false,
      src: '',
      fileList: [],
      url: '',
      add_pigcms_id: localStorage.getItem('village') ? JSON.parse(localStorage.getItem('village')).pigcms_id : this.$route.query.add_pigcms_id,
      key: JSON.parse(localStorage.getItem('village'))
    }
  },
  mounted() {
    // this.getPayInfo()
    this.getImg()
  },
  methods: {
    getPayInfo() {
      const _this = this
      const data = {
        village_id: _this.key.village_id,
        uid: JSON.parse(localStorage.getItem('village')).uid,
        usernum: JSON.parse(this.$route.query.user).user.usernum
      }
      _this.$post('NewModer&a=needPayDoorFaceFee', data).then(res => {
        const r = res.result
        if (r.is_door_money_face !== '0' && r.is_pay_foor_money === '0') {
          this.$router.push({
            path: '/autonomy',
            query: {
              money: r.door_money_face,
              title: r.content,
              vacancy_id: r.vacancy_id
            }
          })
        } else {
          _this.getImg()
        }
      })
    },
    async change(file) {
      const self = this
      self.fileList = []
      const base64 = file.content || file.target.files[0]
      const boo = await this.zhu(file.file)
      if (!boo) {
        return Toast('上传失败')
      }
      let orientation = ''
      EXIF.getData(file.file, function() { // file input[type=file]的文件
        EXIF.getAllTags(this)
        orientation = EXIF.getTag(this, 'Orientation')
        // alert(orientation)
        upload(this, orientation, function(base64) {
          self.src = base64
          self.up(base64)
        })
      })

      // f.append('imgFile', file.file)
    },
    up(file) {
      this.fileList = []
      this.show = true
      this.$post('HouseApi&a=ajax_face_img2', {
        'imgFile': file
      }).then(res => {
        const r = res.result
        const obj = {
          url: r.url
        }
        this.fileList.push(obj)
        this.url = r.url
        this.show = false;
		if(res.errorCode == '0'&&res.errorMsg == 'success')
			Toast('上传成功')
		else
			Toast('上传失败')
      })
    },
    async zhu(file) {
      const formData = new FormData()
      formData.append('imgFile', file)
      let url = ''
      await this.$post('HouseApi&a=ajax_face_img', formData).then(res => {
        const r = res.result
        if (r && r.url) {
          url = r.url
        }
      })
      if (url) {
        return true
      } else {
        return false
      }
    },
    getImg() {
      const data = JSON.parse(JSON.stringify(this.key))
      data.add_pigcms_id = this.add_pigcms_id
      this.$post('HouseApi&a=face_img_info', data).then(res => {
        const r = res.result
        if (r.face_img.length) {
          const obj = {
            url: r.face_img[0].face_img_url
          }
          this.url = r.face_img[0].face_img_url
          this.fileList.push(obj)
        }
      })
    },
    shanchu(item) {
      this.url = ''
    },
    baocun() {
      if (!this.url) {
        Toast('正在上传中…')
        return false
      }
      const data = JSON.parse(JSON.stringify(this.key))
      const ce = this.tongbu(data)
      if (!ce) {
        Toast('保存失败')
      }
      data.add_pigcms_id = this.add_pigcms_id
      data.face_img = []
      data.face_img.push(this.url)
      this.$post('HouseApi&a=face_img_add', data).then(res => {
		if(res.errorCode == '0'&&res.errorMsg == 'success')
			Toast('保存成功')
		else
			Toast(res.errorMsg)
      })
    },
    async tongbu(data) {
      let boo = false
      await this.$post('HouseApi&a=face_img_info', data).then(res => {
        if (res.errorCode == '0'&&res.errorMsg == 'success') {
          boo = true
        } else {
          boo = false
        }
      })
      if (boo) {
        return true
      } else {
        return false
      }
    }
  }
}
</script>
<style>
	.van-uploader__upload,
	.van-uploader__preview-image {
		width: 250px;
		height: 250px;
	}

	.van-uploader__upload {
		border: solid 1px #ccc;
	}
</style>
<style scoped>
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

	.shangchuan {
		padding: 10px;
	}

	.wenzhi h2 {
		font-weight: bold;
	}

	.but {
		width: 90%;
		margin: 0 auto;
		height: 80px;
		font-size: 28px;
	}
</style>
