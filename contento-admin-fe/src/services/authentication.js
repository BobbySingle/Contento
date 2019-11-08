import axios from "axios";

const API_URL ="http://35.247.168.237:8760/authenticationservice";

if (localStorage.getItem("Profile") != null) {
  let user = JSON.parse(localStorage.getItem("Profile").toString());
  axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
}

export function login(email, password) {
  return axios.post(`${API_URL}/api/authentication/login`, {
    email,
    password
  });
}

export function getListCustomerByMarketerID(userid) {
  return axios.get(
    `${API_URL}/api/authentication/customers/marketers-basic/${userid}`
  );
}
export function getListCustomerByEditorID(userid) {
  return axios.get(
    `${API_URL}/api/authentication/customer/editor/${userid}`
  );
}

export function getListInfoCustomer(userid) {
  return axios.get(
    `${API_URL}/api/authentication/customers/marketers/${userid}`
  );
}

export function getListEditorByMarketerID(userid) {
  return axios.get(
    `${API_URL}/api/authentication/editors/marketers/${userid}`
  );
}
export function createCustomer(customer) {
  return axios.post(
    `${API_URL}/api/authentication/customers`,
    customer
  );
}
export function editCustomer(customer) {
  return axios.put(
    `${API_URL}/api/authentication/customers`,
    customer
  );
}
export function getListWriter(userid) {
  return axios.get(
    `${API_URL}/api/authentication/writers/editors/${userid}`
  );
}
export function getListWriterByMarketerID(userid) {
  return axios.get(
    `${API_URL}/api/authentication/writer/marketers/${userid}`
  );
}

export function getCustomerDetailByCustomerID(customerid) {
  return axios.get(
    `${API_URL}/api/authentication/customer-detail/${customerid}`
  );
}

export function getProfileInfo(userid) {
  return axios.get(
    `${API_URL}/api/authentication/profile/${userid}`
  );
}
