import axios from "axios";

const API_URL = "http://35.247.168.237:8760/campaignservice";

if (localStorage.getItem("Profile") != null) {
  let user = JSON.parse(localStorage.getItem("Profile").toString());
  axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
}

export function APIgetListCampaign(userID) {
  return axios.get(
    `${API_URL}/api/campaign/campaigns/marketers/${userID}`
  );
}

export function APIcreateCampaign(campaign) {
  return axios.post(`${API_URL}/api/campaign/campaign`, campaign);
}

export function APIeditCampaign(campaign) {
  return axios.put(`${API_URL}/api/campaign/campaign`, campaign);
}

export function APIgetDetailCampaign(campaignID) {
  return axios.get(
    `${API_URL}/api/campaign/campaigns/${campaignID}`
  );
}
export function APIgetListCampaignByCustomerID(customerID) {
  return axios.get(
    `${API_URL}/api/campaign/campaigns/customers/${customerID}`
  );
}
export function APIgetListCampaignByEditorID(editorID) {
  return axios.get(
    `${API_URL}/api/campaign/campaigns/editor/${editorID}`
  );
}

export function APIgetListFilterCampaignByEditorID(editorID) {
  return axios.get(
    `${API_URL}/api/campaign/campaigns-basic/editor/${editorID}`
  );
}
export function APIgetListFilterCampaignByWriterID(writerID) {
  return axios.get(
    `${API_URL}/api/campaign/campaigns-basic/writer/${writerID}`
  );
}
export function APIgetStatisticsByCustomer(idCustomer) {
  return axios.get(`${API_URL}/api/campaign/campaigns-statics/customer/${idCustomer}`);
}
export function APIgetStatisticsTotalCampaign(data) {
  return axios.post(`${API_URL}/api/campaign/campaigns-total-statics/customer`,data);
}