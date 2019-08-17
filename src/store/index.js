import Vue from 'vue'
import Vuex from 'vuex'
import config from './config'
import user from './user'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{
    config,
    user
  }
})
