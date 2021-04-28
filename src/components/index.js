/*
 * 描述: 封装组件库
 */
import FullScreenContainer from './full-screen-container' //全屏盒子
import Top from './top' // 界面顶部状态
import HomeCard from './home-card' // 首页卡片
import HomeCardNofocus from './home-card-nofocus' // 首页卡片(不聚焦)
import Button from './button' // 按钮
import ButtonNofocus from './button-nofocus' // 按钮(不聚焦)
import Popup from './popup' //弹出层

const components = {
  FullScreenContainer,
  Top,
  HomeCard,
  HomeCardNofocus,
  Button,
  ButtonNofocus,
  Popup
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
