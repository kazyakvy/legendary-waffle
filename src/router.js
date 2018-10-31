import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from './components/Main.vue'
import Table from './components/Table.vue'

Vue.use(VueRouter);

let routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/table',
    component: Table
  }
];

let router = new VueRouter({
  routes,
  mode: 'history',
  linkActiveClass: 'is-open',
  linkExactActiveClass: 'is-active'
});

export default router;