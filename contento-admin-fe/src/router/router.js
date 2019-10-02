import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home/index.vue";
import CampaignManagement from "../views/Maketer/CampaignManagement/index.vue";
import CampaignRequest from "../views/Editor/CampaignRequest/index.vue";
import TaskManagement from "../views/Writer/TaskManagement/index.vue";

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
    },
    {
      path: "/CampaignRequest",
      name: "CampaignRequest",
      component: CampaignRequest
    },
    {
      path: "/TaskManagement",
      name: "TaskManagement",
      component: TaskManagement
    },
  ]
});
