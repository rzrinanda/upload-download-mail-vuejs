import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import axios from 'axios';

export default new Vuex.Store({
  state: {
    show_sidebar: true
  },
  mutations: {
    toggleSidebar(state){
      state.show_sidebar = !state.show_sidebar
    }
  },
  actions: {
  },
  modules: {
  }
})
