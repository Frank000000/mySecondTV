<template>
  <div class="top row space-between">
    <div class="row center-y ml66">
      <img :src="require('@/assets/img/buxing.png')" class="w-h50">
      <span class="ml24 title">家庭健康</span>
    </div>
    <div class="row center-y mr66">
      <img :src="require('@/assets/img/buxing.png')" class="w-h50">
      <span class="ml20 fs36 name">姓名</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Top',
  data() {
    return {}
  }
}
</script>

<style scoped lang="scss">
.top{
  position: absolute;
  width: 100%;
  top: 48px;
  left: 0;
  .title{
    position: relative;
    display: inline-flex;
    height: 40px;
    line-height: 40px;
    font-size: 40px;
    background-image: linear-gradient(130deg, #46DDD5 0%, #00DD99 100%);
    -webkit-background-clip:text;
    -webkit-text-fill-color:transparent;
  }
  .name{
    color: rgba(240,240,240,0.80);
  }
}
</style>