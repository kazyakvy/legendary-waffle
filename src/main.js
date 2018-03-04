import Vue from 'vue'
import App from './App.vue'
import router from './router'

import styles from './assets/styles.sass'

new Vue({
  el: '#app',
  render: h => h(App),
  router
})
