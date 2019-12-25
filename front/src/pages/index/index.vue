<template>
  <div class="luckydraw">
    <el-row>
      <h2 class="title">2019年瓶子科技年会抽奖</h2>
    </el-row>
    <el-row>
      <el-col :span="6" class="luckydraw-participant">
        <h4 class="luckydraw-participant__title">
          参与抽奖({{validParticipantList.length}}人)
        </h4>
        <lucky-image-grid class="luckydraw-participant__wrapper"
          :data="validParticipantList">
        </lucky-image-grid>
      </el-col>

      <el-col :span="12">
        <div class="luckydraw-main">
          <el-button class="luckydraw-main__button luckydraw-main__start" 
            v-if="context.state === context.S_START"
            size="large"
            :round="true"
            type="primary" 
            @click="onDrawButtonClick(context.S_START)">
            开始抽奖
          </el-button>
          <el-button class="luckydraw-main__button luckydraw-main__drawing" 
            v-if="context.state === context.S_DRAWING"
            size="large"
            :round="true"
            type="primary" 
            @click="onDrawButtonClick(context.S_DRAWING)">
            停止
          </el-button>
          
          <el-row class="luckydraw-main__confirm"
            v-if="context.state === context.S_CONFIRM">
            <el-col :span="12">
              <el-button class="luckydraw-main__button luckydraw-main__confirm-yes"
                :round="true"
                type="primary"
                @click="onConfirmYesButtonClick">抽奖有效</el-button>
            </el-col>
            <el-col :span="12">
              <el-button class="luckydraw-main__button luckydraw-main__confirm-no"
                type="weak"
                :round="true"
                @click="toStartState">抽奖无效</el-button>
            </el-col>
          </el-row>

          <el-input class="luckydraw-main__count-input" 
            v-model.number="context.numLuckyPeople" 
            placeholder="抽奖个数" 
            :max="validParticipantList.length" 
            :min="0"
            @input="onCountInputChange"/>

          <div class="luckydraw-main__image">
            <h3 v-show="context.randomIndex > -1">
              {{ validParticipantList[context.randomIndex] && validParticipantList[context.randomIndex].name}}
            </h3>
            <div class="luckydraw-main__image-viewport">
              <div class="img-bg" 
                v-for="(img, index) in validParticipantList" 
                :key="index" 
                :style="{backgroundImage: 'url(' + img.src + ')', zIndex: index === context.randomIndex ? '1' : '0'}">
              </div>
              <div class="img-bg img-bg__cover"></div>
            </div>
          </div>

          <lucky-image-grid class="luckydraw-main__luckypeople"
            :images="context.luckyPeople"
            align="left"
            size="small"
            :showname="true">
          </lucky-image-grid>

        </div>
      </el-col>
      <el-col :span="6">
        <div class="luckydraw-forbidden">
          <h4 class="luckydraw-forbidden__title">中奖({{forbiddenParticipantList.length}}人)</h4>
          <lucky-image-grid :data="forbiddenParticipantList" class="luckydraw-forbidden__wrapper"></lucky-image-grid>
        </div>
      </el-col>
    </el-row>
    <div class="lucky-register-container">
      <lucky-register-qrcode :text="QrCodeText"></lucky-register-qrcode>
    </div>

    <div class="lucky-checkin">
      <div class="lucky-checkin__indicator">
        <el-button class="lucky-checkin__indicator-button" size="small" icon="el-icon-location" @click="toggleWhiteList">签到</el-button>
      </div>
      <lucky-white-list 
        :list="participantNameList"
        :session="session"  
        :style="{transform: whiteListVisible ? 'translateY(35px)' : 'translateY(130%)'}"
        @changed="onWhiteListChanged">
        </lucky-white-list>
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
      participantList: [
        {
          name: '张云峰',
          src: 'https://res.cloudinary.com/zayfen/image/upload/v1576564059/img/mbzfmu8fbbtt9vtfsrrk.jpg'
        },
        {
          name: '张三',
          src: 'https://res.cloudinary.com/zayfen/image/upload/v1576564059/img/ch1mmihskxrt3wia7v6j.jpg'
        }
      ], // 所有的参与者
      session: '',
      whiteListVisible: false,
      whiteList: ['张云峰', '张三'], // only save name

      context: {
        S_START: 'start',
        S_DRAWING: 'drawing',
        S_CONFIRM: 'confirm',
        numLuckyPeople: 1,
        state: 'start', // 抽奖状态: start, drawing, confirm,  start => drawing => confirm => start
        randomIndex: -1,
        luckyPeople: [],
        proposalLuckyPeopleIndexes: []
      },

      computedUpdateTrigger: 0
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
    },

    validParticipantList () { // 可以抽奖的人，签到并且还没有中奖
      return this.checkedParticipantList.filter(item => !item.forbidden)
    },

    forbiddenParticipantList () {
      return this.checkedParticipantList.filter(item => item.forbidden)
    },

    checkedParticipantList () { // 签到的人
      return this.participantList.filter(item => {
        return this.whiteList.indexOf(item.name.trim()) > -1
      })
    },

    participantNameList () {
      return this.participantList.map(item => item.name)
    }
  },

  created () {
    this.session = this.$route.query.session || '' + Date.now()    
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
        let forbiddenNames = this.loadLuckyNamesLocal()
        this.participantList = data.data.map(item => {  
          return { session: item.session, name: item.user.trim(), src: item.avatar, forbidden: forbiddenNames.indexOf(item.user.trim()) > -1 }
        })
      }
      if (data.action === 'NewUser') {
        this.participantList.splice(0, 0, {session: data.data.session, name: data.data.user, src: data.data.avatar, forbidden: false })
      }
    },

    onWebSocketClose () {
      // eslint-disable-next-line no-console
      console.log('onWebSocketClose')
    },
    
    toNextState () {
      let stateMachine = {
        'start': this.toDrawingState.bind(this),
        'drawing': this.toConfrimState.bind(this),
        'confirm': this.toStartState.bind(this)
      }
      stateMachine[this.context.state]()
    },

    // 抽奖初始状态
    toStartState () {
      this.context.state = this.context.S_START
      this.context.numLuckyPeople =  1
      this.context.randomIndex = -1
      this.context.luckyPeople.splice(0, this.context.luckyPeople.length)
      this.context.proposalLuckyPeopleIndexes.splice(0, this.context.proposalLuckyPeopleIndexes.length)
    },

    // 抽奖中
    toDrawingState () {
      this.context.state = this.context.S_DRAWING
      if (this.validParticipantList.length <= 0 || this.context.numLuckyPeople < 1) {
        return
      }
      this.startDrawing()
    },

    // 确定抽奖结果
    toConfrimState () {
      this.context.state = this.context.S_CONFIRM
      this.context.proposalLuckyPeopleIndexes.forEach(value => {
        setTimeout(() => {
          this.context.luckyPeople.push(this.validParticipantList[value])
        }, 500)
      })
    },

    onDrawButtonClick () {
      if (this.validParticipantList.length <= 0 || this.context.numLuckyPeople < 1) {
        return
      }
      this.toNextState()
    },

    // 确定抽奖结果有效
    onConfirmYesButtonClick () {
      // 中奖人 从参与抽奖人中移除， 加入到已中奖的栏中
      this.context.luckyPeople.forEach((people) => {
        Array.from({length: this.participantList.length}).forEach((v, index) => {
          let item = this.participantList[index]
          if (item.name === people.name) {
            item.forbidden = true
            this.participantList.splice(index, 1, item)
          }
        })
      })
      this.toNextState()
    },

    startDrawing () {
      requestAnimationFrame((time) => {
        console.log("requestAnimationFrame: ", time)
        let indexes = this.generateRandomIndexes(this.context.numLuckyPeople)
        console.log('indexes: ', ...indexes)
        this.context.randomIndex = indexes[0] || 0

        // eslint-disable-next-line no-console
        console.log("randomIndex: ", this.context.randomIndex)

        if (this.context.state !== this.context.S_DRAWING) { // 确保调用 startDrawing，至少能只执行一次抽奖逻辑
          this.context.randomIndex = this.context.proposalLuckyPeopleIndexes[0] || 0
          return 
        }
        this.startDrawing()
      })
    },

    generateRandomIndexes (numsIndexes) {
      let length = this.validParticipantList.length
      let cloneValidParticipantList = this._.cloneDeep(this.validParticipantList)
      cloneValidParticipantList = cloneValidParticipantList.map((item, index) => { 
        item.index = index
        return item
      })

      numsIndexes = Math.min(numsIndexes, length)
      this.context.proposalLuckyPeopleIndexes.splice(0, this.context.proposalLuckyPeopleIndexes.length)

      while (this.context.proposalLuckyPeopleIndexes.length < numsIndexes) {
        length = cloneValidParticipantList.length
        let number = Math.round(Math.random() * Math.pow(10, ('' + length).length))
        let index = number % length
        this.context.proposalLuckyPeopleIndexes.push(cloneValidParticipantList[index].index)
        cloneValidParticipantList.splice(index, 1)
      }
      return this.context.proposalLuckyPeopleIndexes
    },

    toggleWhiteList () {
      // eslint-disable-next-line no-console
      console.log('toggle white list')
      this.whiteListVisible = !this.whiteListVisible
    },

    onWhiteListChanged (list) {
      // 增加/删除 签到人员，需要结合
      this.whiteList.splice(0, this.whiteList.length)
      list.map(val => val.name).forEach(name => this.whiteList.push(name))
    },

    onCountInputChange (count) {
      if (count > this.validParticipantList.length) {
        this.context.numLuckyPeople = this.validParticipantList.length
      }
      if (count < this.validParticipantList.length) {
        this.context.numLuckyPeople = Math.min(1, this.validParticipantList.length)
      }
    },

    saveLuckyNamesLocal () {
      let forbiddentNames = this.forbiddenParticipantList.map(item => item.name) || []
      let key = this.session + '-lucky-names'
      localStorage.setItem(key, JSON.stringify(forbiddentNames))
    },

    loadLuckyNamesLocal () {
      let key = this.session + '-lucky-names'
      let forbiddenNamesStr = localStorage.getItem(key) || JSON.stringify([])
      return JSON.parse(forbiddenNamesStr)
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
    color: @mainColor;
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

  &__confirm {
    width: 330px;
    margin: 0 auto;

    &-yes {
      width: 150px;
    }

    &-no {
      width: 150px;
      color: @mainColor;
    }
    
  }

  /deep/ &__count-input {
    border: none;
    display: block;
    width: 330px;
    margin: 0 auto;
    text-align: center;

    > .el-input__inner {
      border: none;
      margin: 0;
      padding: 0;
      line-height: 30px;
      height: 30px;
      background-color: rgba(#000, 0);
      border-radius: 0;
      border-bottom: 1px solid @mainColor;
      text-align: center;
      font-size: 18px;
      font-weight: 700;
      color: @mainColor;
      outline: none;

      &::placeholder {
        font-weight: 500;
        font-size: 16px;
        color: rgba(@mainColor, .5);
      }
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

  &__luckypeople {
    position: absolute;
    bottom: 0;
    max-height: 230px;
    overflow: auto;
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
    color: @mainColor;
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
  z-index: 100;

  &:hover {
    transform: scale(8);
  }
}

.lucky-checkin {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 50px;
  width: 100%;

  &__indicator {
    position: absolute;
    left: 50%;
    top: 0;
    line-height: 20px;
    transform: translateX(-50%);
    z-index: 2;

    .el-button {
      border: @mainColor;
      color: @mainColor;
    }
  }

  .lucky-white-list {
    height: 860px;
  }
}

</style>
