import moment from "moment";

const getters = {
  //Authentication
  getAccessToken: state => state.authentication.access_token,
  getUser: state => state.authentication.user,
  loggedUser: state => state.authentication.loggedUser,
  listCustomer: state => state.authentication.listCustomer,
  listEditor: state => state.authentication.listEditor,
  listInfoCustomer: state => state.authentication.listInfoCustomer,
  listWriter: state => state.authentication.listWriter,
  listWriterByMarketerID: state => state.authentication.listWriterByMarketerID,
  customerDetail: state => state.authentication.customerDetail,
  profile: state => state.authentication.profile,
  fullname: state => state.authentication.fullName,
  listAdminAccounts: state => state.authentication.listAdminAccounts,
  listMarketersBasic: state => state.authentication.listMarketersBasic,
  listEditorsBasic: state => state.authentication.listEditorsBasic,
  listWritersBasic: state => state.authentication.listWritersBasic,
  adminUserDetail: state => state.authentication.adminUserDetail,
  freelanceAccount: state => state.authentication.freelanceAccount,
  listViewerAccounts: state => state.authentication.listViewerAccounts,

  //Campaign
  listCampaign: state => state.campaign.listCampaign,
  detailCampaign: state => state.campaign.detailCampaign,
  listCampaignByCustomerID: state => state.campaign.listCampaignByCustomerID,
  listCampaignByEditorID: state => state.campaign.listCampaignByEditorID,
  listFilterCampaignByEditorID: state =>
    state.campaign.listFilterCampaignByEditorID,
  listFilterCampaignByWriterID: state =>
    state.campaign.listFilterCampaignByWriterID,

  //ContentProcess
  listCampaignTaskNotFormated: state => state.contentprocess.listCampaignTask,
  listCampaignTaskFormated: state => {
    return state.contentprocess.listCampaignTask.map(el => {
      el.name = el.title;
      el.start = moment(String(el.publishTime)).format("YYYY-MM-DD hh:mm");
      el.deadline = moment(String(el.deadline)).format("YYYY-MM-DD hh:mm");
      return el;
    });
  },
  taskDetail: state => state.contentprocess.taskDetail,
  listTag: state => state.contentprocess.listTag,
  listTaskByMarketerID: state => state.contentprocess.listTaskByMarketerID,
  listTagByCampaignID: state => state.contentprocess.listTagByCampaignID,
  taskDetailUpdate: state => state.contentprocess.taskDetailUpdate,
  listContentRequest: state => state.contentprocess.listContentRequest,
  listTaskByWriterID: state => state.contentprocess.listTaskByWriterID,
  listTaskByEditorID: state => state.contentprocess.listTaskByEditorID,
  listStatusTask: state => state.contentprocess.listStatusTask,
  listStatusCampaign: state => state.contentprocess.listStatusCampaign,
  listStatusPublish: state => state.contentprocess.listStatusPublish,
  StatisticsWeek: state => state.contentprocess.dataStatisticsOneWeek,
  StatisticsMonth: state => state.contentprocess.dataStatisticsOneMonth,
  StatisticsByTag: state => state.contentprocess.dataStatisticsByTag,
  StatisticsByTagMonth: state => state.contentprocess.dataStatisticsByTagMonth,
  StatisticsWeekTrend: state => state.contentprocess.dataStatisticsWeekTrend,
  StatisticsMonthTrend: state => state.contentprocess.dataStatisticsMonthTrend,

  //Batchjob
  fanpage: state => state.batchjob.fanpage,
  fanpages: state => state.batchjob.fanpages,
  facebook: state => state.batchjob.facebook,
  wordpress: state => state.batchjob.wordpress,
  fanpagesContent: state => state.batchjob.fanpagesContent,
  fanpagesTag: state => state.batchjob.fanpagesTag,
  linkFanpage: state => state.batchjob.link,
  listContentOfFanpage: state => state.batchjob.listContentOfFanpage,
  listInteractionFanpageByCampaign: state =>
    state.batchjob.listInteractionFanpageByCampaign
};
export default getters;
