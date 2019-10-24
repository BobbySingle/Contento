import axios from "axios";

if (localStorage.getItem("Profile") != null) {
    let user = JSON.parse(localStorage.getItem("Profile").toString());
    axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
}

export function publishContent(data) {
    return axios.post(`http://34.87.31.23:5004/api/BatchJob/Publish`, data);
}