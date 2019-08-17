<template>
  <div class="mine" v-if="show">
    <div class="header">
      <div class="header-content">
        <div class="img p-l">
          <img :src="userData.headimgurl">
        </div>
        <div class="content p-l">
          <div class="name line-1">
            {{userData.nickname}}
          </div>
          <div class="vip not" v-if="userData.is_vip == 1" v-go="{name:'vip_buy'}">
          开通vip会员
          </div>
          <div class="vip" v-if="userData.is_vip == 2" v-go="{name:'vip_buy'}">
            vip到期时间：{{userData.vip_end_time}} 续费
          </div>
        </div>
      </div>
    </div>
    <div class="cells">
      <div class="cell" v-go="{name:'record'}">
        <div class="title">
          <i class="iconfont icon-yuedujilu" style="color: #20A546"></i> 观看记录
        </div>
        <div class="right">
          <i class="iconfont icon-you"></i>
        </div>
      </div>
      <div class="cell" v-if="userData.is_vip == 2" v-go="{name:'invite'}">
        <div class="title">
          <i class="iconfont icon-Group-" style="color: #FF6E00"></i> 我的推荐码
        </div>
        <div class="right">
          <i class="iconfont icon-you"></i>
        </div>
      </div>
      <div class="cell" v-if="userData.is_vip == 2" v-go="{name:'lower'}" >
        <div class="title">
          <i class="iconfont icon-yaoqinghuida" style="color: #FD638B"></i> 我的邀请
        </div>
        <div class="right">
          <i class="iconfont icon-you"></i>
        </div>
      </div>
      <div class="cell" v-go="{name:'my_integral_detail'}">
        <div class="title">
          <i class="iconfont icon-jifen" style="color: #8E94FF"></i> 我的积分
        </div>
        <div class="right">
          <i class="iconfont icon-you"></i>
        </div>
      </div>
      <div class="cell" v-go="{name:'vip_interest'}">
        <div class="title">
          <i class="iconfont icon-huiyuan-" style="color:#FCCC00"></i> 会员权益
        </div>
        <div class="right">
          <i class="iconfont icon-you"></i>
        </div>
      </div>
      <div class="cell" v-go="{name:'about'}">
        <div class="title">
          <i class="iconfont icon-guanyuyouxinwuliu" style="color: #70AFFF;font-size: 20px"></i> 关于我们
        </div>
        <div class="right">
          <i class="iconfont icon-you"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        pop:false,
        show: false,
        height: "",
      }
    },
    computed:{
      ...mapState([
        'user'
      ])
    },
    created() {
      this.getUser()
    },
    methods:{
      getUser(){
        this.$post("Vip/getUserInfo",{openid:this.user.openid}).then(res=>{
          this.userData = res.data
          this.show = true
        })
      },
      getData(){
        this.$post("Book/getBookDetail",{id:this.id}).then(res=>{
          this.data = res.data

        })
      }
    }
  }
</script>

<style lang="stylus">
  .mine {
    padding-bottom 50px
    .header {
      width 100%;
      height 150px
      background url("~@img/mine.png") 0 0 no-repeat
      background-size 100% 150px
      box-sizing border-box
      padding 50px 25px
      .img {
        width 60px
        height 60px
        img {
          width 100%
          height 100%
          border-radius 50%
        }
      }
      .content {
        padding 10px
        .name {
          font-size 18px
          color #000000
          font-weight bold
          width 200px
          height 21px
          line-height 21px
        }
        .vip {
          display inline-block
          margin-top 8px
          font-size 13px
          padding 2px 10px
          border-radius 50px
          background #FCCC00
          color #1A1A1A
          font-weight bold
          &.not {
            background #CBCBCB
            color #fff
          }
        }

      }
    }
    .cells {
      margin-top 10px
      .cell{
        padding 18px 0
      }
      .title {
        font-size 17px
        .iconfont {
          font-size 18px
          margin-right 5px
        }
      }
    }
  }
</style>
