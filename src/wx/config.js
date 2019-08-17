/**
 * 微信环境配置
 *
 * @type {{test: number, apiList: string[], debug: boolean}}
 */
let wxconfig = {
  // 0 生产环境  1 发开环境
  test: 1,
  //测试用openid
  test_openid:"test",
  // 微信api权限列表
  apiList: ["chooseImage", "uploadImage", "chooseWXPay", "onMenuShareAppMessage"],
  // 是否开启微信debug
  debug: false,
};
export default wxconfig
