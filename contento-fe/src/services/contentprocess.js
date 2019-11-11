import axios from "axios";

const API_URL ="http://35.247.168.237:8760/contentproccessservice";

if (localStorage.getItem("Profile") != null) {
  let user = JSON.parse(localStorage.getItem("Profile").toString());
  axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
}

export function APIgetListTag() {
  return axios.get(`${API_URL}/api/contentprocess/tags`);
}