<template>
  <div class="edit" :style="{height:height}">
    <div class="b-title">
      联系人
    </div>
    <div class="cells">
      <div class="cell">
        <div class="title">
          姓名
        </div>
        <div class="input">
          <input type="text" placeholder="输入联系人姓名" v-model="data.linkman">
        </div>
      </div>
      <div class="cell">
        <div class="title">
          手机
        </div>
        <div class="input">
          <input type="text" placeholder="输入联系人手机号" v-model="data.mobile_phone" >
        </div>
      </div>
    </div>
    <div class="b-title">
      收货地址
    </div>
    <div class="cells">
      <div class="cell" @click="showPop">
        <div class="title">
          所在地区
        </div>
        <div class="input p-l">
          <input type="text" placeholder="请选择地址" readonly v-model="selectArea" class="line-1">
        </div>
        <div class="right">
          <i class="iconfont icon-you"></i>
        </div>
      </div>
      <div class="cell">
        <div class="input p-l" style="width: 100%">
          <input type="text" placeholder="请填写详细地址" v-model="data.address" style="width: 97%" @blur.prevent="blurr">
        </div>
      </div>
      <div class="cell" @click="setDefault">
        <div class="title default " :class="{active:data.is_default==2}">
          <i class="iconfont icon-dui1"></i> 设为默认
        </div>
      </div>
    </div>
    <div class="btn" @click="save">保存</div>
    <van-popup v-model="pop" position="bottom" :overlay="true">
      <!--<van-area :area-list="area" @confirm="confirm" @cancel="cancel"/>-->
      <van-picker :columns="columns" @change="onChange" />
    </van-popup>
  </div>
</template>

