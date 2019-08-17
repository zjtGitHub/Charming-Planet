import axios from "axios";
import jssdk from 'weixin-js-sdk'
import config from './config'
import VueCookies from 'vue-cookies'
//判断当前设备
let phone_type = '';
if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) {  //判断iPhone|iPad|iPod|iOS
  phone_type = 'iphone';
} else if (/(Android)/i.test(navigator.userAgent)) {   //判断Android
  phone_type = 'android';
}
let WX = function (config) {
  this.test = config.test;
  this.apiList = config.apiList;
  this.debug = config.debug;
  this.test_openid = config.test_openid
}
WX.prototype.api = jssdk;
/**
 * 获取openid
 * router钩子里面调用
 */
WX.prototype.init = function () {
  return new Promise((resolve, reject) => {
    let isTest = this.test;
    let test_openid = this.test_openid || "";
    // let openid = VueCookies.get("openid");
    let openid = localStorage.openid
    if ((localStorage.authExpireTime < Date.parse(new Date()) / 1000 || !localStorage.authExpireTime) && !openid) {
      // 第一次访问
      console.log('授权登录')
      // 跳转到微信授权页面，微信授权地址通过服务端获得
      axios.post('/wechat.php/Basic/wxLogin', {
        url: encodeURIComponent(window.location.href)
      }).then(function (res) {
        res = res.data
        if (res.code) {
          const data = res.data
          localStorage.authExpireTime = Date.parse(new Date()) / 1000 + 60
          if (!isTest) {
            window.location.href = data.redirect_url
          } else {
            window.location.reload()
          }
        }
      })
    } else if (!openid) {
      // 刷新页面，获取数据存入vuex
      let getQueryString = function (name) {
        let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i')
        let r = window.location.search.substr(1).match(reg)
        if (r != null) {
          return unescape(r[2])
        } else {
          return null
        }
      }
      axios.post('/wechat.php/Basic/getUserInfoByCode', {
        code: getQueryString('code'),
        is_test: isTest,
        test_openid: isTest == 1 ? test_openid : "",
      }).then(function (res) {
        res = res.data
        if (res.code) {
          const data = res.data
          resolve(data)
          // localStorage.openid = data.userinfo.openid
          // next()
        }
      })
      console.log('cookie生效期内登录')
    } else {
      // 已经登录
      console.log('已登录')
      reject()
    }
  })
};
/**
 * 设置微信jssdk的配置项
 * 暂定App.vue中挂载
 */
WX.prototype.setConfig = function () {
  let that = this;
    axios.post('/wechat.php/Basic/getJsApiSignpackage', {
    url: window.location.href
  }).then(function (res) {
    res = res.data
    if (res.code == 1) {
      const data = res.data
      that.api.config({
        debug: that.debug,
        appId: data.signpackage.appid,
        timestamp: data.signpackage.timestamp,
        nonceStr: data.signpackage.noncestr,
        signature: data.signpackage.signature,
        jsApiList: that.apiList
      })
    }
  })
}

/**
 * 对微信的jssdk上传图片进行重写
 * 因为在苹果和安卓端略有区别
 *
 * @return image_path :  用于上传服务器的
 * @return imgs       :  用于显示图片的
 *
 */
WX.prototype.uploadImg = function (obj) {
  let that = this;
  //默认参数
  let option = {
    count: 1 || obj.count,//可选照片数量
    sizeType: ['compressed'] || obj.sizeType,// 可以指定是原图还是压缩图，默认二者都有
    sourceType: ['album', 'camera'] || obj.sourceType, // 可以指定来源是相册还是相机，默认二者都有
  }
  return new Promise((resolve, reject) => {
    let image_path = [];//图片路径 用以提交
    let imgs = [];//图片地址 用以前台显示
    let i = 0;//计数器
    that.api.chooseImage({
      count: option.count,
      sizeType: option.sizeType,
      sourceType: option.sourceType,
      success: function (res) {
        // var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
        length = res.localIds.length;
        let upload = function () {
          that.api.uploadImage({
            localId: res.localIds[i], // 需要上传的图片的本地ID，由chooseImage接口获得
            isShowProgressTips: 1, // 默认为1，显示进度提示
            success: function (resp) {
              // var serverId = res.serverId; // 返回图片的服务器端ID
              image_path.push(resp.serverId);
              if (phone_type === "android") {
                console.log("android");
                imgs.push(res.localIds[i]);
                resolve({image_path, imgs});
              } else {
                console.log("ios");
                getImg(res.localIds[i])
              }
              i++;
              if (i < length) {
                upload();
              }
            }
          });
        };
        let getImg = function (id) {
          that.api.getLocalImgData({
            localId: id,
            success: function (res) {
              imgs.push(res.localData);
              resolve({image_path, imgs});
            }
          });
        };
        upload()
      }
    });
  })

}
/**
 * 微信支付
 * @return Promise 对象
 *         成功触发 resolve
 *         取消以及失败触发 reject
 */
WX.prototype.pay = function (obj) {
  let that = this;
  console.log("支付传入参数", obj);
  return new Promise((resolve, reject) => {
    that.api.chooseWXPay({
      timestamp: obj.timeStamp,
      nonceStr: obj.nonceStr,
      package: obj.package,
      signType: obj.signType,
      paySign: obj.paySign,
      success: function (res) {
        console.log("sdghdsfbn"); 
        // 支付成功后的回调函数
        console.log(res)
        resolve(res)
      },
      fail: function (res) {
        console.log(res, 1111111)
        reject(new Error('something bad happened'))
      },
      cancel: function (res) {
        console.log(res,22222222)
        reject(new Error('something bad happened'))
      }
    })
  }).catch((error) => { 
     console.log("sdghdsfbn"); 
    console.log(error); 
}) 
}
/**
 * 分享给朋友以及分享到QQ
 * @param obj
 *  title: '', // 分享标题
    desc: '', // 分享描述
    link: '', // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致 ""视为当前页面
    imgUrl: '', // 分享图标
 *
 */
WX.prototype.share = function (obj) {
  console.log(obj);
  let url = ""
  if (obj.link === "" || obj.link === null || obj.link === undefined) {
    url = location.href
  } else {
    url = obj.link;
  }
  this.api.ready(() => {
    this.api.onMenuShareAppMessage({
      title: obj.title, // 分享标题
      desc: obj.desc, // 分享描述
      link: url,// 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl: obj.imgUrl, // 分享图标
      success: function (res) {
        console.log("分享回调", res);
        //这里是回调函数
      }
    });
  });
};
let wx = new WX(config);
export default wx
