import axios from "@/plugins/axios";

const API_URL = "http://34.87.31.23:5000/api/authentication";

export function getListCustomers(userid) {
  return axios.get(`${API_URL}/list-customer/${userid}`);
}

export function getListEditors(userid) {
  return axios.get(`${API_URL}/list-editor/${userid}`);
}
