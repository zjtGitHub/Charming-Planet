<template>
    <div class="search-page" v-if="show">
        <div class="searchInput">
            <van-search
                    v-model="value"
                    placeholder="请输入搜索关键词"
                    @search="onSearch"
                    @cancel="onCancel"
                    show-action
            />
        </div>
        <div class="s-history">
            <div class="s-header">
                <div class="text p-l">
                    历史搜索
                </div>
                <div class="del p-r" @click="clear">
                    <i class="iconfont icon-shangchu"></i>
                </div>
                <div class="clear"></div>
            </div>
            <div class="history-list" v-if="list.length > 0">
                <div class="history-item" v-for="item in list" @click="go(item.content)">
                    {{item.content}}
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
                show: false,
                value: "",
                list: [],
            };
        },
        computed: {
            ...mapState([
                'user'
            ])
        },
        created() {
            this.getData()
        },
        methods: {
            go(content) {
                this.$router.replace({
                    path: "/picture_list",
                    query: {
                        content: content
                    }
                })
            },
            onSearch() {
                console.log(1);
                let reqData = {
                    user_id: this.user.user_id,
                    source: 1,
                    content: this.value,
                }

                this.$post("Book/addSearchHistory", reqData).then(res => {

                })
                this.$router.replace({
                    path: "/picture_list",
                    query: {
                        content: this.value
                    }
                })
            },
            onCancel() {
                this.$router.replace({
                    path: "/home",
                })
            },
            clear() {
                this.$post("Book/deleteHistory", {user_id: this.user.user_id}).then(res => {
                    this.list = []
                    this.getData()

                })
            },
            getData() {
                this.$post("Book/getHistoryList", {user_id: this.user.user_id}).then(res => {
                    this.list = res.data
                    this.show = true
                })
            }
        }
    }
</script>

<style lang="stylus">
    .search-page {
        width 100%;
        height: 100%;
        background #fff
        padding-top 10px
        box-sizing border-box
        .searchInput {
            .van-search {
                background #fff !important
                .van-field {
                    background #EFEFEF
                    border-radius 30px
                }
            }
        }
        .s-history {
            margin-top 20px
            padding: 7px 20px;
            .s-header {
                .text {
                    color #4D4D4D
                    font-size 14px
                }
            }
            .history-list {
                margin-top 20px
                .history-item {
                    margin-right 10px
                    display inline-block
                    background #F5F5F5
                    color #808080
                    padding 8px 10px
                    font-size 12px
                    margin-bottom: 10px;
                }
            }
        }
    }

</style>
