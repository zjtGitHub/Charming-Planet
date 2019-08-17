<template>
    <div class="record">
        <div class="search">
            <van-search
                    v-model="value"
                    placeholder="请输入搜索关键词"
                    @search="onSearch"
                    @cancel="onCancel"
            />
        </div>

        <div class="list">
            <van-list
                    v-model="loading"
                    :finished="finished"
                    finished-text="没有更多了"
                    @load="getList"
            >
                <div class="item" v-for="item in list" :key="item.id" v-go="{name:'picture_detail',query:{id:item.book_id}}">
                    <div class="item-image p-l">
                        <img :src="item.cover_img" alt="" class="img">
                        <img :src="item.script_img" alt="" class="label">
                    </div>
                    <div class="content p-r">
                        <div class="item-title line-2">
                            {{item.name}}
                        </div>
                        <div class="item-content line-3">
                            {{item.look_time}}
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
                list: [],
                loading: false,
                finished: false,
                page: {
                    curPage: 0,
                    last_page: 99,
                },
                value: "",
            };
        },
        created() {
            this.getList()
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
                    this.$post("Vip/getLookRecord", {
                        page: this.page.curPage,
                        user_id: this.user.user_id,
                        keyword: this.value
                    }).then((res) => {
                        // this.page.curPage = res.data.data_list.current_page
                        this.page.last_page = res.data.data_list.last_page
                        console.log(res.data.data_list.data);
                        if (res.data.data_list.data.length > 0) {
                            this.list = this.list.concat(res.data.data_list.data)
                        }

                        if (this.page.last_page == this.page.curPage || this.page.last_page == 0) {
                            this.finished = true;
                        }
                        this.loading = false;
                    })
                }
            },
            onSearch() {
                this.page = {
                    curPage: 0,
                    last_page: 99,
                }
                this.finished = false
                this.list = []
                this.getList()
            },
            onCancel() {

            },
            onLoad() {
                // 异步更新数据
                setTimeout(() => {
                    // for (let i = 0; i < 10; i++) {
                    //     this.list.push(this.list.length + 1);
                    // }
                    // // 加载状态结束
                    // this.loading = false;
                    //
                    // // 数据全部加载完成
                    // if (this.list.length >= 40) {
                    //     this.finished = true;
                    // }
                }, 500);
            }
        }
    }
</script>

<style lang="stylus">
    .record {
        .van-search {
            background #fff !important
            .van-field {
                background #EFEFEF
                border-radius 30px
            }
        }
        .list {
            background #fff
            padding 15px
            .item {
                margin-bottom 10px
                width 100%
                position relative
                padding-bottom 10px
                border-bottom 1px solid #f5f5f5
                .item-image {
                    width 30%
                    border-radius 10px
                    .img {
                        width 100px
                        height 100px
                        border-radius 10px
                    }
                    .label {
                        border-radius 10px
                        border-top-right-radius 0
                        border-bottom-left-radius 0
                        position absolute
                        width 35px
                        height 21px
                        top 0px
                        left 0px
                    }
                }
                .content {
                    padding-top 5px
                    width 65%
                    .item-title {
                        font-size 16px
                        font-weight bold
                        line-height 20px
                    }
                    .item-content {
                        margin-top 35px
                        font-size 13px
                        line-height 15px
                        color #808080
                    }
                }
            }

        }
    }

</style>
