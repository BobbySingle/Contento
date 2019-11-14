import axios from "axios";
const API_URL = "http://35.247.168.237:8760/contentproccessservice";

if (localStorage.getItem("ProfileUser") != null) {
    let user = JSON.parse(localStorage.getItem("ProfileUser").toString());
    axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
}

export function APIcreateCookie(data) {
    axios.defaults.withCredentials = true;
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.crossDomain = true;
    return axios.get(`${API_URL}/api/contentprocess/cookies/viewer?key=${data.key}&value=${data.value}`);
}
export function APIgetContent(userID) {
    axios.defaults.xsrfCookieName = "csrftoken";
    axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";
    axios.defaults.crossDomain = true;
    if (userID == undefined) {
        return axios.get(`${API_URL}/api/contentprocess/content/viewer`);
    }
    return axios.get(`${API_URL}/api/contentprocess/content/viewer/?id=${userID}`);

}
export function APIgetTags() {
    return axios.get(`${API_URL}/api/contentprocess/tags`);
}
export function APIgetNewsDetails(news_id) {
    return axios.get(`${API_URL}/api/contentprocess/content-detail/viewer/${news_id}`);
}

