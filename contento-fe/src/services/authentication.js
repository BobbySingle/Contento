import axios from "axios";

const API_URL = "http://35.247.168.237:8760/authenticationservice";

if (localStorage.getItem("ProfileUser") != null) {
  let user = JSON.parse(localStorage.getItem("ProfileUser").toString());
  axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
}

export function APIlogin(email, password) {
  return axios.post(`${API_URL}/api/authentication/login-viewer`, {
    email,
    password
  });
}
export function APIregister(data) {
  return axios.post(`${API_URL}/api/authentication/register`, data);
}

export function APIgetProfileInfo(userid) {
  return axios.get(
    `${API_URL}/api/authentication/profile/${userid}`
  );
}

export function APIeditProfileInfo(data) {
  return axios.put(
    `${API_URL}/api/authentication/profile`, data
  );
}
export function APIcheckPassword(data) {
  return axios.post(
    `${API_URL}/api/authentication/check-password`, data
  );
}

export function APIchangePassword(data) {
  return axios.put(
    `${API_URL}/api/authentication/change-password`, data
  );
}