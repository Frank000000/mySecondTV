<template>
  <div class="popup">
    <div class="pos-center">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Popup'
}
</script>

<style scoped lang="scss">
.popup{
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  background: rgba(0, 0, 0, .6);
}
</style>