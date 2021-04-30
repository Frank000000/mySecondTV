<template>
  <FullScreenContainer :bgImg="require('@/assets/img/bg_xieyi_help.png')">
    <Top />
    <div>
      <!-- 左侧天数 -->
      <DaysLeft :list="daysList"/>
      <!-- echart -->
      <EchartContainer 
        :bgImg="require('@/assets/img/heart-rate/echart-bg.png')"

      >
        <HealthRateChart         
          :index="tapIndex"
          :chartData="chartData"
        />
      </EchartContainer>
      <!-- 按钮 -->
      <DetailButtonBox>
        <Button class="fs36" :width="360" is-font-scale @click.native="onJump('member')">更多历史数据</Button>
        <Button class="fs36" :width="360" is-font-scale @click.native="onBack">返 回</Button>
      </DetailButtonBox>
      <!-- 说明右侧 -->
      <IntroRight>
        <Card :bgImg="require('@/assets/img/heart-rate/card-bg.png')"
          :introText="'平均心率'"
        >
          <span class="card-intro-number">76</span><span class="card-intro-unit">次/分钟</span>
        </Card>
        <Card :bgImg="require('@/assets/img/heart-rate/card-bg.png')"
          :introText="'最高心率'"
        >
          <span class="card-intro-number">76</span><span class="card-intro-unit">次/分钟</span>
        </Card>
        <Card :bgImg="require('@/assets/img/heart-rate/card-bg.png')"
          :introText="'最低心率'"
        >
          <span class="card-intro-number">76</span><span class="card-intro-unit">次/分钟</span>
        </Card>
        <Card :bgImg="require('@/assets/img/heart-rate/card-bg.png')"
          :introText="'健康指数'"
        >
          <img 
            v-for="(item, idx) in starNum" 
            :key="idx"
            :src="require('@/assets/img/star.png')" 
            class="w-h40 mr7">
          <img 
            v-for="(item, idx) in darkStarNum" 
            :key="idx"
            :src="require('@/assets/img/star-dis.png')" 
            class="w-h40 mr7">
        </Card>
      </IntroRight>
    </div>
  </FullScreenContainer>
</template>

<script>
export default {
  name: 'HeartRate',
  data() {
    return {
      daysList: [{
        name: '1天',
        query: '7'
      },{
        name: '2天',
        query: '7'
      },{
        name: '3天',
        query: '7'
      },{
        name: '4天',
        query: '7'
      },{
        name: '5天',
        query: '7'
      },{
        name: '6天',
        query: '7'
      },{
        name: '7天',
        query: '7'
      }],
      tapIndex: 1,
      chartData: [], // 视图数据
      dayChart: [
        60,65,72,79,66,58,92,121,100,90
      ],
      starNum: 4
    }
  },
  computed: {
    darkStarNum() {
      return 5-this.starNum
    }
  },
  created() {
    let curTime = new Date().getTime();
    for(let i=9; i>0; i--) {
      this.chartData.push({
        heartRate: this.dayChart[i],
        measureTime: new Date(curTime-100000*i).pattern('yyyy-MM-dd HH:mm')
      })
    }
    this.$nextTick(() => {
      // this.$tv.scrollEl = this.$tv.getElementByPath('//div[@class="user-content-box"]')
      // this.$tv.setScrollEl(this.$tv.getElementByPath('//div[@class="user-content-box"]'));
    })
  },
  destroyed() {
   // To avoid affecting the global configuration, reset the page when destroying it
    this.$tv.resetScrollEl(); 
  },
  methods: {
    onBack(){
      this.$router.back(-1)
    },
    onJump() {

    }
  }
}
</script>

<style lang="scss" scoped>
.card-intro-number{
  font-size: 54px;
  line-height: 76px;
  color: rgba(240,240,240,0.80);
  letter-spacing: 0;
  font-weight: 500;
}
.card-intro-unit{
  margin-left: 4px;
  font-size: 24px;
  color: rgba(240,240,240,0.60);
  vertical-align: super;
}
.chart-container {
  margin: 0 auto;
  height: 290px;
}
</style>