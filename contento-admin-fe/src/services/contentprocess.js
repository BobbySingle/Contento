import axios from "axios";

const API_URL ="http://35.247.168.237:8760/contentproccessservice";


if (localStorage.getItem("Profile") != null) {
  let user = JSON.parse(localStorage.getItem("Profile").toString());
  axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
}

export function getListTag() {
  return axios.get(`${API_URL}/api/contentprocess/tags`);
}

export function getListCampaignTask(campaignID) {
  return axios.get(
    `${API_URL}/api/contentprocess/task/campaign/${campaignID}`
  );
}

export function getTaskDetail(contentID) {
  return axios.get(
    `${API_URL}/api/contentprocess/task-detail/campaign/${contentID}`
  );
}

export function getListTaskByMarketerID(userID) {
  return axios.get(
    `${API_URL}/api/contentprocess/task/marketer/${userID}`
  );
}

export function createTask(task) {
  return axios.post(`${API_URL}/api/contentprocess/task`, task);
}

export function deleteTaskByID(taskID) {
  return axios.delete(
    `${API_URL}/api/contentprocess/task/campaign/${taskID}`
  );
}

export function editTaskByID(task) {
  return axios.put(`${API_URL}/api/contentprocess/task`, task);
}

export function getListTagByCampaignID(campaignID) {
  return axios.get(
    `${API_URL}/api/contentprocess/tags/campaign/${campaignID}`
  );
}
export function getTaskDetailUpdate(taskID) {
  return axios.get(
    `${API_URL}/api/contentprocess/task-detail-update/campaign/${taskID}`
  );
}
export function getContentRequest(userId) {
  return axios.get(
    `${API_URL}/api/contentprocess/task/editor/${userId}`
  );
}

export function setApprovalContentRequest(content) {
  return axios.post(`${API_URL}/api/contentprocess/approvals`, content)
}

export function getTaskByWriterId(userId) {
  return axios.get(
    `${API_URL}/api/contentprocess/task/writer/${userId}`
  );
}

export function startTask(taskID) {
  return axios.put(
    `${API_URL}/api/contentprocess/content/task/campaign/start`, taskID
  );
}

export function saveContent(content) {
  return axios.put(`${API_URL}/api/contentprocess/content/task/campaign`, content);
}

export function submitContent(content) {
  return axios.put(`${API_URL}/api/contentprocess/content/task/campaign/submit`, content);
}

export function getListTaskByEditorID(editorID) {
  return axios.get(`${API_URL}/api/contentprocess/all-task/editor/${editorID}`);
}

export function getListStatusTask() {
  return axios.get(`${API_URL}/api/contentprocess/status/task`);
}

export function getListStatusCampaign() {
  return axios.get(`${API_URL}/api/contentprocess/status/campaign`);
}
export function getListStatusPublish() {
  return axios.get(`${API_URL}/api/contentprocess/status-publish/task`);
}