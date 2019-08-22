// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import fastClick from 'fastclick'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Vant from 'vant'
import './mock/'
import '@styles/reset.css'
import '@styles/border.css'
import '@styles/iconfont.css'
import 'swiper/dist/css/swiper.css'
import 'vant/lib/index.css';
import go from './plugin/go'
import {get,post} from './http'
import store from './store'
import VueCookies from 'vue-cookies'
import { Waterfall, Collapse, CollapseItem,Toast,Dialog,Lazyload} from 'vant';
import wx from '@/wx'
import VueTap from 'vue2-tap'
import VideoPlayer from 'vue-video-player'

//手机端日志查看 环境正式把以下三行代码注释即可
// import Vconsole from 'vconsole'
// let vConsole = new Vconsole();


Vue.use(Vant);
Vue.use(Lazyload);
Vue.use(VueTap);

Vue.use(Collapse).use(CollapseItem);
Vue.use(Waterfall);
Vue.use(VueCookies);
// VueCookies.config("30d");
Vue.config.productionTip = false;
fastClick.attach(document.body);
Vue.use(VueAwesomeSwiper);
// Vue.use(Vant);
require('vue-video-player/src/custom-theme.css')
Vue.use(go);
Vue.use(VideoPlayer); //播放器插件
// require('video.js/dist/video-js.css')



Vue.prototype.$get = get;
Vue.prototype.$post = post;
Vue.prototype.$wx = wx;
let toast = function (msg){
  Toast({
    duration: 1000,       // 持续展示 toast
    forbidClick: true, // 禁用背景点击,
    message: msg
  });
}
Vue.prototype.$toast = toast;
Vue.prototype.$dialog = Dialog;

let vue = new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
})
/* eslint-disable no-new */
// export default vConsole
export default [vue]
