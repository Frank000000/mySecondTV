<template>
  <FullScreenContainer :bgImg="require('@/assets/img/member/bg.png')">
    <Top />
    <div class="member-nav row center-y space-between">
      <div class="row center-y">
        <img :src="require('@/assets/img/buxing.png')" class="w-h180 pl64" />
        <div class="member-name">特斯拉的家庭成员</div>
      </div>
      <div class="pr56">
        <Button class="member-back-btn" :width="360" @click.native="onBack">返 回</Button>
      </div>
    </div>
    <div class="member-choose-box row space-between">
      <div class="qr-code">
        <img :src="require('@/assets/img/member/qr-code.png')" class="w-h284" />
        <div class="qr-instructions">
          如需添加新成员，请用手机扫码，根据页面提示输入用户信息后提交
        </div>
      </div>
      <div class="member-choose" v-if="list && list.length > 0">
        <div class="row center-y">
          <div class="member-choose-title">切换成员</div>
          <div class="member-choose-intro">• 选择成员可查看该成员健康数据</div>
        </div>
        <div class="relative">
          <div class="btn-left">
            <img 
              :src="curIdx === 0 
              ? require('@/assets/img/member/left-disable.png') 
              : require('@/assets/img/member/left-able.png')"
            />
          </div>
          <div class="item-box">
            <div class="perspective">
              <div
                class="item"
                v-focusable
                v-for="(item, index) of list"
                :key="index"
                @onFocus="onFocusMember(index)"
                @click="onClickMember"
              >
                <img :src="item.url" />
                <div class="fs32 text-center l-h50 mt30" style="color: rgba(240,240,240,0.80);">{{item.title}}</div>
              </div>
            </div>
          </div>
          <div class="btn-right">
            <img 
              :src="curIdx === list.length-1 
              ? require('@/assets/img/member/right-disable.png') 
              : require('@/assets/img/member/right-able.png')"
            />
          </div>
        </div>
      </div>
      <div class="member-no" v-else>
        <div class="text-center">
          <img :src="require('@/assets/img/member/no-member.png')">
          <div class="fs30 mt20" style="color: rgba(240,240,240,0.60);">当前家庭无其他成员</div>
        </div>
      </div>
    </div>
    <!-- 切换成员弹窗 -->
    <Popup v-if="isShowLoading" ref="loading-popup">
      <div class="member-loading">
        切换成员中，请稍后……
      </div>
    </Popup>
    <!-- 失败弹窗 -->
    <Popup v-if="isShowError" ref="net-error">
      <div class="error-box">
        <div class="error-title">切换失败，请检查网络</div>
        <div class="error-content">您的网络通信可能不太流畅，请稍后重新尝试切换</div>
        <Button class="error-btn" :width="360" @click.native="onBack">知道了</Button>
      </div>
    </Popup>
    <!-- 未绑定弹窗 -->
    <BindPopup :is-show="isShowBind" :title="'该成员未绑定设备'" :btn-type="1" />
  </FullScreenContainer>
</template>

<script>
export default {
  name: 'Member',
  data() {
    return {
      list: [
        { url: require('@/assets/img/member/qr-code.png'), title: "灰姑娘1" },
        { url: require('@/assets/img/member/qr-code.png'), title: "灰姑娘2" },
        { url: require('@/assets/img/member/qr-code.png'), title: "灰姑娘3" },
        { url: require('@/assets/img/member/qr-code.png'), title: "灰姑娘4" },
        { url: require('@/assets/img/member/qr-code.png'), title: "灰姑娘5" },
        { url: require('@/assets/img/member/qr-code.png'), title: "灰姑娘6" },
      ],
      curIdx: 0, //当前选中成员下标
      isShowLoading: false, //显示切换loading
      isShowError: false, //切换失败
      isShowBind: false, //未绑定
    }
  },
  created() {
    this.$nextTick(() => {
      this.$tv.distanceToCenter = true;
      this.$tv.setScrollEl(document.querySelector(".item-box"));
      this.$tv.requestFocus(
        this.$tv.getElementByPath("//div[@class='perspective']/div[1]")
      );
      // this.$tv.requestFocus(this.$refs['member-box-child'])
      // this.$tv.limitingEl = this.$refs["container-left"]; // 只有need-know里面的focusable可以获取焦点
      // this.$tv.setScrollEl(this.$tv.getElementByPath('//div[@class="member-box"]'));
      // this.$tv.scrollEl = this.$tv.getElementByPath('//div[@class="member-box"]')
    })
  },
  methods: {
    onBack(){
      this.$router.back(-1)
    },
    onFocusMember(idx) {
      this.curIdx = idx
    },
    onClickMember() {
      this.isShowLoading = true
      this.$tv.limitingEl = this.$refs["loading-popup"]; // 只有loading-popup里面的focusable可以获取焦点
      // todo... 出去时取消限制
    }
  },
  destroyed() {
    this.$tv.resetScrollEl(); 
  },
}
</script>

