import axios from "axios";

if (localStorage.getItem("Profile") != null) {
  let user = JSON.parse(localStorage.getItem("Profile").toString());
  axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
}

export function getListCampaign(userID) {
  return axios.get(
    `http://34.87.31.23:5001/api/campaign/campaigns/marketers/${userID}`
  );
}

export function createCampaign(campaign) {
  return axios.post(`http://34.87.31.23:5001/api/campaign/campaign`, campaign);
}

export function editCampaign(campaign) {
  return axios.put(`http://34.87.31.23:5001/api/campaign/campaign`, campaign);
}

export function getDetailCampaign(campaignID) {
  return axios.get(
    `http://34.87.31.23:5001/api/campaign/campaigns/${campaignID}`
  );
}
export function getListCampaignByCustomerID(customerID) {
  return axios.get(
    `http://34.87.31.23:5001/api/campaign/campaigns/customers/${customerID}`
  );
}
export function getListCampaignByEditorID(editorID) {
  return axios.get(
    `http://34.87.31.23:5001/api/campaign/campaigns/editor/${editorID}`
  );
}
