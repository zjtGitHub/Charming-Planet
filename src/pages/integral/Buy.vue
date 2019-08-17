<template>
    <div class="buy" v-if="showPage">
        <div class="good-item">
            <div class="image p-l">
                <img :src="data.product.cover_img" alt="">
            </div>
            <div class="good p-l">
                <div class="title line-2">
                    {{data.product.name}}
                </div>
                <div class="num">
                    x {{num}}
                </div>
                <div class="price">
                    {{data.product.money ==
                    "0.00"?data.product.integral+"积分":data.product.integral+"积分+￥"+data.product.money}}
                </div>
            </div>
            <div class="clear"></div>
        </div>
        <div class="method" v-if="data.product.type==1">
            <div class="cells">
                <div class="cell" @click="selectMethod">
                    <div class="title">
                        到货方式
                    </div>
                    <div class="right" v-if="reqData.deliver_type_id !== 0">
                        {{reqData.deliver_type_text}}
                    </div>
                    <div class="right" v-if="reqData.deliver_type_id == 0">
                        <i class="iconfont icon-you"></i>
                    </div>
                </div>
                <div class="cell" v-if="data.default_address.address && reqData.deliver_type_id == 1"
                     v-go="'/integral/address/list'">
                    <div class="address">
                        <div class="name">
                            {{data.default_address.linkman}} {{data.default_address.mobile_phone}}
                        </div>
                        <div class="text">
                            {{data.default_address.province + data.default_address.city + data.default_address.area +
                            data.default_address.address}}
                        </div>
                    </div>
                    <div class="right">
                        <i class="iconfont icon-you" style="margin-top: 12px;display: inline-block"></i>
                    </div>
                </div>
                <div class="cell" v-if="!data.default_address.address" v-go="'/integral/address/list'">
                    <div class="address">
                        <div class="name">
                            请选择地址
                        </div>
                    </div>
                    <div class="right">
                        <i class="iconfont icon-you"></i>
                    </div>
                </div>
            </div>
        </div>
        <div class="info">
            <div class="cells">
                <div class="cell" v-if="data.pay_integral != 0">
                    <div class="title">
                        需支付积分 <span class="title-text">(剩余积分{{data.my_integral}})</span>
                    </div>
                    <div class="right">
                        <span class="green">{{data.pay_integral}}</span>
                    </div>
                </div>
                <div class="cell" v-if="data.pay_money != 0">
                    <div class="title">
                        需支付金额
                    </div>
                    <div class="right">
                        <span class="green">￥{{data.pay_money}}</span>
                    </div>
                </div>
                <div class="cell">
                    <div class="title">
                        备注
                    </div>
                    <div class="right">
                        <input type="text" placeholder="请输入备注" v-model="reqData.remark">
                    </div>
                </div>
            </div>
        </div>
        <div class="opear">
            <div class="price">实付：<span class="green">
        {{data.pay_integral != 0 && data.pay_money != 0?data.pay_integral+"积分+￥"+data.pay_money :"" }}
        {{data.pay_integral == 0?"￥"+data.pay_money :"" }}
        {{data.pay_money == 0?data.pay_integral+"积分" :"" }}
      </span></div>
            <div class="btn" @click="submit">确认兑换</div>
        </div>
        <van-actionsheet
                v-model="show"
                :actions="actions"
                @select="onSelect"
                title="请选择配送方式"
                class="cells"
                cancel-text=""
        >
            <div v-for="item in actions" class="cell" @click="select(item)">
                <div class="title">
                    {{item.name}}
                </div>
                <div class="right" v-if="reqData.deliver_type_id == item.id">
                    <i class="iconfont icon-dui1"></i>
                </div>

            </div>
        </van-actionsheet>
    </div>
</template>

