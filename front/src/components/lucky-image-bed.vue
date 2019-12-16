<template>
  <div class="lucky-image-bed">
    <el-row>

    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      images: []
    }
  },

  methods: {
    addImage (name, src) {
      this.images.push({ name, src })
    },

    removeImage (name, src) {
      let foundIndex = this.images.findIndex (image => image.name === name && image.src === src)
      if (foundIndex === -1) {
        return
      }
      this.images.splice(foundIndex, 1)
    },

    removeImageByNames (names) {
      if (!names || names.length === 0) {
        return
      }
      let foundIndex = this.images.findIndex(image => image.name === names[0])
      if (foundIndex > -1) {
        this.images.splice(foundIndex, 1)
      }
      this.removeImageByNames(names.slice(1))
    },

    removeImageBySrces (srces) {
      if (!names || names.length === 0) {
        return
      }
      let foundIndex = this.images.findIndex(image => image.src === srces[0])
      if (foundIndex > -1) {
        this.images.splice(foundIndex, 1)
      }
      this.removeImageByNames(srces.slice(1))
    }
  }
}
</script>

<style lang="less" scoped>
.lucky-image-bed {
  position: relative;
  width: 100%;
  height: 100%;  
}

</style>
