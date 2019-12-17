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
          <el-button size="large" :type="running ? 'warning' : 'primary'" class="luckydraw-main__button" @click="onButtonClick">{{running ? '产生幸运儿...' : '开始抽奖'}}</el-button>
          <div class="luckydraw-main__image">
            <h3 v-show="randomIndex > -1" style="color: red;">{{ participantList[randomIndex] && participantList[randomIndex].name}}</h3>
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
  </div>  
</template>

<script>
import LuckyImageGrid from '@/components/lucky-image-grid/lucky-image-grid'
export default {
  components: {
    LuckyImageGrid
  },
  data () {
    return {
      participantList: [{
          name: "张云峰",
          src:
            "https://res.cloudinary.com/zayfen/image/upload/v1576564059/img/wcylb7hjawi32w8ip72l.jpg"
        },
        {
          name: "def",
          src:
            "https://res.cloudinary.com/zayfen/image/upload/v1576564059/img/mbzfmu8fbbtt9vtfsrrk.jpg"
        },
        {
          name: "xxx",
          src:
            "https://res.cloudinary.com/zayfen/image/upload/v1576564059/img/prifpr8dchbxcvdkt6w9.jpg"
        },
        {
          name: "sss",
          src:
            "https://res.cloudinary.com/zayfen/image/upload/v1576564059/img/idzscqkbuxccetwrzraj.jpg"
        }],
      forbiddenList: [
        {
          name: "zzz",
          src:
            "https://res.cloudinary.com/zayfen/image/upload/v1576564059/img/ch1mmihskxrt3wia7v6j.jpg"
        }],
      running: false,
      randomIndex: -1,
    }
  },

  methods: {
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
        console.log("randomIndex: ", this.randomIndex)
        this.startDraw()
      })
    },

    generateRandomIndex () {
      let length = Math.max(1, this.participantList.length)
      let number = Math.ceil(Math.random() * Math.pow(10, ('' + length).length))
      return number % length
    }
  }
}
</script>

<style lang="less" scoped>
.luckydraw {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;

  background: linear-gradient(#373b44, #4286f4);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  font-size: 30px;

  .title {
    text-align: center;
    color: red;
    margin-bottom: 0;
    padding: 0;
  }
}

.luckydraw-participant {
  position: relative;
  height: 820px;
  overflow: hidden;
  box-sizing: border-box;
  border-top: 5px solid gray;
  border-right: 5px solid gray;


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
  }
}

.luckydraw-forbidden {
  position: relative;
  height: 820px;
  overflow: hidden;
  box-sizing: border-box;
  border-left: 5px solid gray;
  border-top: 5px solid gray;

  &__title {
    text-align: center;
    color: #ccc;
  }
  &__wrapper {
    overflow: auto;
    height: 800px;
  }
}
</style>
