import axios from "axios";

const API_URL ="http://35.247.168.237:8760/campaignservice";

if (localStorage.getItem("Profile") != null) {
  let user = JSON.parse(localStorage.getItem("Profile").toString());
  axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
}

export function getListCampaign(userID) {
  return axios.get(
    `${API_URL}/api/campaign/campaigns/marketers/${userID}`
  );
}

export function createCampaign(campaign) {
  return axios.post(`${API_URL}/api/campaign/campaign`, campaign);
}

export function editCampaign(campaign) {
  return axios.put(`${API_URL}/api/campaign/campaign`, campaign);
}

export function getDetailCampaign(campaignID) {
  return axios.get(
    `${API_URL}/api/campaign/campaigns/${campaignID}`
  );
}
export function getListCampaignByCustomerID(customerID) {
  return axios.get(
    `${API_URL}/api/campaign/campaigns/customers/${customerID}`
  );
}
export function getListCampaignByEditorID(editorID) {
  return axios.get(
    `${API_URL}/api/campaign/campaigns/editor/${editorID}`
  );
}

export function getListFilterCampaignByEditorID(editorID) {
  return axios.get(
    `${API_URL}/api/campaign/campaigns-basic/editor/${editorID}`
  );
}
export function getListFilterCampaignByWriterID(writerID) {
  return axios.get(
    `${API_URL}/api/campaign/campaigns-basic/writer/${writerID}`
  );
}
