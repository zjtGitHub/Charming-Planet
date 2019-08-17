<template>
  <div class="logistics" v-if="show">
    <div class="header">
      <div class="title">
        承运来源：{{data.express_name}}
      </div>
      <div class="title">
        运单编号：{{data.order_number}}
      </div>
      <div class="status">
        {{data.state}}
      </div>
    </div>
    <div class="list" v-if="data.traces.length > 0">
      <div class="item" v-for="(item,index) in data.traces" v-if="index != 0">
        <div class="left">
          <img src="@img/default.png" alt="" width="9">
          <span class="line"></span>
        </div>
        <div class="text">
          {{item.AcceptStation}}
        </div>
        <div class="time">
          {{item.AcceptTime}}
        </div>
      </div>
      <div class="item active" v-for="(item,index) in data.traces" v-if="index == 0">
        <div class="left">
          <img src="@img/active.png" alt="" width="20" style="">
          <span class="line"></span>
        </div>
        <div class="text">
          {{item.AcceptStation}}
        </div>
        <div class="time">
          {{item.AcceptTime}}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "Logistics",
    data(){
      return{
        id:"",
        show:false
      }
    },
    computed:{
      ...mapState([
        'user'
      ])
    },
    created(){
      this.id = this.$route.query.id
      this.getData()
    },
    methods:{
      getData(){
        this.$post("Integral/getExpressData",{user_id:this.user.user_id,order_id:this.id}).then(res=>{
          this.data = res.data
          this.show = true
        })
      }
    }
  }
</script>

<style lang="stylus">
  .logistics {
    padding 10px
    .header {
      border-radius 5px
      padding 15px 20px 5px
      background #fff
      position relative
      .title {
        font-size 12px
        font-weight bold
        margin-bottom 10px
      }
      .status {
        position absolute
        right 20px
        top: 20px
        z-index 2
        color #F93A42
      }
    }
    .list {
      min-height 50px
      border-radius 5px
      padding 15px
      margin-top 10px
      background #fff
      .item {
        position relative
        height 100px
        .text {
          padding-left 20px
          line-height 20px
          font-size 14px
          color #989898
        }
        .time {
          padding-left 20px
          line-height 20px
          font-size 14px
          color #989898
        }
        .left {
          position absolute
          height 100%
          img {
            position relative
            z-index 3
          }
          .line {
            position absolute
            left 4px
            top 10px
            height 100%
            width 1px
            background #CBCBCB
            display block
            z-index 2
          }
        }
        &.active {
          img {
            position: absolute;
            left: -5px
          }
          .text,.time{
            color #1A1A1A
          }

        }
        &:last-child {

  .line{
    width 0
  }
        }
      }
    }
  }
</style>
