<template>
  <div class="lucky-people-display">
    <span class="lucky-people-display__title">中奖名单</span>
    <div class="grid">
      <div class="grid-item"
        v-for="(people, index) in data" :key="index">
        <div class="grid-item__avatar" :style="{backgroundImage: ['url(', people.src ,')'].join('')}"></div>
        <span class="grid-item__name">{{people.name}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LuckyPeopleDisplay',
  props: {
    data: {
      type: Array,
      default: function () {
        return []
      }
    }
  }
}
</script>

<style lang="less" scoped>
.lucky-people-display {
  position: relative;
  width: 100%;
  height: auto;

  &__title {
    display: block;
    width: 100%;
    font-size: 40px;
    color: #FFF2A7;
    text-align: center;
  }

  .grid {
    display: flex;
    max-width: 100%;
    height: auto;
    max-height: 100%;
    margin: 0 auto;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    transition: all .5s;
    overflow: auto;
  }

  .grid-item {
    display: block;
    width: 136px;
    height: 181px;
    overflow: hidden;
    margin: 25px;

    &__avatar {
      width: 136px;
      height: 136px;
      clip-path: circle(50%);
      border-radius: 50%;
      background-size: cover;
      background-repeat: no-repeat;
    }

    &__name {
      display: block;
      width: 100%;
      height: 33px;
      margin-top: 12px;
      line-height: 33px;
      font-size: 24px;
      color: #FFF2A7;
      text-align: center;
    }
  }
}
</style>
