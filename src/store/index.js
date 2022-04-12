import Vue from 'vue'
import Vuex from 'vuex'
import post from './post'
import category from './category'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    post,
    category,
  }
})

export default store
