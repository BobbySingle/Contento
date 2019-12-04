import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/";
import vuetify from './plugins/vuetify.js';
import './plugins/index';
import VueAnalytics from 'vue-analytics'

Vue.use(VueAnalytics, {
  id: 'UA-153845471-1', router, checkDuplicatedScript: true,
  optimize_id: 'GTM-WZXS224',
  autoTracking: {
    pageviewOnLoad: false,
    screenview: true,
    skipSamePath: true
  }
})

import VueMoment from 'vue-moment';
Vue.use(VueMoment);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App)
}).$mount("#app");

