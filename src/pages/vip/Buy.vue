<template>
    <div class="vip_bug" v-if="show">
        <div class="header">
            <div class="history" v-if="data.is_vip == 2" v-go="{name:'vip_history'}">
                VIP购买历史
            </div>
            <div class="time" v-if="data.is_vip == 2">
                <div class="text">
                    有效期至
                </div>
                <div class="timer">
                    {{data.vip_end_time}}
                </div>
            </div>
            <div class="time" v-if="data.is_vip == 1">
                <div class="text">
                    有效期至
                </div>
                <div class="timer">
                    {{data.vip_end_time}}
                </div>
            </div>
        </div>
        <div class="gray"></div>
        <div class="vip-list">
            <div class="vip-item" v-for="(item,index) in data.product" @click="select(index,item.day_number)"
                 :class="{active: curSelect == index}">
                <div class="first" v-if="item.is_special == 2">
                    首次注册优惠
                </div>
                <div class="recommend" v-if="item.is_recommend == 2">
                    推荐
                </div>
                <div class="img p-l">
                    <img src="@img/vip-item.png" alt="" width="40" height="40">
                </div>
                <div class="content p-l">
                    <div class="price">
                        ￥{{parseInt(item.price) }} / {{item.day_number}}天
                    </div>
                    <div class="discount">
                        <span style="text-decoration:line-through">￥{{item.price_original}}</span>
                    </div>
                </div>

            </div>
            <!--<div class="vip-item active">-->
            <!--<div class="img p-l">-->
            <!--<img src="@img/vip-item.png" alt="" width="40" height="40">-->
            <!--</div>-->
            <!--<div class="content p-l">-->
            <!--<div class="price">-->
            <!--￥99 / 30天-->
            <!--</div>-->
            <!--<div class="discount">-->
            <!--<span style="text-decoration:line-through">￥120</span>-->
            <!--</div>-->
            <!--</div>-->

            <!--</div>-->
            <div class="clear"></div>
            <div class="introduction">
                {{data.vip_content}}
            </div>
        </div>
        <div class="btn" @click="submit">购买</div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        name: "Bug",
        data() {
            return {
                show: false,
                curSelect: -1,
                vipDate: "",
            }
        },
        created() {
            this.getData()
            // this.getUser()
        },
        mounted() {
         this.$wx.setConfig();
        },
        computed: {
            ...mapState([
                'user'
            ])
        },
        methods: {
            submit() {
                if (this.curSelect == -1) {
                    this.$toast("请选择一个会员类型")
                } else {
                    let reqData = {
                        user_id: this.user.user_id,
                        id: this.data.product[this.curSelect].id
                    }
                    this.$post("Vip/associatorSubmitOrder", reqData).then(res => {
                        this.$wx.pay(res.data.pay_parameters).then(res => {
                            this.$router.push({name: "vip_history"})
                        })
                    })
                }
            },
            select(index, day) {

                if (this.curSelect == index) {
                    this.curSelect = -1
                    if (this.data.is_vip == 1) {
                        this.data.vip_end_time = " "
                    } else {
                        this.data.vip_end_time = this.vipDate
                    }
                } else {
                    if (this.data.is_vip == 1) {
                        this.data.vip_end_time = this.getDate(day)
                    } else {
                        this.data.vip_end_time = this.getDate(day, this.vipDate)
                    }
                    this.curSelect = index
                }


            },
            getDate(day, cur = 0) {
                Date.prototype.format = function (fmt) {
                    var o = {
                        "M+": this.getMonth() + 1, //月份
                        "d+": this.getDate(), //日
                        "h+": this.getHours(), //小时
                        "m+": this.getMinutes(), //分
                        "s+": this.getSeconds(), //秒
                        "q+": Math.floor((this.getMonth() + 3) / 3), //季度
                        "S": this.getMilliseconds() //毫秒
                    };
                    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
                    for (var k in o)
                        if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
                    return fmt;
                }
                let date = cur == 0 ? new Date() : new Date(cur)
                date.setDate(date.getDate() + day)
                return date.format("yyyy-MM-dd")
            },
            getData() {
                this.$post("/Vip/getAssociatorProduct", {user_id: this.user.user_id}).then(res => {
                    this.data = res.data
                    this.vipDate = this.data.vip_end_time
                    setTimeout(()=>{
                        this.show = true
                    },200)
                })
            },
            getUser() {
                this.$post("Vip/getUserInfo", {openid: this.user.openid}).then(res => {
                    this.userData = res.data

                })
            },
        }
    }
</script>

<style lang="stylus">
    .vip_bug {
        height 100%
        background #fff
        padding-bottom 50px
        box-sizing border-box
        .gray {
            width 100%
            height 10px
            background #f5f5f5
        }
        .btn {
            position fixed
            bottom 0
            width 100%
            height 50px
            line-height 50px
            background #20A546
            color #fff
            text-align center
        }
        .header {
            background url("~@img/vip-buy.png") 0 0 no-repeat
            background-size 100% 95px
            width 100%
            height 95px
            position relative
            .history {
                width 100px
                height 28px
                line-height 28px
                text-align center
                border 1px solid #B3B3B3
                border-radius 15px
                color #808080
                font-size 14px
                position absolute
                top 30px
                right 20px
            }
            .time {
                padding 25px
                .text {
                    font-size 16px
                    color #1A1A1A
                }
                .timer {
                    font-size 22px
                    color #20A546
                    margin-top 5px
                }
            }

        }
        .vip-list {
            background #fff
            padding 20px
            .vip-item {
                position relative
                margin 0 2% 10px
                height 60px
                float left
                width 45%
                border-radius: 5px;
                border 1px solid #93D5A6
                .recommend {
                    position absolute
                    z-index 3
                    right -5px
                    top -5px
                    background #F93A42
                    padding 3px
                    color #fff
                    font-size 12px
                    border-radius 2px
                }
                .first {
                    text-align center
                    line-height 18px
                    position absolute
                    font-size 12px
                    height 20px
                    width 90px
                    left 50px
                    top -10px
                    z-index 3
                    background url("~@img/vip-first.png") 0 0 no-repeat
                    background-size 100% 20px
                }
                .img {
                    margin 10px 0px 0 5px
                    width 30%
                }
                .content {
                    font-weight: bold;
                    width 65%
                    padding-top 15px
                    color #7ECF95
                    font-size 13px
                    .discount {
                        margin-top 3px
                        font-size 13px
                        padding-left 5px
                        color #93D5A6
                    }
                }
                &.active {
                    background #ecf8ef
                    border-color #20A546
                    .content {
                        color #20A546
                    }
                }
            }
            .introduction {
                background #F5F5F5
                padding 15px
                color #666666
                font-size 13px
                line-height 16.5px
                border-radius 5px
                margin-top 10px
            }
        }
    }
</style>
