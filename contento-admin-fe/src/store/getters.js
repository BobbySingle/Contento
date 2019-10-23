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

  //Campaign
  listCampaign: state => state.campaign.listCampaign,
  detailCampaign: state => state.campaign.detailCampaign,
  listCampaignByCustomerID: state => state.campaign.listCampaignByCustomerID,
  listCampaignByEditorID: state => state.campaign.listCampaignByEditorID,

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
};
export default getters;
