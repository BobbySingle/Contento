import axios from "axios";

if (localStorage.getItem("Profile") != null) {
  let user = JSON.parse(localStorage.getItem("Profile").toString());
  axios.defaults.headers.common["Authorization"] = "Bearer " + user.token;
}

export function login(email, password) {
  return axios.post(`http://34.87.31.23:5000/api/authentication/login`, {
    email,
    password
  });
}

export function getListCustomerByMarketerID(userid) {
  return axios.get(
    `http://34.87.31.23:5000/api/authentication/customers/marketers-basic/${userid}`
  );
}

export function getListInfoCustomer(userid) {
  return axios.get(
    `http://34.87.31.23:5000/api/authentication/customers/marketers/${userid}`
  );
}

export function getListEditorByMarketerID(userid) {
  return axios.get(
    `http://34.87.31.23:5000/api/authentication/editors/marketers/${userid}`
  );
}
export function createCustomer(customer) {
  return axios.post(
    `http://34.87.31.23:5000/api/authentication/customers`,
    customer
  );
}
export function editCustomer(customer) {
  return axios.put(
    `http://34.87.31.23:5000/api/authentication/customers`,
    customer
  );
}
export function getListWriter(userid) {
  return axios.get(
    `http://34.87.31.23:5000/api/authentication/writers/editors/${userid}`
  );
}
