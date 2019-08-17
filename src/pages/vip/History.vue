<template>
    <div class="history">
        <div class="header">
            <div class="header-content">
                <div class="img p-l">
                    <img :src="userData.headimgurl">
                </div>
                <div class="content p-l">
                    <div class="name line-1">
                        {{userData.nickname}}
                    </div>
                    <!--<div class="vip not">-->
                    <!--开通vip会员-->
                    <!--</div>-->
                    <div class="vip">
                        VIP到期时间：{{userData.vip_end_time}}
                    </div>
                </div>
            </div>
        </div>
        <div class="list" :style="{height:height}">
            <div class="cells">
                <van-list
                        v-model="loading"
                        :finished="finished"
                        finished-text="没有更多了"
                        @load="getList"
                >
                    <div class="cell" v-for="item in list">
                        <div class="title">
                            <span>购买会员{{item.product_name}}</span>
                            <span class="time">{{item.create_time}}</span>

                        </div>
                        <div class="right">
                            ￥{{item.price}} / {{item.product_day}}天
                        </div>
                        <div class="clear"></div>
                    </div>
                </van-list>
            </div>
        </div>
    </div>
</template>

<script>
    import {mapState} from 'vuex'

    export default {
        data() {
            return {
                userData: {},
                height: "",
                show: false,
                list: [],
                loading: false,
                finished: false,
                page: {
                    curPage: 0,
                    last_page: 99,
                }
            }
        },
        created() {
            this.getList()
            this.getUser()
            this.height = window.screen.height - 200 + "px"
        },
        computed: {
            ...mapState([
                'user'
            ])
        },
        methods: {
            getList() {
                if (this.page.last_page > this.page.curPage) {
                    this.loading = true;
                    this.page.curPage += 1
                    this.$post("Vip/getAssociatorOrder", {
                        page: this.page.curPage,
                        user_id: this.user.user_id
                    }).then((res) => {
                        // this.page.curPage = res.data.data_list.current_page
                        this.page.last_page = res.data.data_list.last_page
                        this.list = this.list.concat(res.data.data_list.data)
                        if (this.page.last_page == this.page.curPage || this.page.last_page == 0) {
                            this.finished = true;
                        }
                        this.loading = false;
                    })
                }
            },
            getUser() {
                this.$post("Vip/getUserInfo", {openid: this.user.openid}).then(res => {
                    this.userData = res.data
                    this.show = true
                })
            },
        }
    }
</script>

<style lang="stylus">
    .history {
        position relative
        .header {
            width 100%;
            height 160px
            background #E7D578
            box-sizing border-box
            padding 50px 35px
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
                padding 10px 15px

                .name {
                    font-size 18px
                    color #725C31
                    font-weight bold
                    width 200px
                    height 18px
                    line-height 18px
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
        .list {
            overflow-y auto
            position absolute
            box-sizing border-box
            width 90%
            left 5%
            background #fff
            top 135px
            padding 5px
            border-radius 10px
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
                .right {
                    font-weight bold
                    padding-top 10px
                    color #7ECF95
                }
            }
        }
    }
</style>
