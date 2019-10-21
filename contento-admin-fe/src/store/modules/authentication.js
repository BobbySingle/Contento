import { login } from "../../services/authentication";
import router from "@/router/index";

const state = {
  access_token: "",
  user: [],
  isAuthen: false
};
const mutations = {
  SET_ACCESS_TOKEN(state, data) {
    state.access_token = data;
  },
  SET_USER(state, data) {
    state.user = data;
  },
  SET_ISAUTHEN(state, data) {
    state.isAuthen = data;
  }
};
const actions = {
  async login({ commit }, payload) {
    await login(payload.email, payload.password)
      .then(rs => {
        commit("SET_ACCESS_TOKEN", rs.data.token);
        commit("SET_USER", rs.data);
        commit("SET_ISAUTHEN", true);
        alert("Login Success");
        // localStorage.setItem("isAuthen", true);
        if (rs.data.role === "Marketer") {
          router.push({
            name: "CampaignManagement"
          });
        } else if (rs.data.role === "Editor") {
          router.push({
            name: "CampaignRequest"
          });
        } else if (rs.data.role === "Writer") {
          router.push({
            name: "TaskManagement"
          });
        }
      })
      .catch(er => {
        alert("Login Fail");
        console.log("ERROR - LOGIN ACTION");
        console.log(er);
      });
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