<script>
  import {mapState} from "vuex"
  import area from "@/area"

  export default {
    data() {
      return {
          height:"",
        area: area,
        pop: false,
        selectArea: "",
        data: {
          province: "",
          city: "",
          area: "",
          linkman: "",
          mobile_phone: "",
          province_id: 1,
          city_id: 1,
          area_id: 1,
          address: "",
          is_default: 1,
        },
        show: false,
        list: [],
        loading: false,
        finished: false,
        columns: [],
        areaData: [],
      };
    },
    computed: {
      ...mapState([
        'user'
      ])
    },
    created() {
      this.id = this.$route.query.id || 0
      if (this.id != 0) {
        this.getData()
      } else {
        this.show = true
      }
      this.getArea()
    },
    methods: {
        blurr(){
            this.height = window.scrollTo(0,0)
            console.log(1);
        },
      onChange(picker, values, index) {
        if (index == 0) {//省选择
          let city = []
          for (let i in this.areaData) {
            if (this.areaData[i].name == values[0]) {
              this.data.province_id = this.areaData[i].id
              this.data.province = this.areaData[i].name
              city = this.areaData[i].city
              break;
            }
          }
          let ciryArr = []
          for (let j in city) {
            ciryArr.push(city[j].city_name)
          }
          let areaArr = []
          for (let k in city[0].area) {
            areaArr.push(city[0].area[k].area_name)
          }
          picker.setColumnValues(1, ciryArr);
          picker.setColumnValues(2, areaArr);
          this.data.city = city[0].city_name
          this.data.city_id = city[0].id
          this.data.area = city[0].area[0].area_name
          this.data.area_id = city[0].area[0].id

        }
        else if(index == 1){
          let area = [];
          for (let i in this.areaData) {
            if (this.areaData[i].id == this.data.province_id) {
              for(let j in this.areaData[i].city){
                if(this.areaData[i].city[j].city_name == values[1]){
                  this.data.city = this.areaData[i].city[j].city_name
                  this.data.city_id = this.areaData[i].city[j].id
                  area = this.areaData[i].city[j].area
                  break;
                }
              }
            }
          }

          let areaArr = []
          for (let k in area) {
            areaArr.push(area[k].area_name)
          }
          picker.setColumnValues(2, areaArr);
          this.data.area = area[0].area_name
          this.data.area_id = area[0].id
        }
        else if(index == 2){
          for (let i in this.areaData) {
            if (this.areaData[i].id == this.data.province_id) {
              for(let j in this.areaData[i].city){
                if(this.areaData[i].city[j].id == this.data.city_id){
                  for(let k in this.areaData[i].city[j].area){
                    if(this.areaData[i].city[j].area[k].area_name == values[2]){
                      this.data.area = this.areaData[i].city[j].area[k].area_name
                      this.data.area_id = this.areaData[i].city[j].area[k].id
                    }
                  }
                }
              }
            }
          }
        }
        this.selectArea = this.data.province + this.data.city + this.data.area
        console.log(this.data.province_id);
        console.log(arguments);
      },
      getArea() {
        this.$post("Address/getRegionAll", {}).then(res => {
          console.log(res);
          this.areaData = res.data
        }).catch(res => {

        })
      },
      assArea() {
        let data = this.areaData
        let area = {
          province_list: [],
          city_list: [],
          county_list: [],
        };

        for (let i in data) {
          area.province_list.push(data[i].name)
        }
        for (let j in data[0].city) {
          area.city_list.push(data[0].city[j].city_name)
        }
        for (let k in data[0].city[0].area) {
          area.county_list.push(data[0].city[0].area[k].area_name)
        }
        this.data.province = data[0].name
        this.data.province_id = data[0].id
        this.data.city = data[0].city[0].city_name
        this.data.city_id = data[0].city[0].id
        this.data.area = data[0].city[0].area[0].area_name
        this.data.area_id = data[0].city[0].area[0].id
        this.selectArea = this.data.province + this.data.city + this.data.area
        this.columns.push({values: area.province_list})
        this.columns.push({values: area.city_list})
        this.columns.push({values: area.county_list})
        console.log(this.data);
        // this.area = area
        // console.log(area);
      },
      setDefault() {
        if (this.data.is_default == 1) {
          this.data.is_default = 2
        }
        else {
          this.data.is_default = 1
        }
      },
      cancel() {
        this.pop = false
      },
      confirm(region) {
        this.pop = false
        this.data.province = region[0].name
        this.data.city = region[1].name
        this.data.area = region[2].name
        this.selectArea = region[0].name + region[1].name + region[2].name
      },
      showPop() {
        if(this.columns.length == 0){
          this.assArea()
        }
        this.pop = true
      },
      getData() {
        this.$post("Address/getAddressData", {user_id: this.user.user_id, id: this.id}).then(res => {
          this.data = res.data
          this.selectArea = res.data.province + res.data.city + res.data.area
          this.show = true
        }).catch(res => {
          this.show = true
        })
      },
      save() {
        if (this.check()) {
          this.data.user_id = this.user.user_id
          if (this.id == 0) { //新增
            this.$post("Address/addressEdit", this.data).then(res => {
              this.$router.back()
            })
          }else{
            this.data.id = this.id
            this.$post("Address/addressEdit", this.data).then(res => {
              this.$router.back()
            })
          }
        }
        console.log(this.data);
      },
      check() {
        let res = false
        let phoneReg = /^1[345678]\d{9}$/
        if (this.data.linkman == "") {
          this.$toast("请输入姓名")
        }
        else if (this.data.mobile_phone == "") {
          this.$toast("请输入手机号")
        }
        else if (!phoneReg.test(this.data.mobile_phone)) {
          this.$toast("请输入正确的手机号")
        }
        else if (this.data.province == "") {
          this.$toast("请选择省市区")
        }
        else if (this.data.address == "") {
          this.$toast("请输入详细地址")
        }
        else {
          res = true
        }
        return res
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
      }
    }
  }
</script>

<style lang="stylus">
  .edit{
    .b-title {
      padding 15px;
      color #bbb;
    }

    .cell {
      .default {
        color #aaa
      }
      .active {
        color #20A546
      }

    }

    .btn {
      position absolute
      bottom 0
      left 0
      right 0
      height 50px
      line-height 50px
      text-align center
      background #20A546
      color #fff
    }
  }


</style>
