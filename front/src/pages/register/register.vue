<template>
  <div class="register">
    <p class="title">瓶子科技2019年会抽奖</p>
    <el-row>
      <van-uploader :after-read="afterRead"></van-uploader>
    </el-row>
    <el-row class="form">
      <el-input placeholder="请输入姓名"></el-input>
    </el-row>
    <el-row class="submit-button">
      <el-button type="primary" :disabled="FormDisabled" @click="register">参与抽奖</el-button>
    </el-row>
  </div>
</template>


<script>
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

    },

    afterRead (file) {
      console.log("file: ", file)
    }
  }
}
</script>

<style lang="less" scoped>
.register {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  text-align: center;

  .title {

  }

  .form {
    margin-top: 10%;
  }

  .submit-button {
    margin-top: 10%;
  }
}
</style>
