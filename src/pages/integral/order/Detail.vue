<template>
  <div class="order-detail" v-if="show">
    <div class="header">
      <div class="status">{{data.status_name}}</div>
      <div class="order-num">订单编号：{{data.order_number}}</div>
    </div>
    <div class="address" v-if="data.deliver_type == 1">
      <div class="contact">
        {{data.linkman}} {{data.mobile_phone}}
      </div>
      <div class="text">
        {{data.province + data.city + data.area + data.address}}
      </div>
    </div>
    <div class="good-item" v-for="item in data.order_product">
      <div class="image p-l">
        <img :src="item.product_cover_img" alt="">
      </div>
      <div class="good p-l">
        <div class="title line-2">
          {{item.product_name}}
        </div>
        <div class="num">
          x{{item.number}}
        </div>
        <div class="price">
          {{item.product_integral != 0 && item.product_money != "0.00"?item.product_integral+"积分+￥"+item.product_money :"" }}
          {{item.product_integral == 0?"￥"+item.product_money :"" }}
          {{item.product_money == 0?item.product_integral+"积分" :"" }}
        </div>
      </div>
      <div class="clear"></div>
    </div>
    <div class="cells">
      <div class="cell">
        <div class="title">
          到货方式
        </div>
        <div class="right">
          {{data.deliver_type == 1?"邮寄":"上门自提"}}
        </div>
      </div>
      <div class="cell">
        <div class="title">
          备注
        </div>
        <div class="right">
          {{data.remark==""?"无":data.remark}}
        </div>
      </div>
      <div class="cell">
        <div class="right">
          {{data.order_product.length}}件商品 合计：<span class="green">
          {{data.pay_integral != 0 && data.pay_money != 0?data.pay_integral+"积分+￥"+data.pay_money :"" }}
        {{data.pay_integral == 0?"￥"+data.pay_money :"" }}
        {{data.pay_money == 0?data.pay_integral+"积分" :"" }}
        </span>
        </div>
      </div>
    </div>
    <div class="time">
      <div class="title p-l">
        下单时间
      </div>
      <div class="timer p-r">
        {{data.order_time}}
      </div>
    </div>
    <div class="time" v-if="data.status > 1">
      <div class="title p-l">
        付款时间
      </div>
      <div class="timer p-r">
        {{data.pay_time}}
      </div>
    </div>
    <div class="time" v-if="data.status > 2">
      <div class="title p-l">
        发货时间
      </div>
      <div class="timer p-r">
        {{data.express_time}}
      </div>
    </div>
    <div class="time" v-if="data.status > 3">
      <div class="title p-l">
        收货时间
      </div>
      <div class="timer p-r">
        {{data.confirm_time}}
      </div>
    </div>
    <div class="opear">
      <span class="btn"  v-if="data.status == 1" @click.stop="cancel(data.id)">取消订单</span>

      <span class="btn pay" v-if="data.status == 1" @click.stop="pay(data.id)">支付</span>
      <span class="btn pay" v-if="data.status == 2" @click.stop="remind(data.id)">提醒发货</span>
      <span class="btn"  v-if="data.status == 3" @click.stop="express(data.id)">查看物流</span>
      <span class="btn pay" v-if="data.status == 3" @click.stop="confirm(data.id)">确认收货</span>
      <span class="btn pay"  v-if="data.status == 4" @click.stop="del(data.id)">删除订单</span>
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        show: false,
        id: 0,
        data: {},
      };
    },
    computed: {
      ...mapState([
        'user'
      ])
    },
      mounted(){
         this.$wx.setConfig();
      },
    created() {
      this.id = this.$route.query.id
      this.getData()
    },
    methods: {
      getData() {
        this.$post("Integral/getOrderDetailData", {order_id: this.id, user_id: this.user.user_id}).then(res => {
          this.show = true
          this.data = res.data.order
        })
      },
      pay(id){
        this.$post("Integral/orderPay",{user_id:this.user.user_id,order_id:id}).then(res=>{
            this.$wx.pay(res.data.pay_parameters).then(res => {
                this.getData()
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
            this.getData()
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
            this.$router.back()
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
            this.getData()
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
  .order-detail {
    padding-bottom 50px
    .header {
      box-sizing border-box
      width 100%;
      height 64px;
      background #20A546;
      color #fff
      padding 10px 0 0 23.5px
      .status {
        font-size 20px
        font-family: PingFangSC-Semibold;
        font-weight: 600;
      }
      .order-num {
        font-size 14px
        margin-top 5px
      }
    }
    .address {
      background #fff
      padding 15px
      .contact {
        font-size 16px
        color #1A1A1A
        margin-bottom 5px
      }
      .text {
        color #808080
        font-size 13px
      }
    }
    .good-item {
      margin 10px 0
      background #fff
      padding-left 15px
    }
    .cells{
      margin-bottom 10px
    }
    .time {
      height 50px
      line-height 50px
      background #fff
      font-size 12px
      color #989898
      padding 0 15px
    }
    .opear {
      width 100%
      box-sizing border-box
      position fixed
      bottom 0
      height 50px
      line-height 50px
      background #fff
      text-align right
      padding 0 15px
      span {
        display inline-block
        width 75px
        height: 30px
        line-height 28px
        text-align center
        font-size 14px
        border-radius: 15px;
        border: 1px solid #CBCBCB
        color #808080
        font-family: PingFangSC-Regular;
        font-weight: 400;
        box-sizing border-box
      }
      .pay {

        color #fff
        background #20A546
        border-color #20A546
      }
    }
  }

</style>
