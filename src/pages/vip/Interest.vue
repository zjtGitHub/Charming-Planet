<template>
  <div class="interest" v-if="show">
    <div class="bg">
      <img :src="data.url" alt="" width="100%" height="100%">
    </div>
    <div class="btn" v-if="userData.is_vip == 1" v-go="{name:'vip_buy'}">
      成为会员
    </div>
  </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    name: "Interest",
    data() {
      return {
        show: false
      }
    },
    created() {
      this.getData()
      this.getUser()
    },
    computed:{
      ...mapState([
        'user'
      ])
    },
    methods: {
      getData() {
        this.$post("Vip/memberRights").then(res => {
          this.data = res.data
        })
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
  .interest {
    .bg {
      position fixed
      left 0
      top 0
      bottom 0
      right 0
      z-index 3

    }
    .btn {
      position fixed
      bottom 12px
      left 5%
      width 90%
      height 45px
      line-height 45px
      text-align center
      background #20A546
      color #fff
      z-index 4
      border-radius 50px
    }
  }
</style>
