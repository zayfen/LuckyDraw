<template>
  <div class="luckydraw">
    <el-row>
      <h2 class="title">2019年瓶子科技年会抽奖</h2>
    </el-row>
    <el-row>
      <el-col :span="6" class="luckydraw-participant">
        <h4 class="luckydraw-participant__title">抽奖参与者({{participantList.length}}人)</h4>
        <lucky-image-grid :images="participantList" class="luckydraw-participant__wrapper"></lucky-image-grid>
      </el-col>
      <el-col :span="12">
        <div class="luckydraw-main">
          <el-button size="large" 
              :round="true"
              :type="running ? 'danger' : 'primary'" 
              class="luckydraw-main__button" 
              @click="onButtonClick">{{running ? '产生幸运儿...' : '开始抽奖'}}</el-button>
          <div class="luckydraw-main__image">
            <h3 v-show="randomIndex > -1">{{ participantList[randomIndex] && participantList[randomIndex].name}}</h3>
            <div class="luckydraw-main__image-viewport">
              <div class="img-bg" 
                v-for="(img, index) in participantList" 
                :key="index" 
                :style="{backgroundImage: 'url(' + img.src + ')', zIndex: index === randomIndex ? '1' : '0'}">
              </div>
              <div class="img-bg img-bg__cover"></div>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="luckydraw-forbidden">
          <h4 class="luckydraw-forbidden__title">禁止参与({{forbiddenList.length}}人)</h4>
          <lucky-image-grid :images="forbiddenList" class="luckydraw-forbidden__wrapper"></lucky-image-grid>
        </div>
      </el-col>
    </el-row>
    <div class="lucky-register-container">
      <lucky-register-qrcode :text="QrCodeText"></lucky-register-qrcode>
    </div>

    <div class="lucky-checkin">
      <el-button class="lucky-checkin__button" size="mini" icon="el-icon-d-arrow-right"></el-button>
      <lucky-white-list :session="session"></lucky-white-list>
    </div>

  </div>  
</template>

<script>
import LuckyImageGrid from '@/components/lucky-image-grid/lucky-image-grid'
import LuckyRegisterQrcode from '@/components/lucky-register-qrcode/lucky-register-qrcode'
import LuckyWhiteList from '@/components/lucky-white-list/lucky-white-list'

import Api from '@/api'

export default {
  components: {
    LuckyImageGrid,
    LuckyRegisterQrcode,
    LuckyWhiteList
  },
  data () {
    return {
      participantList: [],
      forbiddenList: [],
      running: false,
      randomIndex: -1,
      session: ''
    }
  },

  computed: {
    QrCodeText () {
      let validInteger  = str => !(Number.parseInt(str).toString() === 'NaN')

      let interval = this.$route.query.interval || ''  // unit: minute
      let protocol = window.location.protocol // http:  https:
      let host = window.location.host // localhost:8081

      let registerUrl = `${protocol}//${host}/register?session=${this.session}`
      if (interval && validInteger(interval)) {
        registerUrl = `${registerUrl}&interval=${interval}`
      }
      return registerUrl
    }
  },

  created () {
    this.session = this.$route.query.session || Date.now()
  },

  mounted () {
    Api.syncUser(this.session, this.onWebSocketOpen.bind(this), this.onWebSocketMessage.bind(this), this.onWebSocketClose.bind(this))

    // beforeClose
    window.addEventListener('beforeunload', function (evt) {
      evt = evt || window.event
      if (evt) {
        evt.returnValue = '确定离开抽奖页面吗？'
      }
      return '确定离开抽奖页面吗？'
    })
  },

  methods: {
    onWebSocketOpen () {
      // eslint-disable-next-line no-console
      console.log('onWebSocketOpen')
    },

    onWebSocketMessage (onMessageEvent) {
      let data = JSON.parse(onMessageEvent.data)
      // eslint-disable-next-line no-console
      console.log('onWebSocketMessage Data: ', data)
      if (data.action === 'AllUsers') {
        this.participantList = data.data.map(item => { 
          return { session: item.session, name: item.user, src: item.avatar }
        })
      }
      if (data.action === 'NewUser') {
        this.participantList.splice(0, 0, {session: data.data.session, name: data.data.user, src: data.data.avatar })
      }
    },

    onWebSocketClose () {
      // eslint-disable-next-line no-console
      console.log('onWebSocketClose')
    },

    onButtonClick () {
      if (this.running) {
        clearInterval(this.intervalHolder)
        setTimeout(() => {
          this.showResult()
        }, 0)

      } else {
        this.startDraw()
      }
      this.running = !this.running
    },

    showResult () {

    },

    startDraw () {
      requestAnimationFrame((time) => {
        if (!this.running) {
          return 
        }
        this.randomIndex = this.generateRandomIndex()
        // eslint-disable-next-line no-console
        console.log("randomIndex: ", this.randomIndex)
        this.startDraw()
      })
    },

    generateRandomIndex () {
      let length = Math.max(1, this.participantList.length)
      let number = Math.round(Math.random() * Math.pow(10, ('' + length).length))
      return number % length
    }
  }
}
</script>

