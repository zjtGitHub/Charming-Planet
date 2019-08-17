<template>
  <div class="list" v-if="show">
    <div class="header" v-go="{name:'integral_address_edit'}">
      + 新增收货地址
    </div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <div class="address" v-for="item in list">
        <div class="contact" @click="select(item.id)">
          {{item.linkman}} {{item.mobile_phone}}
        </div>
        <div class="content" @click="select(item.id)">
          {{item.province + item.city + item.area + item.address}}
        </div>
        <div class="opear">
          <div class="defalut p-l " :class="{active:item.is_default == 2}" @click="setDefault(item.is_default,item.id)">
            <i class="iconfont icon-dui1"></i> 设为默认
          </div>
          <div class="btn-group p-r">
            <span class="edit" v-go="{name:'integral_address_edit',query:{id:item.id}}">
                <i class="iconfont icon-bianji"></i> 编辑
              </span>
            <span class="del" @click="del(item.id)">
                <i class="iconfont icon-shangchu"></i> 删除
              </span>
          </div>
        </div>
      </div>
    </van-list>
  </div>
</template>

<script>
  import {mapState} from "vuex"

  export default {
    data() {
      return {
        list: [],
        loading: false,
        finished: true,
        show:false,
      };
    },
    computed:{
      ...mapState([
        'user'
      ])
    },
    created(){
      // this.$store.commit("user/setAddressId",-1)
      this.getList()
    },
    methods: {
      select(id){
        this.$store.commit("user/setAddressId",id)
        this.$router.back()
      },
      getList(){
        this.$post("Address/getMyAddress",{user_id:this.user.user_id}).then(res=>{
          this.show =  true
          this.list = res.data
        }).catch(res=>{
          this.show =  true
          this.list = []
        })
      },
      setDefault(value,id){
        if(value != 2){
          this.$post("Address/changeDefault",{user_id:this.user.user_id,id:id}).then(res=>{
            this.getList()
          })
        }
      },
      del(id){
          this.$dialog.confirm({
              title: '提示',
              message: '确认删除吗？'
          }).then(() => {
              this.$post("Address/deleteAddress",{user_id:this.user.user_id,id:id}).then(res=>{
                  this.getList()
                  this.$store.commit("user/setAddressId",-1)
              })
          }).catch(() => {
              // on cancel
          });

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
  .list{
    .header {
      height 50px;
      background #fff;
      color #20A546
      border-bottom 1px solid #f5f5f5
      box-sizing border-box
      width 100%;
      padding 15px
    }
    .address {
      margin-top 10px
      padding 15px
      background #fff

      .contact {
        margin-bottom 5px
      }
      .content {
        color #aaa
        font-size 14px
        padding-bottom 15px
        border-bottom 1px solid #f5f5f5
      }
      .opear {
        font-size 14px;
        color #aaa
        padding 15px 0
        .btn-group {
          text-align right
          span{
            margin-left 10px
          }
        }
        .active{
          color #20A546
        }
      }
    }

  }

</style>
