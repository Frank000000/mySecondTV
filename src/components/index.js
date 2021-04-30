/*
 * 描述: 封装组件库
 */
import FullScreenContainer from './full-screen-container' //全屏盒子
import Top from './top' // 界面顶部状态
import HomeCard from './home-card' // 首页卡片
import Button from './button' // 按钮
import Popup from './popup' //弹出层
import BindPopup from './bind-popup' //未绑定弹出层
import DaysLeft from './days-left' //天数左侧
import EchartContainer from './echart-container' //echart盒子
import IntroRight from './intro-right' //说明右侧盒子
import Card from './card' //卡片
import DetailButtonBox from './detail-button-box' //详情按钮盒子
import HealthRateChart from './health-rate-chart' //详情按钮盒子

const components = {
  FullScreenContainer,
  Top,
  HomeCard,
  Button,
  Popup,
  BindPopup,
  DaysLeft,
  EchartContainer,
  IntroRight,
  Card,
  DetailButtonBox,
  HealthRateChart
};

const install = (Vue = {}) => {
  if (install.installed) return;
  Object.keys(components).forEach(component => {
    Vue.component(components[component].name, components[component]);
  });

  install.installed = true;
};

install.installed = false;

if (typeof window !== "undefined" && window.Vue) {
  install(window.Vue);
  install.installed = true;
}

const Vcomp = {
  ...components,
  install
};


export default Vcomp
