import axios from "axios";

export function login(email, password) {
  return axios.post(`http://34.87.31.23:5000/api/authentication/login`, {
    email,
    password
  });
}
