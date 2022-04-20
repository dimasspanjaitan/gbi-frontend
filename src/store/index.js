import Vue from 'vue'
import Vuex from 'vuex'
import post from './post'
import category from './category'
import musing from './musing'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    post,
    category,
    musing,
  }
})

export default store
