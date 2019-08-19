<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <!-- 显示的是当前路由地址所对应的内容 -->
      <router-view v-if="$route.meta.keepAlive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"/>
    <!--#20A546-->
    <van-tabbar v-model="active" active-color="#20A546">
      <van-tabbar-item to="/home">
        <span>元素</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="$route.path === '/home' ? icon.homeActive : icon.homeNormal"
        >
      </van-tabbar-item>
      <van-tabbar-item to="/home">
        <span>话题</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="$route.path === '/home' ? icon.pointActive : icon.pointNormal"
        >
      </van-tabbar-item>
      <van-tabbar-item to="/home">
        <span>排行</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="$route.path === '/home' ? icon.onlineActive : icon.onlineNormal"
        >
      </van-tabbar-item>
      <van-tabbar-item to="/home">
        <span>我的</span>
        <img
          slot="icon"
          slot-scope="props"
          :src="$route.path === '/home' ? icon.mineActive : icon.mineNormal"
        >
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: 'App',
    data() {
      return {
        icon:{
          homeNormal: require('@img/icon/home.png'),
          homeActive: require('@img/icon/home-active.png'),
          pointNormal: require('@img/icon/topic.png'),
          pointActive: require('@img/icon/topic-active.png'),
          onlineNormal: require('@img/icon/level.png'),
          onlineActive: require('@img/icon/level-active.png'),
          mineNormal: require('@img/icon/mine.png'),
          mineActive: require('@img/icon/mine-active.png'),
        }

      }
    },
      created(){
          // this.$wx.setConfig();
      },
    computed:{
      ...mapState([
        'user'
      ]),
        active(){
          let active = 0
              switch (this.$route.path) {
                case '/home':
                  active = 0
                  break;
                case '/home':
                  active = 1
                  break;
                case '/home':
                  active = 2
                  break;
                case '/home':
                  active = 3
                  break;

              }
          return active
        }
    },
    mounted(){
      console.log(this.$route);
      // this.getConfig();

      // setTimeout(()=>{
      //   switch (this.$route.path) {
      //     case '/home':
      //       this.active = 0
      //       break;
      //     case '/integral/home':
      //       this.active = 1
      //       break;
      //     case '/offline_list':
      //       this.active = 2
      //       break;
      //     case '/mine':
      //       this.active = 3
      //       break;
      //   }
      // })

      // console.log(this.active);
    },
    methods:{
      //获取一些基本参数
      getConfig(){
        this.$post('Home/getConfig').then(res=>{
          // console.log(res);
          this.$store.commit('config/setConfig',res)
        })
      },
    }
  }
</script>

<style lang="stylus">
  @import "~@styles/custom.styl"
  .van-tabbar {
	  opacity 1
  }
  .van-tabbar-item__icon img{
      height 24px
  }
  /*
    本地图片调用
    background url("~@img/main/back.png") 0 0 no-repeat

    css变量引用
    background $main_white
   */

</style>
