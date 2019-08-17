<template>
  <div class="detail" v-show="pageShow">
    <div class="header">
      <van-swipe :autoplay="3000" indicator-color="#F93A42">
        <van-swipe-item v-for="(image, index) in product.img_path" :key="index">
          <img :src="image" width="100%" :height="height"/>
        </van-swipe-item>
      </van-swipe>
      <div class="title line-2">
        {{product.name}}
      </div>
      <div class="price p-l">
        {{product.money == "0.00"?product.integral+"积分":product.integral+"积分+￥"+product.money}}
      </div>
      <div class="num p-r">库存{{product.stock}} 已兑{{product.sales}}</div>
      <div class="clear"></div>
    </div>
    <div class="small">
      <i class="iconfont icon-xiangji-"></i> 商品详情
    </div>
    <div class="content" v-html="product.description">

    </div>
    <div class="btn" @click="showPop">
      立即兑换
    </div>
    <div class="pop" v-show="show">
      <div class="layer"></div>
      <div class="pop-content">
        <div class="image">
          <img :src="product.cover_img" width="100%">
        </div>
        <div class="good-info">
          <div class="price p-l">{{product.money ==
            "0.00"?product.integral+"积分":product.integral+"积分+￥"+product.money}}
          </div>
          <div class="close p-r" @click="close"><i class="iconfont icon-cuohao"></i></div>
          <div class="clear"></div>
          <div class="stock">
            库存{{product.stock}}
          </div>
        </div>
        <div class="buy-num">
          <div class="text p-l">购买数量</div>
          <div class="stepper p-r">
            <van-stepper v-model="value" :disable-input="true" :max="product.stock" :min="1" @change="changeNum"/>
          </div>
        </div>
        <div class="buy-button" @click="submit">
          确定
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  export default {
    data() {
      return {
        pageShow: false,
        show: false,
        id: 0,
        product: {},
        value: "",
      };
    },
    mounted() {
      this.height = window.screen.width + "px"
      this.id = this.$route.query.id
      this.getData()
        this.$store.commit("user/setAddressId",-1)
    },
    computed:{
      ...mapState([
        'user'
      ])
    },
    methods: {
      getData() {
        this.$post("Integral/getProductDetailData", {product_id: this.id}).then(res => {
          this.product = res.data.product
          this.pageShow = true
        })
      },
      showPop() {
        this.show = true
      },
      close() {
        this.show = false
      },
      changeNum(num) {
        // console.log(this.value);
      },
      submit() {
        this.$router.push({
          name: "integral_buy",
          query: {
            num: this.value,
            id: this.id,
          }
        })
      }
    }
  }
</script>

<style lang="stylus">
  .detail {
    padding-bottom 50px
    .van-stepper__input[disabled] {
      background #fff
      color #000
    }
    .pop {
      position fixed;
      top 0;
      bottom 0;
      left 0;
      right 0;
      z-index 2
      .layer {
        position fixed;
        top 0;
        bottom 0;
        left 0;
        right 0;
        z-index 3
        background rgba(0, 0, 0, 0.1)
      }
      .pop-content {
        position fixed
        bottom 50px;

        width 100%
        z-index 4
        height 180px
        background #fff
        .image {
          width 100px
          left 15px
          position absolute
          top: -10px
          border: 1px solid #E6E6E6
        }
      }

      .good-info {
        padding-left 130px
        padding-right 20px
        padding-top 10px
        .price {
          font-weight bold
          font-size 18px
          color #20A546
        }
        .stock {
          font-size: 13px;
          color #808080
          margin-top 45px
        }
      }
      .buy-num {
        margin-top 20px
        padding 15px
      }
      .buy-button {
        background #20A546
        position fixed
        bottom 0px
        height: 50px
        line-height 50px
        width 100%
        text-align center
        color: #fff;
        z-index 5
      }
    }
    .detail {
      padding-bottom 50px
    }
    .header {
      background #fff
      img {
        width 100%
      }
      .title {
        margin-top 5px
        font-size: 16px;
        color #1A1A1A;
        padding 0 15px
        line-height: 20px;
      }
      .price {
        color #20A546
        font-size 18px
        padding 10px 15px
      }
      .num {
        font-size 13px
        color #808080
        padding 15px 15px 0
      }
    }
    .small {
      font-size 14px
      height 45px
      line-height 45px
      text-align center
      color #989898
    }
    .content {
      position relative
      background #fff
      padding 15px
      word-break break-all
      img{
        max-width 100%;
      }
    }
    .btn {
      background #20A546
      position fixed
      bottom 0px
      height: 50px
      line-height 50px
      width 100%
      text-align center
      color: #fff;
    }
  }
</style>