<style lang="scss" scoped>
.member-nav{
  position: absolute;
  width: 100%;
  top: 182px;
  .member-name{
    margin-left: 40px;
    font-size: 48px;
    color: rgba(240,240,240,0.80);
    font-weight: 600;
  }
  .member-back-btn{
    font-size: 36px;
    background: rgba(240, 240, 240, 0.3);
  }
}
.member-choose-box{
  position: absolute;
  width: 100%;
  height: 520px;
  top: 408px;
  .qr-code{
    width: 348px;
    padding-top: 70px;
    margin-left: 64px;
    text-align: center;
    background: rgba(233,145,0,0.10);
    box-shadow: 0 0 30px 0 rgba(0,0,0,0.50);
    border-radius: 20px;
  }
  .qr-instructions{
    padding: 30px 50px 0;
    font-size: 24px;
    line-height: 32px;
    color: rgba(240,240,240,0.80);
    text-align: center;
  }
  .member-choose{
    width: 1278px;
    padding: 40px 60px 20px;
    margin-right: 70px;
    background: rgba(233,145,0,0.10);
    box-shadow: 0 0 30px 0 rgba(0,0,0,0.50);
    border-radius: 20px;
    .member-choose-title{
      line-height: 66px;
      font-size: 48px;
      color: rgba(240,240,240,0.80);
      text-align: center;
      font-weight: 600;
    }
    .member-choose-intro{
      font-size: 24px;
      color: rgba(240,240,240,0.60);
      text-align: center;
      font-weight: 400;
    }
    .item-box {
      width: 1100px;
      // height: 600px;
      margin: 0 auto;
      overflow: hidden;
      padding: 50px;
      transition: all 0.5s;
    }
    .perspective {
      display: flex;
      perspective: 2210px;
      width: 2210px;
    }
    .item {
      display: inline-block;
      transition: all 1s;
      position: relative;
      background: none;
      margin: 0 22px;
      img {
        width: 224px;
        height: 224px;
        border-radius: 20px;
        border: 8px solid transparent;
      }
      &.focus{
        img {
          transform: scale(1.2);
          border-radius: 24px;
          border: 8px solid #FEC05B;
        }
        >div{
          margin-top: 36px !important;
          transform: scale(1.2);
        }
      }
      .txt {
        text-align: center;
        display: inline-block;
        width: 100%;
        line-height: 46px;
        color: #fff;
      }
      &:last-child {
        margin-right: 100px;
      }
    }
    .btn-left{
      position: absolute;
      top: 106px;
      left: -42px;
      img{
        width: 108px;
        height: 124px;
      }
    }
    .btn-right{
      position: absolute;
      top: 106px;
      right: -42px;
      img{
        width: 108px;
        height: 124px;
      }
    }
  }
  .member-no{
    width: 1278px;
    padding: 0 60px 20px;
    margin-right: 70px;
    background: rgba(233,145,0,0.10);
    box-shadow: 0 0 30px 0 rgba(0,0,0,0.50);
    border-radius: 20px;
  }
}
.member-loading{
  padding: 66px 86px;
  line-height: 66px;
  background: #5E5A59;
  box-shadow: 0 60px 50px 0 rgba(0,0,0,0.50);
  border-radius: 10px;
  font-size: 48px;
  color: rgba(238,238,238,0.80);
  text-align: center;
}
.error-box{
  padding: 72px 48px 40px;
  text-align: center;
  background: #5E5A59;
  box-shadow: 0 60px 50px 0 rgba(0,0,0,0.50);
  border-radius: 10px;
  .error-title{
    line-height: 66px;
    font-size: 48px;
    color: rgba(238,238,238,0.80);
  }
  .error-content{
    width: 604px;
    margin-top: 16px;
    line-height: 44px;
    font-size: 32px;
    color: rgba(238,238,238,0.60);
  }
  .error-btn{
    margin-top: 55px;
    font-size: 32px;
    font-weight: 600;
  }
}
</style>