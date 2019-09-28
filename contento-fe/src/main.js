import Vue from "vue";
import App from "./App.vue";
import router from "./router/router";
import store from "./store/store";
import vuetify from './plugins/vuetify/index';
import vuebar from "./plugins/vuebar/index";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  vuebar,
  render: h => h(App)
}).$mount("#app");
