<template>
  <div class="lucky-image-grid">
    <div class="grid"
      :class="[{ 'left': 'grid-left', 'center': 'grid-center', 'right': 'grid-right'}[align] || 'center']">
      <div class="grid-item" 
        v-for="(item, index) in data" 
        :class="[{ 'small': 'grid-item__small', 'normal': 'grid-item__normal', 'large': 'grid-item__large'}[size] || 'normal', showname ? 'grid-item__showname' : '' ]" 
        :key="index">
        <div class="grid-item__img" :style="{backgroundImage: 'url(' + item.src + ')'}"></div>
        <div class="grid-item__container">
          <h2>{{item.name}}</h2>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "LuckyImageGrid",
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    },
    align: {
      type: String,
      default: 'center',
      validator (type) {
        return ['left', 'center', 'right'].indexOf(type) > -1
      }
    },
    size: {
      type: String,
      default: 'normal',
      validator (size) {
        return ['normal', 'small', 'large'].indexOf(size) > -1
      }
    },
    showname: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
    };
  }
};
</script>

<style lang="less" scoped>
@normalGridItemWidth: 100px;
@normalGridItemHeight: 100px;

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
  justify-content: center;
  align-items: flex-start;
  transition: all .5s;

  &-left {
    justify-content: left;
  }
  &-center {
    justify-content: center;
  }
  &-right {
    justify-content: right;
  }

  .grid-item {
    position: relative;
    width: @normalGridItemWidth;
    height: @normalGridItemHeight;
    margin: 5px;

    &__small {
      width: calc(@normalGridItemWidth * 2 / 3);
      height: calc(@normalGridItemHeight * 2 / 3);
      
      .grid-item__img {
        max-width: calc(@normalGridItemWidth * 2 / 3);
      }
    }

    &__large {
      width: calc(@normalGridItemWidth * 1.5);
      height: calc(@normalGridItemHeight * 1.5);

      .grid-item__img {
        max-width: calc(@normalGridItemWidth * 1.5);
      }
    }

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
      background-size: cover;
      background-repeat: no-repeat;
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

    &:hover, &__showname {
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
