<template>
  <div class="l-list">
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

        <div class="good-item" v-for="item in list" v-go="{name:'integral_detail',query:{id:item.id}}" :key="item.id">
          <div class="image p-l">
            <img :src="item.cover_img" alt="">
          </div>
          <div class="good p-l">
            <div class="title line-2">
              {{item.name}}
            </div>
            <div class="num">
              已兑{{item.sales}}
            </div>
            <div class="price">
              {{item.money == "0.00"?item.integral+"积分":item.integral+"积分+￥"+item.money}}
            </div>
          </div>
          <div class="clear"></div>
        </div>
      </van-list>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        value: "",
        list: [],
        loading: false,
        finished: false,
        page: {
          curPage: 0,
          last_page: 99,
        }
      };
    },
    created() {
      this.id = this.$route.query.id
      this.getList()
    },
    methods: {
      getList() {
        if (this.page.last_page > this.page.curPage) {
          this.loading = true;
          this.page.curPage += 1
          this.$post("Integral/getProductList", {
            page: this.page.curPage,
            keyword: this.value,
            category_id: this.id
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
      onLoad() {
        // 异步更新数据
        setTimeout(() => {
          for (let i = 0; i < 10; i++) {
            this.list.push(this.list.length + 1);
          }
          // 加载状态结束
          this.loading = false;

          // 数据全部加载完成
          if (this.list.length >= 40) {
            this.finished = true;
          }
        }, 500);
      },
      onSearch() {
        this.loading = false
          this.finished = false
          this.page = {
            curPage: 0,
            last_page: 99,
          }
          this.list = []
        this.getList()
      },
      onCancel() {

      }
    }
  }
</script>

<style lang="stylus">
  .l-list{
    .van-search {
      background #fff !important
      .van-field {
        background #EFEFEF
        border-radius 30px
      }
    }

    .search {
      position fixed;
      top 0;
      width 100%
    }

    .good-item .good .title {
      height 34px
    }

    .list {
      padding-top 44px;
      background #fff
      padding-left 15px
      .item {
        border-bottom: 1px solid rgba(230, 230, 230, 1);
        padding 15px 15px 15px 0
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
    }
  }

</style>
