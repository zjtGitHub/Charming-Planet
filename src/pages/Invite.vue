<template>
 <div class="invite" v-if="show">
   <div class="bg">
     <img :src="data.er_compound_img" alt="">
   </div>
 </div>
</template>

<script>
    import {mapState} from "vuex"
  export default {
    data() {
      return {
        show:false
      };
    },
    created(){
      this.getData()
    },
      computed:{
          ...mapState([
              'user'
          ])
      },
    methods: {
      getData(){
        this.$post("Distribution/getMyQrCodeData",{user_id:this.user.user_id}).then(res=>{
          this.show = true
          this.data = res.data
        })
      },
    }
  }
</script>

<style lang="stylus">
  .invite{
    .bg{
      position fixed
      left 0
      top 0
      bottom 0
      right 0
      z-index: 2;
      img{
        width 100%
        height:100%
      }
    }
  }

</style>
