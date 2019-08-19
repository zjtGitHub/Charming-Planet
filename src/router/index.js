import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'


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

    ]
})


export default router
