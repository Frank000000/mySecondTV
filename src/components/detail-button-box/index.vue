<template>
  <div class="detail-button-box"><slot></slot></div>
</template>

<script>
export default {
  name: 'DetailButtonBox'
}
</script>

<style lang="scss" scoped>
.detail-button-box{
  position: absolute;
  bottom: 120px;
  right: 520px;
}
</style>