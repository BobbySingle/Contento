import Vue from "vue";
import Router from "vue-router";
import Home from "../views/Home/index.vue";
import ManageCampaign from "../views/Marketer/ManageCampaign/index.vue";
import TaskManagement from "../views/Writer/TaskManagement/index.vue";
import WriteContent from "../views/Writer/WriteContent/index.vue";
import CampaignDetails from "../views/Marketer/CampaignDetails/index.vue";
import PublishChannel from "../views/Marketer/PublishChannel/index.vue";
import ManageChannel from "../views/Marketer/ManageChannel/index.vue";
import Calendar from "../views/Marketer/Calendar/index.vue";
import ManagePublish from "../views/Marketer/ManagePublish/index.vue";
import ContentPublishDetail from "../views/Marketer/ContentPublishDetail/index.vue";
import ManageCustomer from "../views/Marketer/ManageCustomer/index.vue";
import CustomerCampaigns from "../views/Marketer/CustomerCampaigns/index.vue";
import Page403 from "../views/Error/Page403.vue";
import CampaignRequest from "../views/Editor/CampaignRequest/index.vue";
import ApproveRequest from "../views/Editor/ApproveRequest/index.vue";
import CampaignRequestDetails from "../views/Editor/CampaignRequestDetails/index.vue";
import ReviewContent from "../views/Editor/ReviewContent/index.vue";
import ManageTask from "../views/Editor/ManageTask/index.vue";
import Profile from "../components/Profile/index.vue";
import ManageSystemAccount from "../views/Admin/ManageSystemAccount/index.vue";
import ManageContentFanpage from "../views/Marketer/ManageContentFanpage/index.vue";
import ManageFreelanceAccount from "../views/Admin/ManageFreelanceAccount/index.vue";
import ManageViewerAccount from "../views/Admin/ManageViewerAccount/index.vue";
import Statistics from "../views/Marketer/Statistics/index.vue";

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
      path: "/403",
      name: "Access Denied",
      component: Page403,
    },
    /**Profile */
    {
      path: "/Profile",
      name: "Profile",
      component: Profile,
    },
    /** Marketer */
    {
      path: "/ManageCampaign",
      name: "ManageCampaign",
      component: ManageCampaign
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
      path: "/ManageChannel",
      name: "ManageChannel",
      component: ManageChannel
    },
    {
      path: "/Calendar",
      name: "Calendar",
      component: Calendar
    },
    {
      path: "/ManagePublish",
      name: "ManagePublish",
      component: ManagePublish
    },
    {
      path: "/ManageCustomer",
      name: "ManageCustomer",
      component: ManageCustomer
    },
    {
      path: "/CustomerCampaigns",
      name: "CustomerCampaigns",
      component: CustomerCampaigns
    },
    {
      path: "/ManageContentFanpage",
      name: "ManageContentFanpage",
      component: ManageContentFanpage
    },
    {
      path: "/ContentPublishDetail",
      name: "ContentPublishDetail",
      component: ContentPublishDetail
    },
    {
      path: "/Statistics",
      name: "Statistics",
      component: Statistics
    },
    /**Editor */
    {
      path: "/CampaignRequest",
      name: "CampaignRequest",
      component: CampaignRequest
    },
    {
      path: "/ApproveRequest",
      name: "ApproveRequest",
      component: ApproveRequest
    },
    {
      path: "/CampaignRequestDetails",
      name: "CampaignRequestDetails",
      component: CampaignRequestDetails
    },
    {
      path: "/ReviewContent",
      name: "ReviewContent",
      component: ReviewContent
    },
    {
      path: "/ManageTask",
      name: "ManageTask",
      component: ManageTask
    },
    /**Writer */
    {
      path: "/TaskManagement",
      name: "TaskManagement",
      component: TaskManagement
    },
    {
      path: "/WriteContent",
      name: "WriteContent",
      component: WriteContent
    },
    /**Admin */
    {
      path: "/ManageSystemAccount",
      name: "ManageSystemAccount",
      component: ManageSystemAccount
    },
    {
      path: "/ManageFreelanceAccount",
      name: "ManageFreelanceAccount",
      component: ManageFreelanceAccount
    },
    {
      path: "/ManageViewerAccount",
      name: "ManageViewerAccount",
      component: ManageViewerAccount
    },
  ]
});
