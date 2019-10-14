import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home/index.vue";
import CampaignManagement from "../views/Marketer/CampaignManagement/index.vue";
import CampaignRequest from "../views/Editor/CampaignRequest/index.vue";
import TaskManagement from "../views/Writer/TaskManagement/index.vue";
import CampaignDetails from "../views/Marketer/CampaignDetails/index.vue"
import PublishChannel from "../views/Marketer/PublishChannel/index.vue"
import Calendar from "../views/Marketer/Calendar/index.vue"
import ContentManagement from "../views/Marketer/ContentManagement/index.vue";
import CustomerManagement from "../views/Marketer/CustomerManagement/index.vue";
import CustomerCampaigns from "../views/Marketer/CustomerCampaigns/index.vue"

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
    {
      path: "/CampaignDetails",
      name: "CampaignDetails",
      component: CampaignDetails
    },
    {
      path: "/PublishChannel",
      name: "PublishChannel",
      component: PublishChannel
    },
    {
      path: "/Calendar",
      name: "Calendar",
      component: Calendar
    },
    {
      path: "/ContentManagement",
      name: "ContentManagement",
      component: ContentManagement
    },
    {
      path: "/CustomerManagement",
      name: "CustomerManagement",
      component: CustomerManagement
    },
    {
      path: "/CustomerCampaigns",
      name: "CustomerCampaigns",
      component: CustomerCampaigns
    },
  ]
});
