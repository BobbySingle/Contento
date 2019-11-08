import axios from "axios";

const API_URL ="http://35.247.168.237:8760/batchjobservice";

if (localStorage.getItem("Profile") != null) {
    let user = JSON.parse(localStorage.getItem("Profile").toString());
    axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
}

export function publishContent(data) {
    return axios.post(`${API_URL}/api/BatchJob/publish`, data);
}

export function getFanPages(userID) {
    return axios.get(`${API_URL}/api/BatchJob/fanpages/${userID}`);
}

export function getFanPage(fanpageID) {
    return axios.get(`${API_URL}/api/BatchJob/fanpage-detail/${fanpageID}`);
}

export function createFanPage(data) {
    return axios.post(`${API_URL}/api/BatchJob/fanpages`, data);
}

export function editFanPage(data) {
    return axios.put(`${API_URL}/api/BatchJob/fanpages`, data);
}

export function deleteFanPage(fanpageID) {
    return axios.delete(`${API_URL}/api/BatchJob/fanpages/${fanpageID}`);
}

export function getFanPageFacebook(marketerId) {
    return axios.get(`${API_URL}/api/BatchJob/fanpages/marketer/2/${marketerId}`);
}

export function getFanPageWordpress(marketerId) {
    return axios.get(`${API_URL}/api/BatchJob/fanpages/marketer/3/${marketerId}`);
}

export function getFanPageCustomer(customerId) {
    return axios.get(`${API_URL}/api/BatchJob/fanpages/customer/${customerId}`);
}

export function getFanPagesByContentID(contentID) {
    return axios.get(`${API_URL}/api/BatchJob/taskfanpages/content/${contentID}`);
}