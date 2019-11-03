import axios from "axios";
// import Cookie from "js-cookie";

if (localStorage.getItem("Profile") != null) {
    let user = JSON.parse(localStorage.getItem("Profile").toString());
    axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
}

export function createCookie(data) {
    axios.defaults.withCredentials = true;
    return axios.get(`http://34.87.31.23:5002/api/contentprocess/cookies/viewer?key=${data.key}&value=${data.value}`);
}
export function getContent() {
    axios.defaults.withCredentials = true;
    return axios.get(`http://34.87.31.23:5002/api/contentprocess/content/viewer`);
}
export function getTags() {   
    return axios.get(`http://34.87.31.23:5002/api/contentprocess/tags`);
}
export function getNewsDetails(news_id) {   
    return axios.get(`http://34.87.31.23:5002/api/contentprocess/content-detail/viewer/${news_id}`);
}
