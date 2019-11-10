import axios from "axios";

const API_URL = "http://35.247.168.237:8760/authenticationservice";

if (localStorage.getItem("Profile") != null) {
  let user = JSON.parse(localStorage.getItem("Profile").toString());
  axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
}

export function APIlogin(email, password) {
  return axios.post(`${API_URL}/api/authentication/login`, {
    email,
    password
  });
}

export function APIgetListCustomerByMarketerID(userid) {
  return axios.get(
    `${API_URL}/api/authentication/customers/marketers-basic/${userid}`
  );
}
export function APIgetListCustomerByEditorID(userid) {
  return axios.get(
    `${API_URL}/api/authentication/customer/editor/${userid}`
  );
}

export function APIgetListInfoCustomer(userid) {
  return axios.get(
    `${API_URL}/api/authentication/customers/marketers/${userid}`
  );
}

export function APIgetListEditorByMarketerID(userid) {
  return axios.get(
    `${API_URL}/api/authentication/editors/marketers/${userid}`
  );
}
export function APIcreateCustomer(customer) {
  return axios.post(
    `${API_URL}/api/authentication/customers`,
    customer
  );
}
export function APIeditCustomer(customer) {
  return axios.put(
    `${API_URL}/api/authentication/customers`,
    customer
  );
}
export function APIgetListWriter(userid) {
  return axios.get(
    `${API_URL}/api/authentication/writers/editors/${userid}`
  );
}
export function APIgetListWriterByMarketerID(userid) {
  return axios.get(
    `${API_URL}/api/authentication/writer/marketers/${userid}`
  );
}

export function APIgetCustomerDetailByCustomerID(customerid) {
  return axios.get(
    `${API_URL}/api/authentication/customer-detail/${customerid}`
  );
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
