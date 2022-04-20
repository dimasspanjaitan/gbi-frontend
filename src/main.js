import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import Toast from 'vue-toastification'
import moment from 'moment'
import VuetifyDialog from 'vuetify-dialog'

import "vue-toastification/dist/index.css"
import 'vuetify-dialog/dist/vuetify-dialog.css'

Vue.config.productionTip = false
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD-MM-YYYY')
  }
});

Vue.use(Toast)
Vue.use(VuetifyDialog, {
  context: {
    vuetify
  }
})

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount('#app')
