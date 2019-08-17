<template>
  <div class="integral-detail" v-if="show">
    <div class="top">
      <div class="header">
        <div class="image p-l">
          <img :src="userData.head_img_url" alt="">
        </div>
        <div class="point p-l">
          <div class="text">累计积分</div>
          <div class="num">{{userData.total_integral}}</div>
        </div>
        <div class="point p-l">
          <div class="text">当前积分</div>
          <div class="num">{{userData.integral}}</div>
        </div>
        <div class="clear"></div>
        <div class="go" v-go="{name:'integral_home'}">
          <span>前往积分商城</span>
          <i class="iconfont icon-you"></i>
        </div>
      </div>
      <div class="my-tabs">
        <div v-for="(item,index) in tabs" class="tab" :class="curTab==index?'active':''" @click="changeTab(index)">
          {{item}}
        </div>
      </div>
    </div>
  <div class="list" :style="{height:height}">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="getList"
      :offset="100"
    >
      <div class="cells">
        <div class="cell" v-for="item in list" :key="item.id">
          <div class="title">
            <span>{{item.show_text}}</span>
            <span class="time">{{item.create_time}}</span>

          </div>
          <div class="right">
            {{item.integral}}
          </div>
        </div>
      </div>
    </van-list>
  </div>

  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        curTab: 0,
        list: [],
        tabs: ["全部", "收入", "支出"],
        loading: false,
        finished: false,
        id:0,
        page:{
          curPage:0,
          last_page:99,
        },
        userData:{},
        show:false,
        height:"",
      };
    },
    computed:{
      ...mapState([
        'user'
      ])
    },
    created(){
      this.getData()
      this.getList()
    },
    mounted(){
      // this.height = window.screen.height - 177 + "px"
    },
    methods: {
      getData(){
        this.$post("Integral/getIntegralDetailData",{user_id:this.user.user_id}).then(res=>{
          this.userData = res.data
          this.show = true
        })
      },
      getList(){
        if(this.page.last_page >  this.page.curPage){
          this.page.curPage+=1
          this.loading = true;
          this.$post("Integral/getIntegralDetailList",{page:this.page.curPage,user_id:this.user.user_id,index:this.curTab}).then((res)=>{
            this.page.last_page = res.data.data_list.last_page
            this.list = this.list.concat(res.data.data_list.data)
            if(this.page.last_page == this.page.curPage || this.page.last_page == 0){
              this.finished = true;
            }
            this.loading = false;
          })
        }
      },
      changeTab(index){

        this.curTab = index
        this.page.curPage = 0
        this.page.last_page = 99
        this.finished = false
        this.list = []
        this.getList()
      },
      onLoad() {
        // 异步更新数据
        // setTimeout(() => {
        //   for (let i = 0; i < 10; i++) {
        //     this.list.push(this.list.length + 1);
        //   }
        //   // 加载状态结束
        //   this.loading = false;
        //
        //   // 数据全部加载完成
        //   if (this.list.length >= 40) {
        //     this.finished = true;
        //   }
        // }, 500);
      }
    }
  }
</script>

<style scoped lang="stylus">
  .integral-detail{
    .top {
      position fixed
      top 0
      z-index 5
      width 100%
      .header {
        background: #20A546;
        height: 125px;
        box-sizing: border-box;
        width: 100%;
        padding: 15px
        .image {
          img {
            width: 60px;
            height: 60px;
            border-radius: 50%;
          }
        }
        .point {
          text-align left
          width 90px
          padding 10px 0px 0 20px
          color #fff
          .text {
            font-size 12px
          }
          .num {
            font-size 17px
            margin-top 10px
          }
        }
        .go {
          background #fff
          width 95px
          height 25px
          line-height 25px
          font-size 12px
          position relative
          padding-left 8px
          border-radius: 2px;
          margin-left 80px
          margin-top 5px
          i {
            position absolute
            right 5px
          }
        }
      }
    }
    .list {
      padding-top 177px
      overflow-y auto
      .cell {
        .title {
          span {
            display block

          }
          .time {
            font-size 12px
            color #999999

          }
        }
      }
    }

  }

</style>
