<template>
  <div class="page">
    <div class="draw-luck">
      <div class="draw-luck-title luck-title">
        当前奖品
      </div>

      <div 
        v-if="currentLuckSession" 
        class="draw-luck-prize"
      >
        {{currentLuckSession.prizes}}
        <span style="margin: 0 0.3rem;color:#ffd790;">x</span>
        {{currentLuckSession.count}}
      </div>
      <div 
        v-else
        class="draw-luck-prize"
      > 
        暂无抽奖
      </div>

      <div
        v-if="false"
        class="draw-luck-luckypeople"
      >
        <div class="luckypeople-title">参与名单</div>
        <div class="luckypeople-display">
          <span 
            class="word-loop-anim"
            style="display: inline-block;height: 100%;margin-left:100%;word-break:keep-all;white-space:nowrap;"
            :style="wordsLoopStyle"
          >
          {{allPeopleNames}}
          </span>
        </div>
      </div>


      <!-- 能量条 -->
      <div class="progress">
        <!-- <progress max="100" :value="progressValue"/> -->
        <div 
          class="progress-inner" 
          :style="{width: progressValue + '%'}">
        </div>
      </div>
      <div 
        class="luck-button"
        :class="[currentLuckSession ? 'breath' : '' ]"
        :style="luckButtonStyle"
        @click="onLuckButtonClick"
      >
      </div>

      <!-- 中将名单 -->
      <div class="luckypeople-table">
        <span class="luckypeople-table-title luck-title">
          中奖名单
        </span>
        <div class="luck-table">
          <div class="luck-table-head row">
            <div class="head col">奖品名称</div>
            <div class="head col">奖品数量</div>
            <div class="head col">中奖名单</div>
          </div>
          <div class="luck-table-body">
            <div 
              v-for="(luck, index) in allLucks" 
              :key="index" 
              class="row"
            >
              <div class="col">{{luck.prize}}</div>
              <div class="col">{{luck.count}}</div>
              <div class="col">{{luck.owner}}</div>
            </div>
          </div>
        </div>
      </div>

      <!-- 当前中奖的用户的弹窗 -->
      <div 
        class="dialog" 
        :class="{ 'dialog-show' : newLucks.length > 0 }"
      >
        <div 
          class="close-button"
          @click="updatePreAllLucks"
        >
          <el-button 
            type="danger" 
            icon="el-icon-circle-close" 
            circle 
          />
        </div>

        <div class="dialog-inner">
          <div class="luckypeople-table">
            <span class="luckypeople-table-title luck-title">
              中奖名单
            </span>
            <div class="luck-table">
              <div class="luck-table-head row">
                <div class="head col">奖品名称</div>
                <div class="head col">奖品数量</div>
                <div class="head col">中奖名单</div>
              </div>
              <div class="luck-table-body">
                <div 
                  v-for="(luck, index) in newLucks"
                  :key="index" 
                  class="row"
                >
                  <div class="col">{{luck.prize}}</div>
                  <div class="col">{{luck.count}}</div>
                  <div class="col">{{luck.owner}}</div>
                </div>
              </div>
            </div>
          </div>        
        </div>
      </div>

    </div>
  </div>
</template>


<script>
import Api from '../../api/index'

