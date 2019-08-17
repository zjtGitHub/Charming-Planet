import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Ad from '@/pages/Ad'
import Invite from '@/pages/Invite'
import Lower from '@/pages/Lower'
import About from '@/pages/About'
import Record from '@/pages/Record'
import Mine from '@/pages/Mine'
import Search from '@/pages/Search'
import Register from '@/pages/Register'
import VipBuy from '@/pages/vip/Buy'
import VipHistory from '@/pages/vip/History'
import VipInterest from '@/pages/vip/Interest'
import PictureList from '@/pages/PictureList'
import OfflineList from '@/pages/offline/OfflineList'
import OfflineDetail from '@/pages/offline/OfflineDetail'
import PictureDetail from '@/pages/PictureDetail'
import MyIntegralDetail from '@/pages/IntegralDetail'
import Logistics from '@/pages/integral/Logistics'
import IntegralHome from '@/pages/integral/index'
import IntegralDetail from '@/pages/integral/detail'
import IntegralList from '@/pages/integral/list'
import IntegralBuy from '@/pages/integral/buy'
import IntegralOrderList from '@/pages/integral/order/list'
import IntegralOrderDetail from '@/pages/integral/order/detail'
import IntegralAddressList from '@/pages/integral/address/list'
import IntegralAddressEdit from '@/pages/integral/address/edit'

import wx from "../wx"
import store from '../store'
import VueCookies from 'vue-cookies'
import axios from 'axios'
import {post} from '../http/'

Vue.use(Router)
let router = new Router({
    mode: 'history',
    base: '/vue/dist/',
    routes: [
        {
            path: "/",
            redirect: "/home",
        },
        {
            path: "*",
            redirect: "/home",
        },
        //首页
        {
            path: '/home',
            name: 'home',
            component: Home
        },
        //我的
        {
            path: '/mine',
            name: 'mine',
            component: Mine
        },
        //广告
        {
            path: '/ad',
            name: 'ad',
            component: Ad
        },
        //关于我们
        {
            path: '/about',
            name: 'about',
            component: About
        },
        //我的推荐码
        {
            path: '/invite',
            name: 'invite',
            component: Invite
        },
        //注册
        {
            path: '/register',
            name: 'register',
            component: Register
        },
        //搜索页
        {
            path: '/search',
            name: 'search',
            component: Search
        },

        //线下列表
        {
            path: '/offline_list',
            name: 'offline_list',
            component: OfflineList
        },
        //线下详情
        {
            path: '/offline_detail',
            name: 'offline_detail',
            component: OfflineDetail
        },
        //绘本列表
        {
            path: '/picture_list',
            name: 'picture_list',
            component: PictureList
        },
        //绘本详情
        {
            path: '/picture_detail',
            name: 'picture_detail',
            component: PictureDetail
        },
        //会员购买
        {
            path: '/vip/buy',
            name: 'vip_buy',
            component: VipBuy
        },
        //会员购买历史
        {
            path: '/vip/history',
            name: 'vip_history',
            component: VipHistory
        },
        //会员权益
        {
            path: '/vip/interest',
            name: 'vip_interest',
            component: VipInterest
        },
        //观看历史
        {
            path: '/record',
            name: 'record',
            component: Record
        },
        //我的下级
        {
            path: '/lower',
            name: 'lower',
            component: Lower
        },
        //积分明细
        {
            path: '/my_integral_detail',
            name: 'my_integral_detail',
            component: MyIntegralDetail
        },
        //积分明细
        {
            path: '/integral_logistics',
            name: 'Logistics',
            component: Logistics
        },
        //积分商城 首页
        {
            path: '/integral/home',
            name: 'integral_home',
            component: IntegralHome
        },
        //积分商城 分类列表
        {
            path: '/integral_list',
            name: 'integral_list',
            component: IntegralList
        },
        //积分商城 商品详情
        {
            path: '/integral_detail',
            name: 'integral_detail',
            component: IntegralDetail
        },
        //积分商城 下单
        {
            path: '/integral_buy',
            name: 'integral_buy',
            component: IntegralBuy,
            meta: {
                keepAlive: true
            }
        },
        //积分商城 订单列表
        {
            path: '/integral_order_list',
            name: 'integral_order_list',
            component: IntegralOrderList
        },
        //积分商城 订单详情
        {
            path: '/integral_order_detail',
            name: 'integral_order_detail',
            component: IntegralOrderDetail
        },
        //积分商城 地址列表
        {
            path: '/integral_address_list',
            name: 'integral_address_list',
            component: IntegralAddressList
        },
        //积分商城 地址编辑
        {
            path: '/integral_address_edit',
            name: 'integral_address_edit',
            component: IntegralAddressEdit
        },

    ]
})
router.beforeEach((to, from, next) => {
    //防止在他人页面看到我的消息
    // if (to.path === "/his") {
    //   if (to.query.openid === localStorage.openid) {
    //     next({path: "/main"})
    //   }
    // }
    wx.init().then(user => {
        localStorage.openid = user.openid;
        // VueCookies.set("openid",user.openid);
        // store.commit('user/setUser', user);

    }).catch(() => {

    }).finally(() => {
        console.log(to.path);
        store.commit('user/setOpenid');
        if (to.path !== "/ad") {
            post("Vip/getUserInfo", {openid: localStorage.openid}).then(res => {
                store.commit('user/setUser', res.data);
                if (res.data.is_reg == 1) {
                    if (to.path !== "/register") {
                        next({path: "/register"})
                    } else {
                        next()
                    }
                } else {
                    if (to.path === "/register") {
                        next({path: "/home"})
                    } else {
                        next()
                    }
                }
            })
        } else {
            next()
        }


    })
});
router.afterEach((to, from, next) => {

})

export default router
