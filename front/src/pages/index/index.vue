<template>
  <div class="luckydraw" :class="[context.state === context.S_CONFIRM ? 'luckydraw-confirming' : '']">
    <!-- title -->
    <h2 class="title"><span style="color: #fcea00;">2021</span>新年联欢，抽奖现场</h2>

    <el-row style="position: absolute; top: 170px; left: 0; right: 0; bottom: 0;">
      <!-- 签到成功展示区域 -->
      <el-col :span="6" class="luckydraw-participant">
        <h4 class="luckydraw-participant__title">
          可参与抽奖人数({{validParticipantList.length}})
        </h4>
        <lucky-image-grid class="luckydraw-participant__wrapper"
          :data="validParticipantList">
        </lucky-image-grid>
      </el-col>

      <!-- 抽奖 & 中奖结果 展示区域 -->
      <el-col class="luckydraw-main"
        :span="12">
          <el-button class="luckydraw-main__button luckydraw-main__start" 
            v-if="context.state === context.S_START"
            size="large"
            :round="true"
            type="primary" 
            @click="onDrawButtonClick(context.S_START)">
          </el-button>
          <el-button class="luckydraw-main__button luckydraw-main__drawing" 
            v-if="context.state === context.S_DRAWING"
            size="large"
            :round="true"
            type="primary" 
            @click="onDrawButtonClick(context.S_DRAWING)">
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
            placeholder="中奖人数" 
            :max="validParticipantList.length" 
            :min="0"
            :disabled="true"
            @input="onCountInputChange"/>
          
          <div class="luckydraw-main__hrl"
            v-if="context.state === context.S_START || context.state === context.S_DRAWING">
            <div class="luckydraw-main__hrl-viewport">
              <div class="img-bg"
                v-show="context.state === context.S_DRAWING"
                v-for="(img, index) in randomParticipantList" 
                :key="index" 
                :style="{backgroundImage: 'url(' + img.src + ')', zIndex: index === (context.randomIndex % randomParticipantList.length) ? '1' : '0'}">
              </div>
            </div>
            <span v-show="context.randomIndex > -1">
              {{ randomParticipantList[context.randomIndex % randomParticipantList.length] && randomParticipantList[context.randomIndex % randomParticipantList.length].name}}
            </span>
          </div>
          <lucky-people-display class="luckydraw-main__lpd"
            v-else
            :data="context.luckyPeople">
          </lucky-people-display>
      </el-col>

      <!-- 已中奖展示区域 -->
      <el-col class="luckydraw-forbidden"
        :span="6">
        <h4 class="luckydraw-forbidden__title">已中奖人数({{forbiddenParticipantList.length}})</h4>
        <lucky-image-grid :data="forbiddenParticipantList" class="luckydraw-forbidden__wrapper"></lucky-image-grid>
      </el-col>
    </el-row>

    <!-- 签到二维码 -->
    <div class="lucky-register-qrcode">
      <lucky-register-qrcode :text="qrCodeContent"></lucky-register-qrcode>
    </div>

    <!-- 签到表 -->
    <div class="lucky-checkin">
      <a class="lucky-checkin-button" href="javascript: void 0;" @click="toggleWhiteList"></a>
      <lucky-white-list
        :list="participantNameList"
        :session="session"  
        :style="{transform: whiteListVisible ? 'scale(1)' : 'scale(0)', marginTop: '60px'}"
        @changed="onWhiteListChanged">
      </lucky-white-list>
    </div>

    <!-- 增加抽奖会话 -->
    <div class="luck-session">
      <a 
        class="luck-session-button" 
        href="javascript: void 0;" 
        @click="toggleLuckSessionVisible"
      >
        抽奖会话
      </a>
      <luck-board
        class="luck-board"
        :style="{transform: luckSessionVisible ? 'scale(1)' : 'scale(0)', marginTop: '60px' }"
        @change="onLuckSessionChange"
      />
    </div>

  </div>  
</template>

