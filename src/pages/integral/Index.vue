<template>
  <div class="integral-index" v-if="show">
    <div class="swiper">
      <van-swipe :autoplay="3000" :touchable="false">
        <van-swipe-item v-for="(image, index) in images" :key="index">
          <img :src="image.image" :height="height"  @click.stop="jump(image.link_url)"/>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="info" :style="{top:infoTop}">
      <div class="info-item">
        <!--<i class="iconfont icon-jifen2" style="color: #FFC600"></i>-->
        <img src="@img/jifen.png" style="width: 16px;margin-bottom: 3px;">
        可用积分 <span>{{integral_my}}</span>
      </div>
      <div class="info-item" v-go="{name:'integral_order_list'}">
        <i class="iconfont icon-jilu" style="color: #20A546"></i>
        兑换记录
      </div>
    </div>
    <div class="category">
      <van-swipe indicator-color="#20A546" :loop="false">
        <van-swipe-item v-for="i in category" style="margin-bottom: 20px" :key="i.id">
          <div class="category-item" v-for="item in i" >
            <img :src="item.cover_img" alt="" v-go="{name:'integral_list',query:{id:item.id}}">
            <div class="name line-1">{{item.name}}</div>
          </div>
        </van-swipe-item>
      </van-swipe>
    </div>
    <div class="list">
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        @load="getList"
      >
        <div class="good-item" v-for="item in list" v-go="{name:'integral_detail',query:{id:item.id}}" :key="item.id">
          <div class="image p-l">
            <img :src="item.cover_img" alt="">
          </div>
          <div class="good p-l">
            <div class="title line-2">
              {{item.name}}
            </div>
            <div class="num">
              已兑{{item.sales}}
            </div>
            <div class="price">
              {{item.money == "0.00"?item.integral+"积分":item.integral+"积分+￥"+item.money}}
              <!--{{item.integral}}积分+￥{{item.money}}-->
            </div>
          </div>
          <div class="clear"></div>
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
          show:false,
        images: [],
        infoTop:0,
        list: [],
        loading: false,
        finished: false,
        category:[],
        height:"",
        integral_my:"",
        page:{
          curPage:0,
          last_page:99,
        }
      };
    },
    computed:{
      ...mapState([
        'user'
      ])
    },
    mounted(){
      this.infoTop = window.screen.width - 30 + "px"
      this.height = window.screen.width + "px"
      this.getData()
      this.getList()
    },
    methods: {
        jump(url){
            window.location.href = url
        },
      getList(){
        if(this.page.last_page >  this.page.curPage){
          this.loading = true;
          this.page.curPage+=1
          this.$post("Integral/getIndexList",{page:this.page.curPage}).then((res)=>{
            // this.page.curPage = res.data.data_list.current_page
            this.page.last_page = res.data.data_list.last_page
            this.list = this.list.concat(res.data.data_list.data)
            if(this.page.last_page == this.page.curPage || this.page.last_page == 0){
              this.finished = true;
            }
            this.loading = false;
          })
        }
      },
      getData(){
        this.$post("Integral/getIndexData",{user_id:this.user.user_id}).then((res)=>{
          this.images = res.data.carousel
          this.category = res.data.category
          this.integral_my = res.data.integral_my
            this.show = true
        })
      },
    }
  }
</script>

<style  lang="stylus" >
  .integral-index{
    img{
      width 100%
    }
    padding-bottom 50px
    .info{
      font-size:14px;
      height:55px;
      background:rgba(255,255,255,1);
      box-shadow:0px 6px 14px 0px rgba(230,230,230,1);
      border-radius:4px;
      width 90%
      left 5%
      position absolute
      top 5px
      text-align center
      display flex
      display -webkit-box
      display -webkit-flex
      align-items center /*垂直居中*/
      justify-content center /*水平居中*/
      div{
        -webkit-box-flex 1
        -webkit-flex 1
        flex 1
        span{
          font-weight bold
          color: #20A546
        }
        &:last-child:after{
          content: " ";
          display: block;
          position: absolute;
          width: 1px;
          height 20px;
          background: #E6E6E6;
          text-align: center;
          top: 30%;
        }
      }
    }
    .category{
      font-size:13px;
      background #fff
      padding 50px 0 0px 0
      .category-item{
        margin-bottom 5px
        float left
        width 20%
        text-align center
        .name{
          line-height 15px
          height 15px
        }
        img{
          display block
          width 40px
          height 40px
          border-radius 50%
          margin 3px auto 7px
        }
      }
    }
    .good-item{
      .title{
        height 34px
      }
      .price{
        font-weight bold
      }
    }
    .list{
      background #fff
      margin-top 10px
      padding-left 15px
      .item{
        border-bottom:1px solid rgba(230,230,230,1);
        padding 15px 15px 15px 0
        .image{
          width 100px
          img{
            width 90px
            height 90px
            border:1px solid rgba(230,230,230,1);

          }
        }
        .good{
          width calc(100% - 100px)
          .title{
            color:#1A1A1A;
            font-size:13px;
            line-height 17px
          }
          .num{
            font-size:13px;
            color:rgba(128,128,128,1);
            margin 15px 0
          }
          .price{
            color:rgba(32,165,70,1);
            font-size 14px
          }
        }

      }
    }
  }


</style>
