import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/Home'
import Rank from '@/pages/Rank/Rank'
import Topic from '@/pages/Topic/Topic'
import Mine from '@/pages/Mine'
import wx from "../wx"
import store from '../store'
import VueCookies from 'vue-cookies'
import axios from 'axios'
import {post} from '../http/'

Vue.use(Router)
let router = new Router({
    // mode: 'history',
    base: '/',
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
		{
		    path: '/topic',
		    name: 'topic',
		    component: Topic
		},
		{
		    path: '/rank',
		    name: 'rank',
		    component: Rank
		},
		{
		    path: '/mine',
		    name: 'mine',
		    component: Mine
		},
		

    ]
})


export default router
