<template>
 <div class="register" v-if="show">
   <div class="logo">
     <img :src="data.register_logo" alt="">
   </div>
   <div class="cells">
     <div class="cell">
       <div class="input">
         <input type="text" placeholder="请输入孩子姓名" v-model="realname">
       </div>
       <div class="right">

       </div>
     </div>
     <div class="cell" @click="showTime">
       <div class="input">
         <input type="text" placeholder="请选择孩子生日" readonly v-model="birthday">
       </div>
       <div class="right">
          <i class="iconfont icon-xiala"></i>
       </div>
     </div>
     <div class="cell" style=" border-bottom:1px solid #E6E6E6" @click="showEn">
       <div class="input" v-show="en_level == ''">
         <input type="text" placeholder="请选择孩子英语水平" readonly v-model="en_level">
       </div>
       <div class="title" v-show="en_level !== ''" style="width: 70%;min-height: 20px;word-break: break-all;">
         {{en_level}}
       </div>
       <div class="right">
          <i class="iconfont icon-xiala"></i>
       </div>

     </div>
   </div>
   <div class="btn" @click="submit">开始学习</div>
   <div class="content">
     {{data.register_text}}
   </div>
   <van-popup v-model="popTime" position="bottom" :overlay="true">
     <van-datetime-picker
       v-model="currentDate"
       @change="changeTime"
       type="date"
       :max-date="new Date()"
       :min-date="minDate"
       @confirm="popTime=false"
       @cancel="popTime=false"
     />
   </van-popup>
   <van-popup v-model="popEn" position="bottom" :overlay="true">
     <van-picker :columns="enLvl" @change="changeEn" show-toolbar @confirm="popEn=false"
                 @cancel="popEn=false"/>
   </van-popup>
 </div>
</template>

<script>
  import {mapState} from 'vuex'
  export default {
    data() {
      return {
        realname:"",
        popEn:false,
        birthday:"",
        popTime:false,
        currentDate: new Date(),
        show:false,
        data:{},
        minDate: 0,
        enLvl:[],
        en_level:"",
      };
    },
    computed:{
      ...mapState([
        'user'
      ])
    },
    created(){
      let time = (new Date()).getTime() - 365 * 80 * 24 * 3600 * 1000
      this.minDate = new Date(time)
      this.getData()
    },
    methods: {
      submit(){
        let reqData = {
          user_id: this.user.user_id,
          openid:this.user.openid,
          realname:this.realname,
          en_level:this.en_level,
          birthday:this.birthday,
        }
        if(this.check(reqData)){
          this.$post("Vip/Register",reqData).then(res=>{
            this.$router.replace({path:"/home"})
          })
        }
      },
      check(data){
        let res = false
        if(data.realname == ""){
          this.$toast("请输入孩子姓名")
        }
        else if(data.birthday == ""){
          this.$toast("请选择孩子生日")
        }
        else if(data.en_level == ""){
          this.$toast("请选择孩子英语等级")
        }
        else{
          res = true
        }
        return res
      },
      showTime(){
        this.popTime = true
      },
      showEn(){
        this.en_level = this.enLvl[0]
        this.popEn = true
      },
      changeEn(picker,value){
        this.en_level = value
        console.log(arguments);
      },
      getData(){
        this.$post("Vip/getRegisterConfig").then(res=>{
          this.show = true
          this.data = res.data
        })
        this.$post("Book/getCategoryList").then(res=>{
          for(let i in res.data){
            this.enLvl.push(res.data[i].name)
          }
          console.log(this.enLvl);
        })
      },
      changeTime(picker){
        let timeArr = picker.getValues()
          this.birthday = timeArr.join("-")
      },

    }
  }
</script>

<style lang="stylus">
  .register{
    width 100%;
    height:100%;
    background #fff
    .logo{
      width 230px
      height 67.5px
      padding-top 50px
      margin 0px auto
      img{
        width 100%
        height 100%
      }
    }
    .cells{
      width 80%
      margin 40px auto
      .iconfont{
        color #666666
        font-size 14px
      }
    }
    .btn{
      width 75%
      margin 10px auto
      text-align center
      background #20A546
      color #fff
      height 45px
      line-height 45px
      border-radius:22.5px;
    }
    .content{
      color #839C8A
      width: 100%;
      margin: 20px auto;
      padding: 10px 14%;
      text-align center
      line-height 20px
      font-size 12px
      box-sizing border-box
      background #fff
    }
  }
</style>
