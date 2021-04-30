<template>
  <div class="container">
    <div class="wrap" ref="wrap" :style="{background: bgImg ? `url(${bgImg}) no-repeat` : ''}">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { screenSize } from '@/utils'

export default {
  name: 'FullScreenContainer',
  props: ['bgImg'],
  data() {
    return {}
  },
  mounted() {
    screenSize(this.$refs.wrap);
  },
}
</script>

<style lang="scss" scoped>
.container {
	position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  .wrap {
    transform-origin: 0px 0px 0px;
    background-size: contain;
    background-position: 50% 0;
    // background-color: rgb(0, 0, 0);
    min-width: auto;
    width: 1920px;
    min-height: auto;
    height: 1080px;
    overflow: auto;
  }
}	
</style>