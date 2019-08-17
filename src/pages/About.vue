<template>
 <div class="about" v-if="show">
   <div class="bg">
     <img :src="data.url" alt="">
   </div>
 </div>
</template>

<script>
  export default {
    data() {
      return {
        show:false
      };
    },
    created(){
      this.getData()
    },
    methods: {
      getData(){
        this.$post("Vip/aboutUs").then(res=>{
          this.show = true
          this.data = res.data
        })
      },
    }
  }
</script>

<style lang="stylus">
  .about{
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
