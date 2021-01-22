<template>
  <div class="draw-luck">
    <div class="luck-sessions-table">
      <div class="title">抽奖列表</div>
      <luck-board :show-create-button="false" @change="onCurrentLuckChange"/>
    </div>

    <div v-if="currentLuckSession" class="current-luck-session">
       <div class="title">当前抽奖 <span>[{{ luckSessionStartTime }}]</span></div>
       <div class="prizes-wrapper">
         <label class="label">奖品：</label>
         <span class="prizes" style="color: red">{{ currentLuckSession.prizes }}</span>
         <span class="count"> --- {{ currentLuckSession.count }}个</span>
       </div>

       <div 
        class="lucky-button"
        @click="onLuckyButtonClick"
      >

       </div>
    </div>
    <div v-else class="no-luck-session">
      没有抽奖！
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
        prizes: '',
        count: 0,
        startTime: 0
      },

      nowTimestamp: Date.now()
    }
  },

  computed: {
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


<style lang="less" scoped>
.draw-luck {
}
</style>
