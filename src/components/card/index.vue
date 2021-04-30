<template>
  <div class="card row center-y" :style="{background: bgImg ? `url(${bgImg}) no-repeat` : ''}">
    <div class="card-intro">{{introText}}</div>
    <div class="card-line"></div>
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Card',
  props: {
    bgImg: {
      type: String
    },
    introText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style scoped lang="scss">
.card{
  width: 425px;
  height: 160px;
  margin-bottom: 40px;
  .card-intro{
    padding-left: 40px;
    width: 72px;
    line-height: 50px;
    font-size: 36px;
    color: rgba(240,240,240,0.60);
    font-weight: 600;
  }
  .card-line{
    width: 2px;
    height: 60px;
    margin: 0 20px;
    background: rgba(240,240,240,0.30);
  }
}
</style>