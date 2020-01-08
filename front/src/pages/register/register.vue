<template>
  <div class="register">
    <p class="title">瓶子科技2020年会抽奖</p>

    <van-row type="flex" justify="center">
      <van-col :span="8">
        <van-uploader :after-read="afterRead">
          <van-button plain type="primary" class="upload-face-button">上传人脸</van-button>
        </van-uploader>       
      </van-col>
      <!-- <van-col :span="8">
        <van-button plain type="default" style="width: 4.4rem">随机人脸</van-button>
      </van-col> -->
    </van-row>

      <van-image :src="avatar" width="8rem" height="8rem" style="margin-top: 1rem;overflow: hidden;" round fit="cover">
      </van-image>

    <van-row class="form">
      <van-field v-model="userName" label="用户名:" placeholder="请输入姓名" />
    </van-row>
    <van-row type="flex" justify="center" class="submit-button">
      <van-col span="20">
        <van-button type="primary" size="large" @click="register">参与抽奖</van-button>
      </van-col>
    </van-row>
    <van-loading size="24px" v-show="loading" class="toast-loading">请求中...</van-loading>
    <van-loading size="24px" v-show="uploading" class="toast-loading">图片上传中...</van-loading>

    <!-- success -->
    <div class="register-success" v-if="success">
      <p class="register-success__title-head">恭喜</p>
      <p class="register-success__title-body">参与成功</p>
    </div>
  </div>
</template>


<script>
import {Notify} from 'vant'
import { rotateAndCompressImg } from '@/utils/compress-img'
import { upload } from '@/utils/upload_api'
import Api from '@/api'

const KEY_SESSION_HISTORY = 'key-session-history-of-luckdraw'

const DefaultIntervalMinutes = 2 * 24 * 60

export default {
  data () {
    return {
      userName: '',
      avatar: '',
      session: '',
      intervalMinutes: DefaultIntervalMinutes,
      loading: false,
      uploading: false,
      success: false
    }
  },

  computed: {
    FormDisabled () {
      return !(this.userName && this.avatar)
    }
  },

  created () {
    this.session = this.$route.query.session || '0'
    this.intervalMinutes = Number.parseInt(this.$route.query.interval || DefaultIntervalMinutes)
  },

  methods: {
    validateAndSaveSession () {
      // session like this: {id: xxxx, intervalMs: 1111111, updateTimestamp: 234324324 }
      let history = this.sessionHistory()
      let preSession = history[this.session]
      let thisSession = { id: this.session, intervalMs: this.intervalMinutes * 60 * 1000, updateTimestamp: Date.now() }
      if (this.preSessionExpired(preSession, thisSession)) {
        history[this.session] = thisSession
        localStorage.setItem(KEY_SESSION_HISTORY, JSON.stringify(history))
        return true
      }
      return false
    },

    clearSession () {
      localStorage.removeItem(KEY_SESSION_HISTORY)
    },

    preSessionExpired (preSession, thisSession) {
      if (!preSession) {
        return true
      }
      let diffMs = thisSession.updateTimestamp - preSession.updateTimestamp
      return diffMs > preSession.intervalMs
    },

    sessionHistory () {
      let history = localStorage.getItem(KEY_SESSION_HISTORY) || "{}"
      return JSON.parse(history)
    },

    register () {
      if (!this.userName || !this.avatar || !this.session) {
        let emptyFields = []
        !this.userName.trim() && emptyFields.push('姓名')
        !this.avatar.trim() && emptyFields.push('图像')
        return this.toast(emptyFields.join('、') + '必填', 'danger')
      }
      if (this.loading) {
        return this.toast('已在请求中', 'danger')
      }

      this.loading = true
      Api.register(this.userName.trim(), this.avatar.trim(), this.session.trim()).then(res => {
        this.loading = false

        if (res.code === 0) {
          this.toast('参加成功')
          this.success = true
        } else if (res.code === 11000) { // duplicate user name
          this.toast('此用户名已参加', 'warning')
        } else {
          // this.clearSession()
          this.toast(res.message || '参加失败，请稍后重试', 'warning')
        }
      }).catch(err => {
        this.toast(err || '网络或者服务器异常', 'danger')
        this.loading = false
      })
    },

    afterRead (file) {
      rotateAndCompressImg(file.file).then(contentAndFile => {
        this.uploading = true
        upload('img', contentAndFile.file).then(res => {
          this.uploading = false
          if (res.code === 0) {
            this.avatar = res.data.visit_url
          } else {
            this.toast(res.message || '上传人脸图片失败', 'danger')
          }
        }).catch (err => {
          this.uploading = false
          this.toast(err || '上传人脸图片失败', 'danger')
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
    color: @mainColor;
  }

  .form {
    margin-top: 10%;
  }

  .upload-face-button {
    border: 1px solid @mainColor;
    color: @mainColor;
  }

  .submit-button {
    margin-top: 10%;

    .van-button--primary {
      background: @mainColor;
      border: 1px solid @mainColor;
      box-shadow: 0 0 1em rgba(@mainColor, .8);
    }
  }

  .toast-loading {
    display: block;
    position: absolute;
    left: 50%;
    top: 50%;
    padding: 10px;
    background: rgba(0,0,0,.5);
    transform: translate(-50%, -50%);
    border: 1px solid @mainColor;
  }
}


// 注册成功
.register-success {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  display: block;
  width: 100%;
  height: 100%;

  background: linear-gradient(#ccc, @mainColor);
  padding-top: 20%;

  &__title-head {
    font-size: 36px;
    font-weight: 600;

    color: @mainColor;
  }

  &__title-body {
    font-size: 28px;
    color: #fff2a7;
  }
}
</style>
