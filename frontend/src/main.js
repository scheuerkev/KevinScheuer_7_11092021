import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import store from './store'
import router from './router'

//Importing Moment.js package to easily format each type of Dates entries
import moment from 'moment'
moment.locale('fr');

Vue.config.productionTip = false

//Instancing Vue.js with combo vuetify x vuexStore x vueRouter
new Vue({
  vuetify,
  store,
  router,
  render: h => h(App)
}).$mount('#app')


//Setting two filters to format dates types with or without hours
Vue.filter('formatDate', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY')
  }
})

Vue.filter('formatDateHour', function(value) {
  if (value) {
    return moment(String(value)).format('DD/MM/YYYY à HH:mm')
  }
})