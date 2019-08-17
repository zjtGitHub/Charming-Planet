import axios from 'axios'
import router from '../router'
import store from '../store'
import { Toast } from 'vant';
/**
 * http request 拦截器
 */
axios.interceptors.request.use(

  config => {
    // const token = getCookie('名称');
    // config.data = JSON.stringify(config.data);
    // config.headers = {
    //   'Content-Type':'application/x-www-form-urlencoded'
    // }
    // if(token){
    //   config.params = {'token':token}
    // }
    // store.commit('updateLoadingStatus', {isLoading: true})
    Toast.loading("");
    return config;
  },
  error => {
    return Promise.reject(err);
  }
);

/**
 * http response 拦截器
 */
axios.interceptors.response.use(
  response => {
    // if(response.data.errCode ==2){
    //   router.push({
    //     path:"/login",
    //     querry:{redirect:router.currentRoute.fullPath}//从哪个页面跳转
    //   })
    // }
    // store.commit('updateLoadingStatus', {isLoading: false})
    Toast.clear();
    return response;
  },
  error => {
    Toast.clear();
    // store.commit('updateLoadingStatus', {isLoading: false})
    return Promise.reject(error)
  }
)

/**
 * 封装get方法
 * @param url
 * @param data
 * @returns {Promise}
 */

export function get(url,params={}){
  return new Promise((resolve,reject) => {

    axios.get(url,{
      params:params
    })
      .then(response => {
        resolve(response.data);
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(suburl,data = {},config=null){
  return new Promise((resolve,reject) => {
    let url = "/wechat.php/" + suburl
    axios.post(url,data,config)
      .then(response => {
        if(response.data.code == 1){
          resolve(response.data);
        }else{
          Toast(response.data.message);
          reject()
        }
      },err => {
        reject(err)
      })
  })
}
