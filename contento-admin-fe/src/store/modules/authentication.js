import { login } from "../../services/authentication";
import router from "@/router/index";

const state = {
  access_token: "",
  user: [],
  loggedUser: false
};
const mutations = {
  SET_ACCESS_TOKEN(state, data) {
    state.access_token = data;
  },
  SET_USER(state, data) {
    state.user = data;
  },
  SET_LOGGEDUSER(state, data) {
    state.loggedUser = data;
  }
};
const actions = {
  async login({ commit }, payload) {
    await login(payload.email, payload.password)
      .then(rs => {
        commit("SET_LOGGEDUSER", true);
        commit("SET_ACCESS_TOKEN", rs.data.token);
        commit("SET_USER", rs.data);
        localStorage.setItem("AccessToken", rs.data.token);
        localStorage.setItem("Profile",JSON.stringify(rs.data));
        localStorage.setItem("loggedUser", true);
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
  },

  setLoggedUser({ commit }, payload) {
    commit("SET_LOGGEDUSER", payload);
  },
  setUser({ commit }, payload) {
    commit("SET_USER", payload);
  },
  setAccessToken({ commit }, payload) {
    commit("SET_ACCESS_TOKEN", payload);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