<script>
    import {mapState} from "vuex"

    export default {
        data() {
            return {
                id: "",
                num: "",
                showPage: false,
                show: false,
                data: {},
                reqData: {
                    deliver_type_id: 1,
                    deliver_type_text: "邮寄",
                    remark: "",
                },
                actions: []
            };
        },
        computed: {
            ...mapState([
                'user'
            ])
        },
        activated() {
            this.id = this.$route.query.id;
            this.num = this.$route.query.num;
        },
        created() {

        },
        mounted(){
            this.$wx.setConfig();
        },
        watch: {
            id(n) {
                console.log(222);
                this.id = n
                this.getData(() => {
                    if (this.user.address_id != -1) {
                        this.getAddress()
                    }
                })
            },
            num(n) {
                console.log(333);
                this.num = n
                this.getData(() => {
                    if (this.user.address_id != -1) {
                        this.getAddress()
                    }
                })

            }
        },
        mounted() {
            this.id = this.$route.query.id;
            this.num = this.$route.query.num;
            this.getData()
        },
        deactivated() {
            console.log(1);
        },
        methods: {
            select(item) {
                console.log(item);

                // this.show = false
                // this.reqData.deliver_type_id = item.id;
                // this.reqData.deliver_type_text = item.name
            },
            onSelect() {
                console.log(arguments);
            },
            selectMethod() {
                this.show = true
            },
            getAddress() {
                this.$post("Address/getAddressData", {
                    user_id: this.user.user_id,
                    id: this.user.address_id,
                }).then(res => {
                    this.data.default_address = res.data
                })
            },
            submit() {
                let reqData = Object.assign(this.data.default_address, {
                    user_id: this.user.user_id,
                    product_id: this.data.product.id,
                    number: this.num,
                    source: 1,
                }, this.reqData)
                if (this.check(reqData)) {
                    this.$dialog.confirm({
                        title: '提示',
                        message: '确认兑换吗？'
                    }).then(() => {
                        this.$post("Integral/submitOrder", reqData).then(res => {
                            if (JSON.stringify(res.data) == "[]") {
                                this.$router.replace({path: "/integral/order/list"})

                            } else {
                                this.$wx.pay(res.data.pay_parameters).then(res => {
                                    this.$router.replace({path: "/integral/order/list"})
                                })
                            }

                        })
                    }).catch(() => {
                        // on cancel
                    });

                }
                console.log(reqData);
            },
            check(data) {
                let res = false
                //实物 邮寄
                if (this.data.product.type == 1) {
                    if (data.deliver_type_id == 0) {
                        this.$toast("请选择收货方式")
                    }
                    else if (data.deliver_type_id == 1) {
                        if (data.linkman == null || data.linkman == undefined) {
                            this.$toast("请选择收货地址")
                        }
                        else if (this.data.my_integral < this.data.pay_integral) {
                            this.$toast("您的积分不足")
                        } else {
                            res = true
                        }
                    }
                    else {
                        if (this.data.my_integral < this.data.pay_integral) {
                            this.$toast("您的积分不足")
                        } else {
                            res = true
                        }
                    }
                } else {

                }
                return res
            },
            getData(cb) {
                this.$post("Integral/getOrderReadyData", {
                    user_id: this.user.user_id,
                    product_id: this.id,
                    number: this.num
                }).then(res => {
                    this.data = res.data
                    this.showPage = true
                    this.actions = []
                    for (let i in res.data.product.deliver_type) {
                        this.actions.push({
                            name: res.data.product.deliver_type[i].name,
                            id: res.data.product.deliver_type[i].id,
                        })
                    }
                    cb && cb()
                })
                // this.$post("Integral/getProductDetailData", {product_id: this.id}).then(res => {
                //   this.product = res.data.product
                //   this.pageShow = true
                // })
            },
        }
    }
</script>

<style lang="stylus">
    .buy {
        .opear {
            position fixed
            bottom 0
            width 100%
            height 50px
            line-height 50px
            background #fff
            .price {
                float left
                width 62.6%
                padding-left 10px
                box-sizing border-box
                font-size 14px
                color #4D4D4D
                span {
                    font-size 18px
                    font-family: DINAlternate-Bold;
                }
            }
            .btn {
                float right
                width 36.4%
                background #20A546
                color #fff
                text-align center
            }
        }

        .good-item {
            background #fff
            padding 15px
        }

        .item {
            background #fff
            border-bottom: 1px solid rgba(230, 230, 230, 1);
            padding 15px
            .image {
                width 100px
                img {
                    width 90px
                    height 90px
                    border: 1px solid rgba(230, 230, 230, 1);

                }
            }
            .good {
                width calc(100% - 100px)
                .title {
                    color: #1A1A1A;
                    font-size: 13px;
                    line-height 17px
                }
                .num {
                    font-size: 13px;
                    color: rgba(128, 128, 128, 1);
                    margin 15px 0
                }
                .price {
                    color: rgba(32, 165, 70, 1);
                    font-size 14px
                }
            }

        }

        .method {
            margin 7.5px 0
        }
        .van-icon-close {
            display none
        }
        .icon-dui1 {
            color #20A546
        }
        .cell {
            .address {
                width 85%
            }
        }
    }

</style>
