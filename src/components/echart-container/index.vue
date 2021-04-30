<template>
  <div class="echart-container" :style="{background: bgImg ? `url(${bgImg}) no-repeat` : ''}">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'EchartContainer',
  props: {
    bgImg: {
      type: String
    },
  },
}
</script>

<style lang="scss" scoped>
.echart-container{
  position: absolute;
  top: 200px;
  left: 390px;
  width: 880px;
  height: 564px;
  padding: 40px 60px 20px 54px;
}
</style>