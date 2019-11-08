import axios from "axios";

const API_URL ="http://35.247.168.237:8760/batchjobservice";

if (localStorage.getItem("Profile") != null) {
    let user = JSON.parse(localStorage.getItem("Profile").toString());
    axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
}

export function APIpublishContent(data) {
    return axios.post(`${API_URL}/api/BatchJob/publish`, data);
}

export function APIgetFanPages(userID) {
    return axios.get(`${API_URL}/api/BatchJob/fanpages/${userID}`);
}

export function APIgetFanPage(fanpageID) {
    return axios.get(`${API_URL}/api/BatchJob/fanpage-detail/${fanpageID}`);
}

export function APIcreateFanPage(data) {
    return axios.post(`${API_URL}/api/BatchJob/fanpages`, data);
}

export function APIeditFanPage(data) {
    return axios.put(`${API_URL}/api/BatchJob/fanpages`, data);
}

export function APIdeleteFanPage(fanpageID) {
    return axios.delete(`${API_URL}/api/BatchJob/fanpages/${fanpageID}`);
}

export function APIgetFanPageFacebook(marketerId) {
    return axios.get(`${API_URL}/api/BatchJob/fanpages/marketer/2/${marketerId}`);
}

export function APIgetFanPageWordpress(marketerId) {
    return axios.get(`${API_URL}/api/BatchJob/fanpages/marketer/3/${marketerId}`);
}

export function APIgetFanPageCustomer(customerId) {
    return axios.get(`${API_URL}/api/BatchJob/fanpages/customer/${customerId}`);
}

export function APIgetFanPagesByContentID(contentID) {
    return axios.get(`${API_URL}/api/BatchJob/taskfanpages/content/${contentID}`);
}