<style lang="less" scoped>
@mainColor: #990008;

.luckydraw {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  // background: linear-gradient(#373b44, #4286f4);
  background: linear-gradient(#ccc, @mainColor);
  font-size: 30px;

  .title {
    text-align: center;
    color: @mainColor;
    margin-bottom: 0;
    padding: 0;
  }
}

.luckydraw-participant {
  position: relative;
  height: 820px;
  overflow: hidden;
  box-sizing: border-box;
  border-top: 5px solid rgba(@mainColor, .3);
  border-right: 5px solid rgba(@mainColor, .3);
  border-radius: 50px;

  &__title {
    text-align: center;
    color: #ccc;
  }
  &__wrapper {
    overflow: auto;
    height: 800px;

  }
}

.luckydraw-main {
  position: relative;
  height: 820px;
  overflow: hidden;
  text-align: center;

  &__button {
    width: 330px;
    margin-top: 30px;
    font-size: 18px;
    border-color: @mainColor;
    &.el-button--danger {
      background: rgba(@mainColor, .3);
    }
    &.el-button--primary {
      background-color: @mainColor;
    }
  }

  &__image {
    position: absolute;
    left: 50%;
    top: 200px;
    width: 300px;
    transform: translateX(-50%);
    h3 {
      height: 65px;
      line-height: 50px;
      margin: 0;
      padding: 0;
      color: @mainColor;
      font-size: 50px;
      border-bottom: 2px dashed @mainColor;
      box-sizing: border-box;
    }

    &-viewport {
      position: absolute;
      left: 0;
      top: 80px;
      width: 300px;
      height: 300px;
      overflow: hidden;
      clip-path: circle(50%);

      .img-bg {
        position: absolute;
        left: 0;
        top: 0;
        width: 300px;
        height: 300px;
        background-size: 100% 100%;

        &__cover {
          position: absolute;
          background: rgba(@mainColor, .8);

          &::after {
            position: absolute;
            left: 50%;
            top: 50%;
            transform: translate(-50%, -50%);
            content: "等待抽奖...";
            color: #fff;
          }
        }
      }
    }
  }
}

.luckydraw-forbidden {
  position: relative;
  height: 820px;
  overflow: hidden;
  box-sizing: border-box;
  border-top: 5px solid rgba(@mainColor, .3);
  border-left: 5px solid rgba(@mainColor, .3);
  border-radius: 50px;

  &__title {
    text-align: center;
    color: #ccc;
  }
  &__wrapper {
    overflow: auto;
    height: 800px;
  }
}


.lucky-register-container {
  position: absolute;
  left: 0;
  top: 0;
  width: 80px;
  padding: 5px;
  background: rgba(#fff, .8);
  transition: all .5s;
  transform: scale(1);
  transform-origin: left top;

  &:hover {
    transform: scale(8);
  }
}

.lucky-checkin {
  position: absolute;
  left: 50%;
  top: 0;
  height: 50px;
  width: 20px;
  transform: rotate(90deg);

  &__button {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;

    transition-property: transform;
    transition-duration: all 1s;
  }
}
</style>