<script>
import LuckyImageGrid from '@/components/lucky-image-grid/lucky-image-grid'
import LuckyRegisterQrcode from '@/components/lucky-register-qrcode/lucky-register-qrcode'
import LuckyWhiteList from '@/components/lucky-white-list/lucky-white-list'
import LuckyPeopleDisplay from '@/components/lucky-people-display/lucky-people-display'
import LuckBoard from '@/components/luck-board/luck-board'

import { integerRangeRandom } from '@/utils/math'

const randomGenerator = integerRangeRandom()

import Api from '@/api'

export default {
  components: {
    LuckyImageGrid,
    LuckyRegisterQrcode,
    LuckyWhiteList,
    LuckyPeopleDisplay,
    LuckBoard
  },
  data () {
    LuckBoard
    return {
      participantList: [
        {session: '2021', name: '张云峰', src: 'https://cdn.dribbble.com/users/2076798/screenshots/14007967/media/22cd0a660328ff5593cecdb58491c770.jpg?compress=1&resize=400x300', forbidden: false },
        {session: '2021', name: '张三', src: 'https://cdn.dribbble.com/users/2076798/screenshots/14007967/media/22cd0a660328ff5593cecdb58491c770.jpg?compress=1&resize=400x300', forbidden: false },
        {session: '2021', name: '张云峰2', src: 'https://cdn.dribbble.com/users/2076798/screenshots/14007967/media/22cd0a660328ff5593cecdb58491c770.jpg?compress=1&resize=400x300', forbidden: false },
        {session: '2021', name: '张三2', src: 'https://cdn.dribbble.com/users/2076798/screenshots/14007967/media/22cd0a660328ff5593cecdb58491c770.jpg?compress=1&resize=400x300', forbidden: false }
      ], // 所有的参与者
      session: '',
      whiteListVisible: false,
      whiteList: [], // only save name

      context: {
        S_START: 'start',
        S_DRAWING: 'drawing',
        S_CONFIRM: 'confirm',
        numLuckyPeople: 0,
        state: 'start', // 抽奖状态: start, drawing, confirm,  start => drawing => confirm => start
        randomIndex: -1,
        luckyPeople: [],
        proposalLuckyPeopleIndexes: []
      },

      luckSessionVisible: false,
      currentLuckSession: {}
    }
  },

  computed: {
    qrCodeContent () {
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

    randomParticipantList () {
      let maxLength = Math.min(20, this.validParticipantList.length)
      return this.validParticipantList.slice(0, maxLength)
    },

    validParticipantList () { // 可以抽奖的人，签到并且还没有中奖
      return this.checkedParticipantList.filter(item => !item.forbidden)
    },

    forbiddenParticipantList () { // 被禁止的人（抽过奖的也会被禁止)
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
      if (onMessageEvent.data.length <= 1) { // this is heart beat
        // eslint-disable-next-line no-console
        console.log('keep-alive heartbeat ', onMessageEvent.data)
        return
      }
      let data = JSON.parse(onMessageEvent.data)
      // eslint-disable-next-line no-console
      console.log('onWebSocketMessage Data: ', onMessageEvent.data)
      if (data.action === 'AllUsers') {
        let forbiddenNames = this.loadLuckyNamesLocal()
        this.participantList = data.data.map(item => {  
          return { session: item.session, name: item.user.trim(), src: item.avatar, forbidden: forbiddenNames.indexOf(item.user.trim()) > -1 }
        })
      }

      if (data.action === 'NewUser') {
        let inChecinList = this.whiteList.includes(data.data.user.trim())
        if (inChecinList) {
          this.$message({ message: data.data.user + ' 签到成功', type: 'success' })
        } else {
          this.$message({ message: data.data.user + '(外部人员) 扫码加入', type: 'warning' })
        }

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
      const luckyPeopleNames = []
      // 中奖人 从参与抽奖人中移除， 加入到已中奖的栏中
      this.context.luckyPeople.forEach((people) => {
        luckyPeopleNames.push(people.name)

        Array.from({length: this.participantList.length}).forEach((v, index) => {
          let item = this.participantList[index]
          if (item.name === people.name) {
            item.forbidden = true
            this.participantList.splice(index, 1, item)
          }
        })
      })

      // 保存抽奖的结果
      if (luckyPeopleNames.length > 0) {
        this.commitLuckyPeople(luckyPeopleNames)
      }

      // 本地存储中奖人姓名
      this.saveLuckyNamesLocal()
      this.toNextState()
    },

    startDrawing () {
      requestAnimationFrame(() => {
        let indexes = this.generateRandomIndexes(this.context.numLuckyPeople)
        this.context.randomIndex = indexes[0] || 0

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
        let index = randomGenerator(0, cloneValidParticipantList.length-1)
        this.context.proposalLuckyPeopleIndexes.push(cloneValidParticipantList[index].index)
        cloneValidParticipantList.splice(index, 1)
      }
      return this.context.proposalLuckyPeopleIndexes
    },

    toggleWhiteList () {
      // eslint-disable-next-line no-console
      console.log('toggle white list')
      this.whiteListVisible = !this.whiteListVisible
      if (this.whiteListVisible) {
        this.luckSessionVisible = false
      }
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
      if (count < 1) {
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
    },


    toggleLuckSessionVisible () {
      this.luckSessionVisible = !this.luckSessionVisible
      if (this.luckSessionVisible) {
        this.whiteListVisible = false
      }
    },

    onLuckSessionChange (luckSession) {
      this.currentLuckSession = luckSession
      this.context.numLuckyPeople = this.currentLuckSession ? this.currentLuckSession.count : 0
    },

    commitLuckyPeople (people) {
      let session = this.currentLuckSession.session
      let luckId = this.currentLuckSession.luckId
      Api.commitLuckyPeople({ session, luckId, people }).then(res => {
        if (res.code === 0) {
          this.$message.success("中奖信息保存成功")
        } else {
          this.$message.error(`中奖信息保存失败(${res.code})`)
        }
      })
    },
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

  background-image: radial-gradient(50% 109%, #F95F4C 42%, #9E1010 100%);
  // background-image: radial-gradient(farthest-corner at 50% 109%, #F95F4C, #9E1010);
  // background-image: radial-gradient(farthest-side at 50% 109%, #F95F4C, #9E1010);
  border: 1px solid #979797;

  &::before {
    position: absolute;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    content: "";
    background: url("~@/assets/bg-layer.png") no-repeat;
    background-position: 50% 0;
  }

  .title {
    display: block;
    height: 98px;
    margin-bottom: 0;
    margin-block-start: 40px;
    padding: 0;
    line-height: 98px;
    font-size: 70px;
    text-align: center;
    color: #fff2a7;
  }
}

.lucky-register-qrcode {
  position: absolute;
  left: 60px;
  top: 30px;
  width: 100px;
  padding: 5px;
  background: rgba(#fff, 1);
  transition: all .5s;
  transform: scale(1);
  transform-origin: left top;
  z-index: 100;

  &:hover {
    transform: scale(6);
  }
}

.luckydraw-participant {
  position: absolute;
  left: 60px;
  top: 0;
  width: 462px;
  height: 780px;
  overflow: hidden;
  box-sizing: border-box;
  background-color: rgba(#000, .15);
  border-radius: 10px;

  transition: opacity .3s;
  opacity: 1;

  &__title {
    text-align: center;
    color: #fff2a7;
    font-size: 30px;
    font-weight: 400;
    margin-block-start: 30px;
    margin-block-end: 20px;
  }
  &__wrapper {
    overflow: auto;
    height: 670px;
  }
}

.luckydraw-main {
  position: absolute;
  left: 50%;
  height: 820px;
  overflow: hidden;
  text-align: center;
  transform: translateX(-50%);

  &__button {
    width: 270px;
    height: 64px;
    margin-top: 0;
    font-size: 36px;
    border: none;
    font-weight: 500;
    padding: 0;
    margin: 0;
    border-radius: 0;
  }

  &__start {
    background: url("~@/assets/start-draw-button.svg") no-repeat;
    background-size: 100% 100%;
    color: #BD2B24;
  }

  &__drawing {
    background: url("~@/assets/stop-draw-button.svg") no-repeat;
    background-size: 100% 100%;
    color: #BD2B24;
  }

  &__confirm {
    width: 270px;
    margin: 0 auto;

    &-yes {
      width: 125px;
      font-size: 18px;
      border-radius: 60px;
      background-color: #BD2B24;
      border: 1px solid #BD2B24;
      color: #fff2a7;
      font-weight: 500;

    }

    &-no {
      width: 125px;
      font-size: 18px;
      border-radius: 60px;
      border: 1px solid #BD2B24;
      color: #BD2b24;
      font-weight: 500;
    }
    
  }

  /deep/ &__count-input {
    border: none;
    display: block;
    width: 220px;
    margin: 0 auto;
    margin-top: 10px;
    text-align: center;

    > .el-input__inner {
      border: none;
      margin: 0;
      padding: 0;
      line-height: 30px;
      height: 30px;
      background-color: rgba(#000, 0);
      border-radius: 0;
      border-bottom: 2px solid #fff2a7;
      text-align: center;
      font-size: 20px;
      font-weight: 500;
      color: #fff2a7;
      outline: none;

      &::placeholder {
        font-weight: 500;
        font-size: 16px;
        color: rgba(@mainColor, .5);
      }
    }
  }

  &__hrl {
    position: absolute;
    left: 50%;
    top: 178px;
    width: 380px;
    height: 460px;
    transform: translateX(-50%);
    text-align: center;

    &-viewport {
      position: absolute;
      left: 0;
      top: 0;
      width: 380px;
      height: 380px;
      overflow: hidden;
      // border-radius: 50%;
      background: url("~@/assets/avatar-bg.svg") no-repeat;
      background-size: 100% 100%;

      .img-bg {
        position: absolute;
        left: 15px;
        top: 15px;
        width: 350px;
        height: 350px;
        background-size: 100% 100%;
        clip-path: circle(50%);
        border-radius: 50%;
      }
    }

    span {
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;

      display: block;
      height: 56px;
      line-height: 56px;
      color: #fef1ba;
      font-size: 40px;
      box-sizing: border-box;
      text-align: center;
    }
  }

  &__lpd {
    position: absolute;
    left: 50%;
    top: 178px;
    width: 930px;
    height: 460px;
    transform: translateX(-50%);
    text-align: left;
    box-sizing: border-box;
    padding: 0 50px;
  }
}

.luckydraw-forbidden {
  position: absolute;
  right: 60px;
  top: 0;
  width: 462px;
  height: 780px;
  overflow: hidden;
  box-sizing: border-box;
  background-color: rgba(#000, .15);
  border-radius: 10px;

  transition: opacity .3s;
  opacity: 1;

  &__title {
    text-align: center;
    color: #fff2a7;
    font-size: 30px;
    font-weight: 400;
    margin-block-start: 30px;
    margin-block-end: 20px;
  }
  &__wrapper {
    overflow: auto;
    height: 670px;
  }
}

.lucky-checkin {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  height: 50px;
  width: 100%;
  z-index: 100;

  .lucky-checkin-button {
    position: absolute;
    top: 64px;
    right: 0;
    display: block;
    width: 146px;
    height: 50px;
    background: url("~@/assets/checkin-button.svg") no-repeat;
    background-size: 100% 100%;
  }

  .lucky-white-list {
    height: 860px;
  }
}

.luck-session {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  height: 50px;
  width: 100%;
  z-index: 100;
  text-align: center;

  &-button {
    position: absolute;
    top: 114px;
    right: 0;
    display: block;
    width: 146px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background: rgba(255,255,255,.15);
    border-radius: 50px 0 0 50px;
    font-size: 20px;
    font-weight: 600;
    color: #fff2a7;
  }

  .luck-board {
    margin: 0 auto;
    width: 60%;
    height: 860px;
  }
}

</style>


<style lang="less" scoped>
.luckydraw-confirming {
  .luckydraw-main__lpd {
    width: 1070px;
  }
  .luckydraw-participant {
    transition: opacity .3s;
    opacity: 0;
  }

  .luckydraw-forbidden {
    transition: opacity .3s;
    opacity: 0;
  }
}
</style>
