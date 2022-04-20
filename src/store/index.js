import Vue from 'vue'
import Vuex from 'vuex'
import post from './post'
import category from './category'
import musing from './musing'
import event from './event'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    post,
    category,
    musing,
    event,
  }
})

export default store
