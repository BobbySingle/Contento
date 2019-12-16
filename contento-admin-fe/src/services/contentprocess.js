import axios from "axios";

const API_URL = "http://35.247.168.237:8760/contentproccessservice";

// test
// const API_URL = "http://34.87.31.23:5002";

if (localStorage.getItem("Profile") != null) {
  let user = JSON.parse(localStorage.getItem("Profile").toString());
  axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
}

export function APIgetListTag() {
  return axios.get(`${API_URL}/api/contentprocess/tags`);
}

export function APIgetListCampaignTask(campaignID) {
  return axios.get(`${API_URL}/api/contentprocess/task/campaign/${campaignID}`);
}

export function APIgetTaskDetail(contentID) {
  return axios.get(
    `${API_URL}/api/contentprocess/task-detail/campaign/${contentID}`
  );
}

export function APIgetListTaskByMarketerID(userID) {
  return axios.get(`${API_URL}/api/contentprocess/task/marketer/${userID}`);
}

export function APIcreateTask(task) {
  return axios.post(`${API_URL}/api/contentprocess/task`, task);
}

export function APIdeleteTaskByID(taskID) {
  return axios.delete(`${API_URL}/api/contentprocess/task/campaign/${taskID}`);
}

export function APIeditTaskByID(task) {
  return axios.put(`${API_URL}/api/contentprocess/task`, task);
}

export function APIgetListTagByCampaignID(campaignID) {
  return axios.get(`${API_URL}/api/contentprocess/tags/campaign/${campaignID}`);
}
export function APIgetTaskDetailUpdate(taskID) {
  return axios.get(
    `${API_URL}/api/contentprocess/task-detail-update/campaign/${taskID}`
  );
}
export function APIgetContentRequest(userId) {
  return axios.get(`${API_URL}/api/contentprocess/task/editor/${userId}`);
}

export function APIsetApprovalContentRequest(content) {
  return axios.post(`${API_URL}/api/contentprocess/approvals`, content);
}

export function APIgetTaskByWriterId(userId) {
  return axios.get(`${API_URL}/api/contentprocess/task/writer/${userId}`);
}

export function APIstartTask(taskID) {
  return axios.put(
    `${API_URL}/api/contentprocess/content/task/campaign/start`,
    taskID
  );
}

export function APIsaveContent(content) {
  return axios.put(
    `${API_URL}/api/contentprocess/content/task/campaign`,
    content
  );
}

export function APIsubmitContent(content) {
  return axios.put(
    `${API_URL}/api/contentprocess/content/task/campaign/submit`,
    content
  );
}

export function APIgetListTaskByEditorID(editorID) {
  return axios.get(`${API_URL}/api/contentprocess/all-task/editor/${editorID}`);
}

export function APIgetListStatusTask() {
  return axios.get(`${API_URL}/api/contentprocess/status/task`);
}

export function APIgetListStatusCampaign() {
  return axios.get(`${API_URL}/api/contentprocess/status/campaign`);
}

export function APIgetListStatusPublish() {
  return axios.get(`${API_URL}/api/contentprocess/status-publish/task`);
}
export function APIgetStatisticsOneWeek() {
  return axios.get(`${API_URL}/api/contentprocess/statistics-one-week`);
}
export function APIgetStatisticsOneMonth(number) {
  return axios.get(`${API_URL}/api/contentprocess/statistics-one-month`);
}
export function APIgetStatisticsByTag(tagNumber) {
  return axios.get(
    `${API_URL}/api/contentprocess/statistics-by-tag/${tagNumber}`
  );
}
export function APIgetStatisticsByTagMonth(data) {
  return axios.post(
    `${API_URL}/api/contentprocess/statistics-by-tag-month`,
    data
  );
}
export function APIgetStatisticsTrend() {
  return axios.get(`${API_URL}/api/contentprocess/statistics-task-trend`);
}
export function APIgetStatisticsTrendMonth() {
  return axios.get(`${API_URL}/api/contentprocess/statistics-task-trend-month`);
}
export function APIgetStatisticsCampaign(idCampaign) {
  return axios.get(`${API_URL}/api/contentprocess/statistics-task-campaignid/${idCampaign}`);
}

