import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import vuetify from "./plugins/vuetify";
import VueMoment from 'vue-moment'
import axios from './plugins/axios'
 

import './plugins/index'

import { Datetime } from 'vue-datetime';
Vue.component('datetime', Datetime);
Vue.use(VueMoment);
Vue.use(axios)

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");
