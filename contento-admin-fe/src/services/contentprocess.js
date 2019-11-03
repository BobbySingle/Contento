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

export function getListTaskByMarketerID(userID) {
  return axios.get(
    `http://34.87.31.23:5002/api/contentprocess/task/marketer/${userID}`
  );
}

export function createTask(task) {
  return axios.post(`http://34.87.31.23:5002/api/contentprocess/task`, task);
}

export function deleteTaskByID(taskID) {
  return axios.delete(
    `http://34.87.31.23:5002/api/contentprocess/task/campaign/${taskID}`
  );
}

export function editTaskByID(task) {
  return axios.put(`http://34.87.31.23:5002/api/contentprocess/task`, task);
}

export function getListTagByCampaignID(campaignID) {
  return axios.get(
    `http://34.87.31.23:5002/api/contentprocess/tags/campaign/${campaignID}`
  );
}
export function getTaskDetailUpdate(taskID) {
  return axios.get(
    `http://34.87.31.23:5002/api/contentprocess/task-detail-update/campaign/${taskID}`
  );
}
export function getContentRequest(userId) {
  return axios.get(
    `http://34.87.31.23:5002/api/contentprocess/task/editor/${userId}`
  );
}

export function setApprovalContentRequest(content) {
  return axios.post('http://34.87.31.23:5002/api/contentprocess/approvals', content)
}

export function getTaskByWriterId(userId) {
  return axios.get(
    `http://34.87.31.23:5002/api/contentprocess/task/writer/${userId}`
  );
}

export function startTask(taskID) {
  return axios.put(
    `http://34.87.31.23:5002/api/contentprocess/content/task/campaign/start`, taskID
  );
}

export function saveContent(content) {
  return axios.put(`http://34.87.31.23:5002/api/contentprocess/content/task/campaign`, content);
}

export function submitContent(content) {
  return axios.put(`http://34.87.31.23:5002/api/contentprocess/content/task/campaign/submit`, content);
}

export function getListTaskByEditorID(editorID) {
  return axios.get(`http://34.87.31.23:5002/api/contentprocess/all-task/editor/${editorID}`);
}

export function getListStatusTask() {
  return axios.get(`http://34.87.31.23:5002/api/contentprocess/status/task`);
}

export function getListStatusCampaign() {
  return axios.get(`http://34.87.31.23:5002/api/contentprocess/status/campaign`);
}
export function getListStatusPublish() {
  return axios.get(`http://34.87.31.23:5002/api/contentprocess/status-publish/task`);
}