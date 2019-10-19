import moment from "moment";

const getters = {
  loadingData: state => state.app.loadingData,

  // Campaign
  campaignsFormatDate: state => {
    return state.campaign.campaigns.map(el => {
      el.startedDate = moment(String(el.startedDate)).format(
        "YYYY-MM-DD hh:mm"
      );
      el.endDate = moment(String(el.endDate)).format("YYYY-MM-DD hh:mm");
      return el;
    });
  },

  //Select
  listTags: state => state.select.tags,
  listCustomers: state => state.select.customers,
  listEditors: state => state.select.editors
};
export default getters;
