<template>
  <div class="lower" v-if="show">
    <div class="s-search">
      <van-search
        v-model="value"
        placeholder="搜索昵称关键词"
        @search="onSearch"
        @cancel="onCancel"
      />
    </div>
    <div class="top">
      <div class="header">
        <div class="image p-l">
          <img :src="userData.headimgurl" alt="">
        </div>
        <div class="point p-l">
          <div class="text">{{userData.nickname}}</div>
        </div>
        <div class="clear"></div>
        <div class="invite">
          <div class="invite-item">
            <span style="font-weight:bold;font-size: 20px">{{data.today_number}}</span>
            <span>今日邀请</span>
          </div>
          <div class="invite-item">
            <span style="font-weight:bold;font-size: 20px">{{data.history_number}}</span>
            <span>历史邀请</span>
          </div>
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
          <div class="cell" v-for="item in list">
            <div class="image p-l" >
              <img :src="item.headimgurl"  width="40"  height="40">
            </div>
            <div class="title">
              <span>{{item.nickname}}</span>
              <span class="time">{{item.subscribe_time}}</span>
            </div>
            <div class="right">
              {{item.take_commission}}
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
        value:"",
        curTab: 0,
        list: [],
        tabs: ["下一级", "下二级", "下三级"],
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
        data:{},
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
      onSearch(){

      },
      onCancel(){

      },
      getData(){
        this.$post("Vip/getUserInfo",{openid:this.user.openid}).then(res=>{
          this.userData = res.data
          console.log(this.userData);
          this.show = true
        })
        this.$post("Distribution/getMySubordinatesData",{user_id:this.user.user_id}).then(res=>{
          this.data = res.data
        })
      },
      getList(){
        if(this.page.last_page >  this.page.curPage){
          this.page.curPage+=1
          this.loading = true;
          this.$post("Distribution/getMySubordinatesList",{page:this.page.curPage,user_id:this.user.user_id,index:this.curTab}).then((res)=>{
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

<style lang="stylus">
  .lower{
    .tab{
      font-weight bold
    }
    .s-search{
      padding-top 0
    }
    .van-search{
      padding-top 10px
      background #20A546 !important
      .van-field{
        background rgba(239,239,239,.3);

        input{
          color #fff
        }
      }
      .van-icon-search{
        color #fff
      }
    }
    ::-webkit-input-placeholder { /* WebKit browsers */
      color:    #fff;
    }
    :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
      color:    #fff;
    }
    ::-moz-placeholder { /* Mozilla Firefox 19+ */
      color:    #fff;
    }
    :-ms-input-placeholder { /* Internet Explorer 10+ */
      color:    #fff  ;
    }
    .top {
      /*position fixed*/
      /*top 44px*/
      /*z-index 5*/
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
          width 200px
          padding 10px 0px 0 20px
          color #fff
          .text {
            font-size 16px
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
        .invite{
          .invite-item{
            width 50%
            float left
            text-align center
            color #fff
            span{
              font-size 13px

              margin-bottom 5px
              display block
              &:last-child{

                font-size 13px
              }
            }

          }
        }
      }
    }

    .list {
      overflow-y auto
      .cell {
        .image{
          margin-right 15px
          img{
            border-radius 50%
          }
        }
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
