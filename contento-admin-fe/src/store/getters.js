import moment from "moment";

const getters = {
  //Authentication
  getAccessToken: state => state.authentication.access_token,
  getUser: state => state.authentication.user,
  loggedUser: state => state.authentication.loggedUser,

  //Campaign
  listCampaign: state => state.campaign.listCampaign,
  detailCampaign: state => state.campaign.detailCampaign,

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

  //Dataform
  listCustomer: state => state.dataform.listCustomer,
  listEditor: state => state.dataform.listEditor,
  listTag: state => state.dataform.listTag
};
export default getters;
