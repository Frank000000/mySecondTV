<template>
  <div class="page">
    <div class="home-card" v-if="dataObj" :class="{'fake' : true}" v-focusable @click="onJump">
      <div class="row center-y pt20 plr20">
        <img :src="dataObj.imgUrl" class="w-h84">
        <span class="name">{{dataObj.name}}</span>
        <img :src="require('@/assets/img/time.png')" class="w-h28 ml28">
        <span class="time">{{formatTime(dataObj.measureTime, 1)}}</span>
      </div>
      <div v-if="dataObj.name === '心率'" class=" text-center">
        <span class="number normal">{{dataObj.heartRate}}</span>
        <span class="unit">次/分</span>
      </div>
      <div v-if="dataObj.name === '血压'" class=" text-center">
        <span class="number normal">{{dataObj.systolic}}/{{dataObj.diastolic}}</span>
        <span class="unit">mmHg</span>
      </div>
      <div v-if="dataObj.name === '心电'">
        <div class="no-status">未获取AI分析报告</div>
      </div>
      <div v-if="dataObj.name === '步行'" class="walking">
        {{dataObj.stepCount}}
      </div>
      <div v-if="dataObj.name === '睡眠'" class="text-center">
        <span class="number normal">{{parseInt(dataObj.sleepDuration/60)}}</span>
        <span class="unit">小时</span>
        <span class="number normal">{{dataObj.sleepDuration%60}}</span>
        <span class="unit">分钟</span>
      </div>
      <div v-if="dataObj.judge" class="text-center">
        <span class="status">{{dataObj.judge}}</span>
      </div>
    </div>
    <img :src="require('@/assets/img/sample.png')" class="temple-img">
  </div>
</template>

<script>
import { formatTime } from '@/utils'
export default {
  name: 'HomeCard',
  props: {
    dataObj: {
      type: Object
    }
  },
  data() {
    return {

    }
  },
  methods: {
    onJump() {
      console.log(666);
    },
    formatTime
  }
}
</script>

<style scoped lang="scss">
.page{
  position: relative;
  .temple-img{
    position: absolute;
    width: 214px;
    top: 160px;
    left: -38px;
  }
}
.home-card{
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  display: inline-block;
  width: 505px;
  height: 300px;
  margin: 0 20px 40px;
  background: rgba(233,145,0,0.10);
  box-shadow: 0 0 30px 0 rgba(0,0,0,0.50);
  border-radius: 10px;
  border: 8px solid transparent;
  &.focus {
    transform: scale(1.2);
    border: 8px solid #E99100;
    box-shadow: 0 0 20px 0 rgba(254,192,91,0.50);
    border-radius: 12px;
  }
  &.fake{
    &.focus {
      transform: scale(1);
    }
  }
  .name{
    margin-left: 10px;
    font-size: 48px;
    color: rgba(240,240,240,0.80);
    font-weight: 600;
  }
  .time{
    margin-left: 10px;
    font-size: 28px;
    color: rgba(240,240,240,0.60);
  }
  .number{
    line-height: 118px;
    font-size: 84px;
    font-weight: 500;
    letter-spacing: 0;
    &.normal{
      color: #23C9B4;
    }
    &.abnormal{
      color: #E04462;
    }
  }
  .unit{
    margin-left: 10px;
    line-height: 40px;
    font-size: 28px;
    color: rgba(240,240,240,0.50);
  }
  .status{
    display: inline-block;
    padding: 0 40px;
    line-height: 44px;
    background: rgba(35, 199, 178, .65);
    border-radius: 22px;
    font-size: 28px;
    color: rgba(240,240,240,0.80);
  }
  .no-status{
    margin-top: 40px;
    text-align: center;
    line-height: 68px;
    font-size: 48px;
    color: rgba(240,240,240,0.80);
    letter-spacing: 0;
    font-weight: 500;
  }
  .walking{
    padding-top: 24px;
    line-height: 118px;
    text-align: center;
    font-size: 84px;
    color: #23C9B4;
    font-weight: 500;
  }
}
</style>