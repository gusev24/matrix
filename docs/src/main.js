// Import Vue
import Vue from 'vue';
import Vuex from 'vuex';
import VueRouter from 'vue-router';

// Import Vue App, routes, store
import App from './App';
import routes from './routes';
import stores from './stores';

Vue.use(VueRouter);
Vue.use(Vuex);

// Configure router
const router = new VueRouter({
  routes,
  linkActiveClass: 'active',
  mode: 'history'
});

// Configure store
const store = new Vuex.Store(stores);

new Vue({
  el: '#app',
  render: h => h(App),
  store,
  router
});