<template>
  <div class="lucky-image-grid">
    <div class="grid">
      <div class="grid-item" v-for="(img, index) in images" :key="index">
        <div class="grid-item__img" :style="{backgroundImage: 'url(' + img.src + ')'}"></div>
        <div class="grid-item__container">
          <h2>{{img.name}}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LuckyImageGrid",
  props: {
    images: {
      type: Array,
      default: function () {
        return []
      }
    }
  },

  data() {
    return {
    };
  }
};
</script>

<style lang="less" scoped>

.lucky-image-bed {
  position: relative;
  width: 100%;
  height: 100%;
}

.grid {
  display: flex;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: start;
  align-items: flex-start;

  .grid-item {
    position: relative;
    width: 100px;
    height: 100px;
    margin: 5px;

    &__img {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;

      display: block;
      margin: 0;
      line-height: 0;
      max-width: 100px;
      height: auto;
      background-size: contain;
      clip-path: circle(50% at center center);

      &::before {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        content: '';
        opacity: 0;
        transition: opacity 0.5s;
        background: rgba(purple, .25);
      }

      &::after {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        content: '';
        opacity: 0;
        transition: opacity 0.5s;
        background: linear-gradient(to top, transparent, rgba(black, 0.5), transparent);

      }
    }

    &__container {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%) scale(.9);
      width: 100%;
      
      font-weight: 400;
      font-size: 10px;
      color: #fff;
      text-align: center;

      opacity: 0;
      will-change: transform;
      backface-visibility: hidden;
      transition: all .5s;

      h2 {
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
      }
    }

    &:hover {
      .grid-item__container {
        opacity: 1;
        transform: translate(-50%, -50%) scale(1);
      }

      .grid-item__img {
        &::before {
          opacity: 1;
        }
        &::after {
          opacity: 1;
        }
      }
    }
  } 
}
</style>
