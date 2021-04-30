<template>
  <div class="intro-container">
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: 'IntroRight'

}
</script>

<style scoped lang="scss">
.intro-container{
  position: absolute;
  top: 200px;
  right: 70px;
}
</style>