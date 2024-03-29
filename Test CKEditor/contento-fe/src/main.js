import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/";
import vuetify from './plugins/vuetify.js';
import './plugins/index';

import VueMoment from 'vue-moment';
Vue.use(VueMoment);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

