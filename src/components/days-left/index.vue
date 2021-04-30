<template>
  <div class="days-left-container">
    <div class="mb40 ml56" v-for="(item, idx) in resultList[page]" :key="idx" >
      <Button 
        :class="fontSize" 
        :width="280"
        is-font-scale
        v-focusable
        ref="daysBtn"
        >
        {{item.name}}
      </Button>
    </div>
    <img 
      v-if="list && list.length>5" 
      :src="require('@/assets/img/arrow-down.png')" 
      class="w-h48 ml56"
      v-focusable
      @click="onNextPage"
      >
  </div>
</template>

<script>
export default {
  name: 'DaysLeft',
  props: {
    list: {
      type: Array,
      default: []
    },
    fontSize: {
      type: String,
      default: 'fs32'
    }
  },
  data() {
    return {
      page: 0,
      resultList: []
    }
  },
  created() {
    let arr = []
    this.list.forEach((item,idx) => {
      if((idx !== 0 && idx%5 === 0)){
        this.resultList.push(arr)
        arr = []
      }
      if(idx===this.list.length-1){
        this.resultList.push(arr)
      }
      arr.push(item)
    })
    console.log(this.resultList);
  },
  methods: {
    onNextPage() {
      if(this.page === this.resultList.length-1) {
        return
      }
      this.page = this.page + 1 
      this.$nextTick(() => {
        this.$tv.requestFocus(this.$refs.daysBtn)
      })
    }
  },
}
</script>

<style scoped lang="scss">
.days-left-container{
  position: absolute;
  top: 200px;
  text-align: center;
  img.focus{
    transform: scale(1.2);
  }
}
</style>