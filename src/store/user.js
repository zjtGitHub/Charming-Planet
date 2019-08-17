//一些基本配置
const state = {
    user_id: 0,
    address_id: -1,
    openid: localStorage.getItem("openid"),
    ad:sessionStorage.getItem("ad") ||  0,
};
const mutations = {
    setAddressId(state, val) {
        state.address_id = val
    },
    setUser(state, data) {
        state.user_id = data.user_id

    },
    setOpenid(state){
        state.openid = localStorage.getItem("openid")
    },
    setAd(state){
        sessionStorage.setItem("ad",1);
        state.ad = 1
    },
};

export default {
    namespaced: true,
    state,
    mutations
}
