import axios from "axios";
const API_URL ="http://35.247.168.237:8760/contentproccessservice";

if (localStorage.getItem("Profile") != null) {
    let user = JSON.parse(localStorage.getItem("Profile").toString());
    axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
}

export function createCookie(data) {
    axios.defaults.withCredentials = true;
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.crossDomain = true;
    return axios.get(`${API_URL}/api/contentprocess/cookies/viewer?key=${data.key}&value=${data.value}`);
}
export function getContent() {
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.crossDomain = true;
    return axios.get(`${API_URL}/api/contentprocess/content/viewer`);
}
export function getTags() {
    return axios.get(`${API_URL}/api/contentprocess/tags`);
}
export function getNewsDetails(news_id) {
    return axios.get(`${API_URL}/api/contentprocess/content-detail/viewer/${news_id}`);
}
