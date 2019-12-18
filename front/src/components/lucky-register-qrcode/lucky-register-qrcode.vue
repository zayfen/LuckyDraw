<template>
  <div class="lucky-register">
    <img :src="qrcodeBase64Data"/>
  </div>
</template>

<script>
import { generatorQRCode } from '@/utils/qrcode'
export default {
  name: 'LuckyRegisterQrcode',
  props: {
    text: String
  },

  data () {
    return {
      qrcodeBase64Data: ''
    }
  },

  created () {
    return generatorQRCode(this.text).then(base64Data => {
      this.qrcodeBase64Data = base64Data
    })
  }
}
</script>

<style lang="less" scoped>
  .lucky-register {
    position: relative;
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
    img {
      display: block;
      width: 100%;
      height: 100%;
      margin: 0;
      padding: 0;
      line-height: 0;
    }
  }
</style>

