<template>
  <div class="register">
    <p class="title">瓶子科技2019年会抽奖</p>

    <van-row type="flex" justify="center">
      <van-col :span="8">
        <van-uploader :after-read="afterRead">
          <van-button plain type="primary">上传人脸</van-button>
        </van-uploader>       
      </van-col>
      <van-col :span="8">
        <van-button plain type="default" style="width: 4.4rem">随机人脸</van-button>
      </van-col>
    </van-row>

      <van-image :src="avatar" width="8rem" height="8rem" style="margin-top: 1rem;overflow: hidden;" round fit="cover">
      </van-image>

    <van-row class="form">
      <van-field v-model="userName" label="用户名:" placeholder="请输入姓名" />
    </van-row>
    <van-row class="submit-button">
      <van-button type="primary" @click="register">参与抽奖</van-button>
    </van-row>
  </div>
</template>


<script>
import {Notify} from 'vant'
import { rotateAndCompressImg } from '@/utils/compress-img'
import { upload } from '@/utils/upload_api'

export default {
  data () {
    return {
      userName: '',
      avatar: '',
    }
  },

  computed: {
    FormDisabled () {
      return !(this.userName && this.avatar)
    }
  },

  methods: {
    register () {
      this.toast('参加成功')
    },

    afterRead (file) {
      console.log("file: ", file)
      rotateAndCompressImg(file.file).then(contentAndFile => {
        upload('img', contentAndFile.file).then(res => {
          if (res.code === 0) {
            this.avatar = res.data.visit_url
          }
        })
      })
    },

    toast (message, type="success") {
      Notify({ type, message })
    }
  }
}
</script>

<style lang="less" scoped>
@mainColor: #990008;

.register {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;
  background: linear-gradient(#ccc, @mainColor);

  .title {
    font-weight: 600;
  }

  .form {
    margin-top: 10%;
  }

  .submit-button {
    margin-top: 10%;
  }
}
</style>
