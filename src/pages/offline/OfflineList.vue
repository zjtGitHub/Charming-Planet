<template>
  <div class="picture-list" v-if="show">
    <div class="content" v-if="userData.is_offline == 2">
      <!--<div class="search">-->
        <!--<van-search-->
                <!--v-model="content"-->
                <!--placeholder="请输入搜索关键词"-->
                <!--@search="onSearch"-->
                <!--@cancel="onCancel"-->
        <!--/>-->
      <!--</div>-->
      <!--<div class="select" @click="showEn">-->
        <!--{{en_level}} <i class="iconfont icon-xiala"></i>-->
      <!--</div>-->
      <div class="list">
        <van-list
                v-model="loading"
                :finished="finished"
                @load="getList"
                finished-text="没有更多了"
        >
          <div class="item" v-for="item in list" v-go="{name:'offline_detail',query:{id:item.book_id}}">
            <div class="item-image p-l">
              <img :src="item.cover_img" alt="" class="img">
              <img :src="item.category_script_img" alt="" class="label">
            </div>
            <div class="content p-r">
              <div class="item-title line-2">
                {{item.name}}
              </div>
              <div class="item-content line-3">
                简介：{{item.description}}
              </div>
            </div>
            <div class="clear"></div>
          </div>
        </van-list>

      </div>
      <van-popup v-model="popEn" position="bottom" :overlay="true">
        <van-picker :columns="enLvl" @change="changeEn" show-toolbar @confirm="confirm"
                    @cancel="cancel"/>
      </van-popup>
    </div>
    <div class="class no-data" v-if="userData.is_offline == 1">
      您还不是线下学员~
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'

  export default {
    data() {
      return {
        popEn: false,
        list: [],
        loading: false,
        finished: false,
        show: false,
        enLvl: ["全部"],
        content: "",
        en_level: "全部",
        category_id: -100,
        page: {
          curPage: 0,
          last_page: 99,
        },
        enLvlArr: []
      };
    },
    computed: {
      ...mapState([
        'user'
      ])
    },
    created() {
      this.content = this.$route.query.content || ""
      this.en_level = this.$route.query.category || "全部"
        this.getUser()
    },
    methods: {
        getUser() {
            this.$post("Vip/getUserInfo", {openid: this.user.openid}).then(res => {
                this.userData = res.data
                this.getData()
            })
        },
      confirm(value) {
        this.en_level = value;
        this.popEn = false
        this.onSearch()
      },
      cancel() {
        this.popEn = false
      },
      getList() {
        if (this.page.last_page > this.page.curPage) {
          if (this.en_level == "全部") {
            this.category_id = -100
          } else {
            for (let i in this.enLvlArr) {
              if (this.enLvlArr[i].name == this.en_level) {
                this.category_id = this.enLvlArr[i].id
              }
            }
          }

          this.loading = true;
          this.page.curPage += 1
          let reqData = {
            // category_id: this.category_id,
            // keyword: this.content,
            page: this.page.curPage,
              user_id:this.user.user_id
          }
          this.$post("Offline/getBookListByOffline", reqData).then((res) => {
            this.page.last_page = res.data.data_list.last_page
            this.list = this.list.concat(res.data.data_list.data)
            if (this.page.last_page == this.page.curPage) {
              this.finished = true;
            }
            this.loading = false;
          })
        } else {
          this.loading = false;
          this.finished = true;
        }
      },
      getData() {
        this.$post("Book/getCategoryList").then(res => {
          this.enLvlArr = res.data
          for (let i in res.data) {
            this.enLvl.push(res.data[i].name)
          }
          this.show = true
          this.getList()
          console.log(this.enLvl);
        })
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
      showEn() {
        this.popEn = true
      },
      changeEn(picker, value) {
        // this.en_level = value
        console.log(arguments);
      },
      onLoad() {
        // 异步更新数据
        setTimeout(() => {
          // for (let i = 0; i < 10; i++) {
          //   this.list.push(this.list.length + 1);
          // }
          // // 加载状态结束
          // this.loading = false;
          //
          // // 数据全部加载完成
          // if (this.list.length >= 40) {
          //   this.finished = true;
          // }
        }, 500);
      }
    }
  }
</script>

<style lang="stylus">
  .picture-list {
    padding-bottom 50px
    .no-data{
      position fixed
      width 100%
      height 100%
      line-height 10
      text-align center
      color #1a1a1a

    }
    .van-search {
      background #fff !important
      .van-field {
        background #EFEFEF
        border-radius 30px
      }
    }
    .select {
      background #fff;
      width 100%
      text-align center
      color #20A546
      height 30px;
      line-height 30px;
      border-bottom 1px solid #E6E6E6
      padding-bottom 10px
      font-weight bold
    }
    .list {
      background #fff
      padding 15px
      .item {
        margin-bottom 10px
        width 100%
        position relative
        border-bottom 1px solid #E6E6E6
        padding-bottom 10px
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
            height 41px
            font-size 16px
            font-weight bold
            line-height 20px
          }
          .item-content {
            margin-top 5px
            font-size 13px
            line-height 16px
            color #808080
          }
        }
      }

    }
  }

</style>
