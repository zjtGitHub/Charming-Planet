/**
 * 全局跳转
 * 使用方式
 * v-go="'name'"
 *
 * 也可传参数 {name:"name",query:{}}
 */
import route from "../router/"
export default {
  install(Vue){
    // 注册一个全局自定义指令 `v-go`
    Vue.directive('go', {
      // 当被绑定的元素插入到 DOM 中时……
      inserted: function (el,bingding) {
        el.onclick = (e) => {
          //阻止冒泡
          e.stopPropagation()
          if (bingding.value instanceof Object) {
            route.push({name: bingding.value.name, query: bingding.value.query});
          } else {
            route.push(bingding.value);
          }
        }
      },
      update: function (el,bingding) {
        el.onclick = (e) => {
          //阻止冒泡
          e.stopPropagation()
          if (bingding.value instanceof Object) {
            route.push({name: bingding.value.name, query: bingding.value.query});
          } else {
            route.push(bingding.value);
          }
        }
      },
    })
  }
}
