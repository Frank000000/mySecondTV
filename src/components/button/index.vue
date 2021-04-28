<template>
  <div class="button" v-focusable :style="{width: width + 'px'}">
    <span :style="{transform: isFontScale ? 'scale(1.2)' : ''}"><slot></slot></span>
  </div>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 300
    },
    isFontScale: {
      type: Boolean,
      default: false
    }
  },
  name: 'Button'
}
</script>

<style scoped lang="scss">
.button{
  display: inline-block;
  box-sizing: border-box;
  height: 88px;
  line-height: 76px;
  margin: 0 14px;
  border: 6px solid transparent;
  background: rgba(240, 240, 240, .2);
  box-shadow: 0 0 17px 0 transparent;
  border-radius: 44px;
  font-size: 36px;
  color: rgba(240,240,240,0.80);
  text-align: center;
  &.focus {
    line-height: 76px;
    background: #E99100;
    border: 6px solid #FEC05B;
    box-shadow: 0 0 17px 0 rgba(254,192,91,0.50);
    border-radius: 44px;
    color: #F0F0F0;
    font-weight: 600;
    span{
      display: inline-block;
    }
  }
}
</style>