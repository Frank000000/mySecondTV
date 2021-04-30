<template>
  <FullScreenContainer :bgImg="require('@/assets/img/home/bg@1x.png')">
    <Top />
    <div class="home-card-box">
      <div style="display: inline-block;" v-for="(item, idx) in listObj" :key="idx" @click="onJump(item.type)">
        <HomeCard :data-obj="item" />
      </div>
    </div>
    <div class="home-button-box">>
      <Button class="fs36" :width="360" is-font-scale  @click.native="onJump('member')">添加/切换成员</Button>
      <Button class="fs36" :width="360" is-font-scale>使用帮助</Button>
    </div>
    <!-- 用户需知弹窗 -->
    <Popup v-if="isShowKnowPopup">
      <div class="need-know" ref="need-know">
        <div class="need-know-title">用户需知</div>
        <div class="need-know-text mt16">
          您即将使用的翼家健康服务是由中国电信天翼云盘根据您在手机端（云端app小程序、H5）绑定的健康设备所产生的数据。
        </div>
        <div class="need-know-text">
          请您阅读<span v-focusable ref="agreement">【用户协议】</span>，并点击同意后进入使用。
        </div>
        <div class="mt60 text-center">
          <Button class="fs32" :width="300" ref="agreeButton">同意</Button>
          <Button class="fs32" :width="300">查看示例</Button>
        </div>
      </div>
    </Popup>
    <!-- 未绑定弹窗 -->
    <Popup v-if="isShowBindPopup">
      <div class="bind">
        <div class="row center-y">
          <div>
            <div class="bind-title">您未绑定设备</div>
            <div class="bind-tip">
              <div>① 扫码下载手机端APP；</div>
              <div>② 进入家庭健康小程序；</div>
              <div>③ 绑定健康设备。</div>
            </div>
          </div>
          <img :src="require('@/assets/img/home/scan.png')" class="bind-scan-img">
        </div>
        <div class="mt60 text-center">
          <Button class="fs32" :width="300" ref="agreeButton">添加/切换成员</Button>
          <Button class="fs32" :width="300">查看示例</Button>
        </div>
      </div>
    </Popup>
  </FullScreenContainer>
</template>

<script>
export default {
  name: 'Home',
  components: {},
  data() {
  	return {
  		listObj: {
        heartRate: {
          type: 'heart-rate',
          name: "心率",
          imgUrl: require('@/assets/img/home/heart-rate.png'),
          heartRate: 77,
          measureTime: "2020-08-24 12:02",
          judge: "目前心率正常", // 诊断结果
        },
        bloodPressure: {
          name: "血压",
          imgUrl: require('@/assets/img/home/blood-pressure.png'),
          unit: "mmHg",
          systolic: 124, //收缩压（高压）
          diastolic: 95, //舒张压（低压）
          measureTime: "2021-04-14 18:06",
          judge: "单纯舒张期高血压", // 诊断结果
          suggest: "血压处于单纯舒张期高血压范围，即舒张压增高。建议加强监测，及时就诊治疗，预防和控制高血压病发生和发展。"
        },
        ecg: {
          name: "心电",
          imgUrl: require('@/assets/img/home/ecg.png'),
          fileId: 112853, //文件ID
          aiDiagnosis: "窦性心律,室上性早搏成对", //ai分析结果
          aiSuggestion: "窦性心律\\n正常节律。##室上性早搏成对\\n建议监测血压，检查标准心电图；如有不适，请随时就医。##",
          measureTime: "2021-04-15 16:13"
        },
        walking: {
          name: "步行",
          imgUrl: require('@/assets/img/home/walking.png'),
          stepCount: 123,
          measureTime: "2021-04-13 00:00"
        },
        sleep: {
          name: "睡眠",
          imgUrl: require('@/assets/img/home/sleep.png'),
          measureTime: "2021-04-15 01:17",
          sleepQuality: 2, //睡眠质量
          sleepDuration: 499 //睡眠时长
        },
      },
      isShowKnowPopup: false, //用户须知弹窗
      isShowBindPopup: false, //用户绑定弹窗
  	}
  },
  computed: {
  },
  created() {
    this.$nextTick(() => {
      if(this.isShowKnowPopup){
        // this.open()
        this.$tv.requestFocus(this.$refs.agreement)
      }
    })
  },
  mounted() {
  },
  methods: {
    open() {
      // this.show = !this.show;
      // this.$tv.limitingEl = document.querySelector(".need-know"); // 只有.demo5里面的focusable可以获取焦点
      this.$tv.limitingEl = this.$refs["need-know"]; // 只有need-know里面的focusable可以获取焦点
      // this.$tv.scrollEl = this.$tv.getElementByPath(
      //   '//div[@class="demo demo5"]'
      // );
      // this.$tv.requestFocus(
      //   this.$tv.getElementByPath('//div[@class="demo demo5"]/span[3]')
      // );
    },
    close() {
    //   this.show = !this.show;
    //   this.$tv.scrollEl = this.$tv.getElementByPath('//div[@class="demo"]');
    //   if(this.focusEl){this.$tv.requestFocus(this.focusEl)}
      this.$tv.limitingEl = null;
    },
    onJump(type) {
      let obj = {
        'heart-rate': '/heart-rate',
        'member': '/member'
      }

      this.$router.push({
        path: obj[type]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.home-card-box{
  position: absolute;
  width: calc(100% - 284px);
  top: 182px;
  left: 142px;
}
.home-button-box{
  position: absolute;
  width: calc(100% - 296px);
  bottom: 90px;
  right: 148px;
  text-align: right;
}
.need-know{
  width: 1200px;
  padding: 72px 60px 60px;
  background: #5E5A59;
  box-shadow: 0 60px 50px 0 rgba(0,0,0,0.50);
  border-radius: 10px;
  .need-know-title{
    line-height: 68px;
    font-size: 48px;
    color: rgba(238, 238, 238, 0.8);
    text-align: center;
  }
  .need-know-text{
    line-height: 44px;
    font-size: 32px;
    color: rgba(238, 238, 238, 0.6);
    span{
      color: rgba(223, 146, 19, 0.6);
    }
    .focus{
      color: #000;
    }
  }
}
.bind{
  width: 1200px;
  box-sizing: border-box;
  padding: 72px 72px 40px;
  background: #5E5A59;
  box-shadow: 0 60px 50px 0 rgba(0,0,0,0.50);
  border-radius: 10px;
  .bind-title{
    margin-bottom: 16px;
    line-height: 68px;
    font-size: 48px;
    color: rgba(238,238,238,0.80);
    text-align: center;
    font-weight: 600;
  }
  .bind-tip{
    line-height: 44px;
    font-size: 32px;
    color: rgba(238,238,238,0.60);
  }
  .bind-scan-img{
    width: 517px;
    height: 415px;
    margin-left: 40px;
  }
}
</style>
