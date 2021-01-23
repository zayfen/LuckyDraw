<template>
  <div class="page">
    <div class="draw-luck">
      <div class="draw-luck-title luck-title">
        当前奖品
      </div>

      <div class="draw-luck-prize">
        {{currentLuckSession.prizes}}
        <span style="margin: 0 0.3rem;color:#ffd790;">x</span>
        {{currentLuckSession.count}}
      </div>

      <div class="draw-luck-luckypeople">
        <div class="luckypeople-title">中奖名单</div>
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

      <div class="luck-button breath">
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
    </div>
  </div>
</template>


<script>
import LuckBoard from '@/components/luck-board/luck-board.vue'
export default {
  components: { LuckBoard },
  
  data () {
    return {
      currentLuckSession: {
        prizes: 'iphone12iphone12iphone12iphone12iphone12iphone12iphone12',
        count: 10,
        startTime: 0
      },

      nowTimestamp: Date.now(),
      allPeopleNames: '上课的接口数据反馈收集反馈收集反馈是否我微商的看法开始疯狂适当加分考生加分考生张云峰，张云峰，张云峰，张云峰，张云峰',
      allLucks: [
        { prize: 'Iphone 12', count: 1, owner: '张云峰' },
        { prize: 'Mac pro', count: 1, owner: '张云峰' },
        { prize: '苹果耳机', count: 1, owner: '张云峰' },
        { prize: '电饭锅', count: 1, owner: '张云峰' },
        { prize: '五万元奖金', count: 1, owner: '张云峰' },
        { prize: '一个月调休', count: 1, owner: '张云峰' },
      ]
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

    stateText () {
      if (this.couldDraw) {
        return '点击我抽奖，点的越快中奖概率越高哦^_^'
      }
      return ((this.nowTimestamp - this.currentLuckSession.startTime) / 1000) + ' 秒后开始抽奖'
    },

    // 是否可以抽奖了
    couldDraw () {
      return this.currentLuckSession && this.currentLuckSession.startTime <= this.nowTimestamp
    },

    luckSessionStartTime () {
      if (!this.currentLuckSession) {
        return '无'
      }

      let date = new Date(this.currentLuckSession.startTime)
      return [date.getFullYear(), date.getMonth() + 1, date.getDate()].join('/') + '  ' + [date.getHours(), date.getMinutes(), date.getSeconds()].join(':')
    }
  },

  created () {
    setInterval(() => {
      this.nowTimestamp = Date.now()
    }, 1000);
  },

  methods: {
    onCurrentLuckChange (luck) {
      this.currentLuckSession = luck
    },

    onLuckyButtonClick () {
      if (!this.couldDraw) {
        return this.$message.error('还没有到抽奖时间！')
      }

      // 开始抽奖的动画
      this.$message.success("正在抽奖")
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
    transform: scale(1.3);
  }
  60% {
    transform: scale(1.2);
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
}
</style>

<style lang="less" scoped>
@baseFontSize: 20rem;

.page {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgb(155,0,5);
  background-image: url('../../assets/luck-bg.png');
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center;

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
      opacity: 0.68;
      background: rgba(255,215,144,0.32);
      border: 1/@baseFontSize solid #FFD790;
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
</style>