export default {
  
  data () {
    return {
      session: this.$route.params.session,
      luckySessions: [],
      luckyPeople: [],

      nowTimestamp: Date.now(),
      allPeopleNames: '',
      luckButtonClicks: 0,
      luckButtonHandler: 0,

      preAllLucks: [] // 保存上一轮的的幸运儿
    }
  },

  computed: {
    wordsLoopStyle () {
      // 20个字，5s
      const duration = this.allPeopleNames.length / 40 * 5
      return {
        animationDuration: `${duration}5s`,
      }
    },

    progressValue () {
      return Math.min(this.luckButtonClicks / 1.3, 100)
    },

    luckButtonStyle () {
      if (this.luckButtonClicks <= 0) {
        return {
          animationDuration: '0ms'
        }
      }

      const maxClicks = 2000
      
      const durationMs = maxClicks / this.luckButtonClicks
      return {
        animationDuration: `${durationMs}ms`
      }
    },

    // 是否可以抽奖了
    couldDraw () {
      // return this.currentLuckSession && this.currentLuckSession.startTime <= this.nowTimestamp
      return !!this.currentLuckSession
    },

    currentLuckSession () {
      const sessions = this.luckySessions.filter(s => !s.finished)
      sessions.sort((a, b) => a.startTime - b.startTime)
      return sessions[0]
    },

    luckSessionStartTime () {
      if (!this.currentLuckSession) {
        return '无'
      }

      let date = new Date(this.currentLuckSession.startTime)
      return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('/') + '  ' + [date.getHours(), date.getMinutes(), date.getSeconds()].join(':')
    },

    allLucks () {
      const list = this.luckyPeople.map(lp => {
        const session = this.luckySessions.find(ls => ls.luckId === lp.luckId)
        if (!session) {
          return void 0
        }
        return {...lp, prize: session.prizes }
      })
      const allLucks = []
      console.log('allLucks.list: ', list)
      list.forEach(item => {
        item?.users.forEach(user => {
          console.log("user: ", user)
          allLucks.push({ prize: item.prize, count: 1, owner: user[0] })
        })
      })

      console.log('allLucks: ', allLucks)
      return allLucks
    },

    newLucks () {
      if (this.allLucks.length === this.preAllLucks.allLucks) {
        return []
      }

      // 产生了新的抽奖
      let diff = this.allLucks.filter(x => -1 === this.preAllLucks.findIndex(y => y.prize === x.prize && y.count === x.count && y.owner === x.owner))
      return diff.slice(0)
    }
  },

  created () {
    if (!this.session) {
      this.$message.error('URL中请指定session')
    } else {
      this.requestLuckSessions()
      // this.fetchUsers()
    }

    // setInterval(() => {
    //   this.nowTimestamp = Date.now()
    // }, 1000);
  },

  methods: {
    // fetchUsers () {
    //   Api.fetchUsers(this.session).then(res => {
    //     if (res.code === 0) {
    //       const users = res.data || []
    //       this.allPeopleNames = users.map(u => u.user).join('，')
    //     }
    //   })
    // },

    requestLuckSessions () {
      Api.fetchLuckSessions(this.session).then(res => {
        if (res.code === 0) {
          this.luckySessions = res.data.luckSessions
          this.luckyPeople = res.data.luckyPeople
        }

        // 每2秒拉一次数据
        setTimeout(this.requestLuckSessions.bind(this), 2000)
      }).catch(err => {
        // 每3秒拉一次数据
        setTimeout(this.requestLuckSessions.bind(this), 3000)
      })
    },

    onLuckButtonClick () {
      if (!this.couldDraw) {
        return this.$message.error('还没有创建新的抽奖！')
      }
      
      // 开始抽奖的动画
      this.luckButtonClicks += 1
      console.log('luckButtonClicks: ', this.luckButtonClicks)

      // 250ms之后，开始冷静
      clearTimeout(this.luckButtonHandler)
      this.luckButtonHandler = setTimeout(() => {
        this.calmdown()
      }, 250)
    },

    calmdown () {
      clearTimeout(this.luckButtonHandler)
      if (this.luckButtonClicks < 5) {
        this.luckButtonClicks = 0
        return
      }
      this.luckButtonClicks = this.luckButtonClicks * 0.9

      this.luckButtonHandler = setTimeout(() => {
        this.calmdown()
      }, 250)
    },

    updatePreAllLucks () {
      this.preAllLucks = this.allLucks.slice(0)
    }
  }
}
</script>

<style lang="less">

@keyframes wordloop {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-120%);
  }
}

@keyframes zoom {
  0% {
    transform: scale(1);
  }
  40% {
    transform: scale(1.2);
  }
  60% {
    transform: scale(1.1);
  }

  100% {
    transform: scale(1);
  }
}

.word-loop-anim {
  animation: 5s wordloop linear infinite normal;
}

.breath {
  animation: zoom 1s linear infinite;
  transform: translateZ(0);  // 开启硬件加速
  -webkit-backface-visibility: hidden;
  -webkit-perspective: 1000;
}
</style>

<style lang="less" scoped>
@baseFontSize: 20rem;

.progress {
  width: 60%;
  height: 0.6rem;
  border-radius: 0.3rem;
  line-height: 0;
  overflow: hidden;
  background: #fff;
  margin-top: 0.5rem;

  &-inner {
    height: 100%;
    background: #f9ac47;
    border-radius: 0.2rem;
    transition: width 50ms;
  }
}

