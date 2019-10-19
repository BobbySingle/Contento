import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home/index.vue";
import CampaignManagement from "../views/Marketer/CampaignManagement/index.vue";
Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home,
    },
    {
      path: "/CampaignManagement",
      name: "CampaignManagement",
      component: CampaignManagement
    }   
  ]
});
