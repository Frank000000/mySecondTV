<template>
  <!-- 未绑定弹窗 -->
  <Popup v-if="isShow">
    <div class="bind">
      <div class="row center-y">
        <div>
          <div class="bind-title">{{title}}</div>
          <div class="bind-tip">
            <div>① 扫码下载手机端APP；</div>
            <div>② 进入家庭健康小程序；</div>
            <div>③ 绑定健康设备。</div>
          </div>
        </div>
        <img :src="require('@/assets/img/home/scan.png')" class="bind-scan-img">
      </div>
      <div class="mt60 text-center" v-if="btnType == 0">
        <Button class="fs32" :width="300" ref="agreeButton">添加/切换成员</Button>
        <Button class="fs32" :width="300">查看示例</Button>
      </div>
      <div class="mt60 text-center" v-if="btnType == 1">
        <Button class="fs32" :width="480">返 回</Button>
      </div>
    </div>
  </Popup>
</template>

<script>
export default {
  name: 'BindPopup',
  props: {
    title: {
      type: String,
      default: '您未绑定设备'
    },
    isShow: {
      type: Boolean,
      default: false
    },
    btnType: {
      type: Number,
      default: 0
    },
  },
  data() {
    return {
      
    }
  }
}
</script>

<style lang="scss" scoped>
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