.page {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #9b0005;
  background-image: url('../../assets/luck-bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;
  overflow-x: hidden; 
  overflow-y: auto;

  .draw-luck {
    width: 100vw;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center;

  .luck-title {
    position: relative;
    font-size: 1.05rem;
    font-weight: 600;
    color: #FFD790;

    &::before {
      position: absolute;
      left: -1.15rem;
      top: 50%;
      display: block;
      width: 0.9rem;
      height: 0.55rem;
      content: "";
      background: url("../../assets/icon_mark.svg") no-repeat;
      background-size: 100% 100%;
      transform: translateY(-50%);
    }
    &::after {
      position: absolute;
      top: 50%;
      right: -1.15rem;
      transform: translateY(-50%);
      display: block;
      width: 0.9rem;
      height: 0.55rem;
      content: "";
      background: url("../../assets/icon_mark.svg") no-repeat;
      background-size: 100% 100%;
    }    
  }

  &-title {
    position: relative;
    margin-top: 1.8rem;
  }

  &-prize {
    width: 295/@baseFontSize;
    line-height: 35/@baseFontSize;
    text-align: center;
    font-size: 25/@baseFontSize;
    color: #fff;
    font-weight: 600;
    margin-top: 6/@baseFontSize;
    word-break: break-all;
  }

  &-luckypeople {
    margin-top: 24/@baseFontSize;
    text-align: center;

    .luckypeople-title {
      font-size: 21/@baseFontSize;
      color: #ffd790;
      font-weight: 600;
      line-height: 29.5/@baseFontSize;
      height: 29.5/@baseFontSize;
    }

    .luckypeople-display {
      position: relative;
      width: 295/@baseFontSize;
      height: 35/@baseFontSize;
      line-height: 35/@baseFontSize;
      margin-top: 6/@baseFontSize;
      font-size: 25/@baseFontSize;
      color: #fff;
      overflow: hidden;
    }
  }

  .luck-button {
    width: 191/@baseFontSize;
    height: 191/@baseFontSize;
    margin-top: 29/@baseFontSize;
    background: url("../../assets/luck_btn.png") no-repeat;
    background-size: 100% 100%;
    cursor: pointer;
  }

  .luckypeople-table {
    margin-top: 23.5/@baseFontSize;
    text-align: center;
    padding-bottom: 1.8rem;

    &-title {
      margin-bottom: 15/@baseFontSize;
    }

    .luck-table {
      width: 329.5/@baseFontSize;
      height: auto;
      background: rgba(255,215,144,0.25);
      border: 1/@baseFontSize solid rgba(255, 215, 144, 0.6);
      border-radius: 17/@baseFontSize;
      padding: 1rem 0;
      margin-top: 15/@baseFontSize;

      .row {
        width: 100%;
        display: flex;
        text-align: center;
        justify-content: space-between;
        flex-wrap: nowrap;
        align-items: center;

        .col {
          width: 33.3%;
          line-height: 21/@baseFontSize;
          font-weight: 600;
          box-sizing: border-box;
          padding: 0 5/@baseFontSize;
        }
      }

      .row + .row {
        margin-top: 16/@baseFontSize;
      }

      &-head {
        color: #fff;
        font-weight: 600;
        font-size: 15/@baseFontSize;
      }
      &-body {
        margin-top: 16/@baseFontSize;
        font-size: 15/@baseFontSize;
        color: #ffd790;
        font-weight: 600;
      }
    }
  }
}
}


.dialog {
  position: absolute;
  left: 0;
  top: 0;
  display: block;
  width: 100%;
  height: 100%;
  transition: 0.3s transform ease-in-out;
  background: rgba(0,0,0,0.5);
  left: -200%;
  transform: scale(0);
  overflow: hidden;

  &-show {
    left: 0;
    transform: scale(1);
  }

  .close-button {
    position: absolute;
    width: 40/20rem;
    height: 40/20rem;
    border-radius: 50%;
    top: 10/20rem;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    line-height: 40/20rem;
  }

  .dialog-inner {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    padding: 10/20rem;
    background: #333;
    border-radius: 4/20rem;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1/20rem 4/20rem;
    max-height: 60%;
    overflow-x: hidden;
    overflow-y: auto;

    .luckypeople-table {
      margin-top: 0;
      padding-bottom: 0;
    }
  }
}
</style>
