<template>
  <div class="order-list">
    <van-tabs v-model="active" color="#20A546" class="tabs" @change="changeTab">
      <van-tab v-for="item in tabs" :title="item" :key="item.id"></van-tab>

    </van-tabs>
    <van-list
      class="list"
      v-model="loading"
      :finished="finished"
      @load="getList"
      finished-text="没有更多了"
    >
      <div class="card cells" v-for="item in list" v-go="{name:'integral_order_detail',query:{id:item.id}}" :key="item.id">
        <div class="cell">
          <div class="title">
            交易单号：{{item.order_number}}
          </div>
          <div class="right">
            <span class="green">{{item.status_name}}</span>
          </div>
        </div>
        <div class="good-item" v-for="good in item.order_product">
          <div class="image p-l">
            <img :src="good.product_cover_img" alt="">
          </div>
          <div class="good p-l">
            <div class="title line-2">
              {{good.product_name}}
            </div>
            <div class="num">
              x{{good.number}}
            </div>
            <div class="price">
              {{good.product_integral != 0 && good.product_money != "0.00"?good.product_integral+"积分+￥"+good.product_money :"" }}
              {{good.product_integral == 0?"￥"+good.product_money :"" }}
              {{good.product_money == 0?good.product_integral+"积分" :"" }}
            </div>
          </div>
          <div class="clear"></div>
        </div>
        <div class="cell nob">
          <div class="right">
            合计：<span class="green">{{item.pay_integral != 0 && item.pay_money != 0?item.pay_integral+"积分+￥"+item.pay_money :"" }}
        {{item.pay_integral == 0?"￥"+item.pay_money :"" }}
        {{item.pay_money == 0?item.pay_integral+"积分" :"" }}</span>
          </div>
        </div>
        <div class="opear">
          <span class="btn"  v-if="item.status == 1" @click.stop="cancel(item.id)">取消订单</span>

          <span class="btn pay" v-if="item.status == 1" @click.stop="pay(item.id)">支付</span>
          <span class="btn pay" v-if="item.status == 2" @click.stop="remind(item.id)">提醒发货</span>
          <span class="btn"  v-if="item.status == 3" @click.stop="express(item.id)">查看物流</span>
          <span class="btn pay" v-if="item.status == 3" @click.stop="confirm(item.id)">确认收货</span>
          <span class="btn pay"  v-if="item.status == 4" @click.stop="del(item.id)">删除订单</span>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        tabs:["全部","待支付","待发货","待收货","已完成"],
        active:0,
        list: [],
        loading: false,
        finished: false,
        page:{
          curPage:1,
          last_page:99,
        }
      };
    },
    computed:{
      ...mapState([
        'user'
      ])
    },
    created(){
      this.getList()
    },
      mounted(){
         this.$wx.setConfig();
      },
    methods: {
      changeTab(){
        this.page.curPage = 1
        this.page.last_page = 99
        this.list = []
        this.getList()
      },
      getList(){
        if(this.page.last_page >  this.page.curPage) {
          this.loading = true;
            this.finished = false;
          this.$post("Integral/getMyOrderList", {
            user_id: this.user.user_id,
            page: this.page.curPage,
            index: this.active
          }).then(res => {
            this.page.curPage = res.data.data_list.current_page
            this.page.last_page = res.data.data_list.last_page
            this.list = this.list.concat(res.data.data_list.data)
            if (this.page.last_page == this.page.curPage || this.page.last_page == 0) {
              this.finished = true;
            }
            this.loading = false;
          })
        }
      },
      pay(id){
        this.$post("Integral/orderPay",{user_id:this.user.user_id,order_id:id}).then(res=>{
            this.$wx.pay(res.data.pay_parameters).then(res => {
                this.page.curPage = 1
                this.page.last_page = 99
                this.list = []
                this.getList()
            })
        })
      },
      remind(id){
        this.$post("Integral/orderRemind",{user_id:this.user.user_id,order_id:id}).then(res=>{
          this.$toast(res.message)
        })
      },
      confirm(id){
        this.$dialog.confirm({
          title: '提示',
          message: '确定收货吗？'
        }).then(() => {
          this.$post("Integral/orderConfirm",{user_id:this.user.user_id,order_id:id}).then(res=>{
            this.page.curPage = 1
            this.page.last_page = 99
            this.list = []
            this.getList()
          })
        }).catch(() => {
          // on cancel
        });
      },
      del(id){
        this.$dialog.confirm({
          title: '提示',
          message: '确定删除吗？'
        }).then(() => {
          this.$post("Integral/orderDelete",{user_id:this.user.user_id,order_id:id}).then(res=>{
            this.page.curPage = 1
            this.page.last_page = 99
            this.list = []
            this.getList()
          })
        }).catch(() => {
          // on cancel
        });
      },
      cancel(id){
        this.$dialog.confirm({
          title: '提示',
          message: '确定取消吗？'
        }).then(() => {
          this.$post("Integral/orderCancel",{user_id:this.user.user_id,order_id:id}).then(res=>{
            this.page.curPage = 1
            this.page.last_page = 99
            this.list = []
            this.getList()
          })
        }).catch(() => {
          // on cancel
        });

      },
      express(id){
        this.$router.push({name:"Logistics",query:{
            id:id
          }})
        // this.$post("Integral/getExpressData",{user_id:this.user.user_id,order_id:id}).then(res=>{
        //
        // })
      },

    }
  }
</script>

<style lang="stylus">
  .order-list{
    .van-tabs__wrap--scrollable .van-tab{
      flex 0;
      -ms-flex 0;
    }
    .tabs{
      position fixed
      top 0
      z-index 2
      width 100%
    }
    .list{
      margin-top 44px
      padding-top 10px
    }
    .card {
      width calc(100% - 20px)
      margin 0 10px 10px
      box-sizing border-box
      border-radius:5px
      .title{
        font-size:12px;
        color:#666666
      }

      .opear{
        text-align right
        padding-bottom 10px
        span{
          display inline-block
          width 75px
          height:30px
          line-height 28px
          text-align center
          font-size 14px
          border-radius:15px;
          border:1px solid #CBCBCB
          color #808080
          font-family:PingFangSC-Regular;
          font-weight:400;
          box-sizing border-box
        }
        .pay{

          color #fff
          background #20A546
          border-color #20A546
        }
      }
    }

  }

</style>
