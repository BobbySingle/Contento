import axios from "axios";

if (localStorage.getItem("Profile") != null) {
  let user = JSON.parse(localStorage.getItem("Profile").toString());
  axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
}

export function getListTag() {
  return axios.get(`http://34.87.31.23:5002/api/contentprocess/tags`);
}

export function getListCampaignTask(campaignID) {
  return axios.get(
    `http://34.87.31.23:5002/api/contentprocess/task/campaign/${campaignID}`
  );
}

export function getTaskDetail(contentID) {
  return axios.get(
    `http://34.87.31.23:5002/api/contentprocess/task-detail/campaign/${contentID}`
  );
}
