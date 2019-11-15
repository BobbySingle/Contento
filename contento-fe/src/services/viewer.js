import axios from "axios";
const API_URL = "http://35.247.168.237:8760/contentproccessservice";

if (localStorage.getItem("ProfileUser") != null) {
    let user = JSON.parse(localStorage.getItem("ProfileUser").toString());
    axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
}

export function APIcreateCookie(data) {
    return axios.get(`${API_URL}/api/contentprocess/cookies/viewer?key=${data.key}&value=${data.value}`);
}
export function APIgetContent(data) {
    return axios.post(`${API_URL}/api/contentprocess/content/viewer`, data);

}
export function APIgetTags() {
    return axios.get(`${API_URL}/api/contentprocess/tags`);
}

export function APIgetNewsDetails(news_id) {
    return axios.get(`${API_URL}/api/contentprocess/content-detail/viewer/${news_id}`);
}

export function APIgetTrends() {
    return axios.get(`${API_URL}/api/contentprocess/content/trends`);
}
export function APIgetAds() {
    return axios.get(`${API_URL}/api/contentprocess/content/ads`);
}
export function APIgetNewsByTags(tagId) {
    return axios.get(`${API_URL}/api/contentprocess/content/tag/${tagId}`);
}
export function APICountContent(data) {
    return axios.put(`${API_URL}/api/contentprocess/count-content`, data);
}
export function APIrecommend(userID) {
    return axios.get(`${API_URL}/api/contentprocess/content/recommend/${userID}`);
}
