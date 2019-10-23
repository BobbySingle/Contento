/* eslint-disable no-console */
import {
  login,
  getListInfoCustomer,
  createCustomer,
  getListEditorByMarketerID,
  getListCustomerByMarketerID,
  editCustomer,
  getListWriter
} from "../../services/authentication";
import router from "@/router/index";

const state = {
  access_token: "",
  user: [],
  loggedUser: false,
  listCustomer: [],
  listEditor: [],
  listInfoCustomer: [],
  listWriter: []
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
  },
  SET_LISTCUSTOMER(state, data) {
    state.listCustomer = data;
  },

  SET_NEW_LISTCUSTOMER(state, customer) {
    state.listCustomer.unshift(customer);
  },
  SET_LISTEDITOR(state, data) {
    state.listEditor = data;
  },
  SET_LISTINFOCUSTOMER(state, data) {
    state.listInfoCustomer = data;
  },
  SET_NEW_LISTINFOCUSTOMER(state, customer) {
    state.listInfoCustomer.unshift(customer);
  },
  UPDATE_LISTINFOCUSTOMER(state, customer) {
    const current = state.listInfoCustomer.find(c => c.id == customer.id);
    const itemUpdate = Object.assign(current, customer);
    let listNeedUpdate = state.listInfoCustomer;
    state.listInfoCustomer = Object.assign(listNeedUpdate, itemUpdate);
  },
  SET_LISTWRITER(state, data) {
    state.listWriter = data;
  }
};
const actions = {
  async login({ commit }, payload) {
    try {
      let rs = await login(payload.email, payload.password);
      commit("SET_LOGGEDUSER", true);
      commit("SET_ACCESS_TOKEN", rs.data.token);
      commit("SET_USER", rs.data);
      localStorage.setItem("Profile", JSON.stringify(rs.data));
      alert("Login Success");
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
    } catch (error) {
      alert("Login Fail");
      console.log("ERROR - LOGIN ACTION");
      console.log(error);
    }
  },

  async getListInfoCustomer({ commit }, payload) {
    try {
      let rs = await getListInfoCustomer(payload);
      console.log("LIST INFO CUSTOMER - ACTION");
      console.log(rs);
      commit("SET_LISTINFOCUSTOMER", rs.data);
    } catch (error) {
      console.log("ERROR - LIST INFO CUSTOMER");
      console.log(error);
    }
  },
  async createCustomer({ commit }, payload) {
    try {
      let rs = await createCustomer(payload);
      console.log("NEW LIST INFO CUSTOMER - ACTION");
      console.log(rs.data);
      commit("SET_NEW_LISTINFOCUSTOMER", rs.data);
      commit("SET_NEW_LISTCUSTOMER", {
        id: rs.data.id,
        name: rs.data.fullName
      });
      alert("Create Success");
    } catch (error) {
      console.log("ERROR - NEW LIST INFO CUSTOMER");
      console.log(error);
      alert("Create Fail");
    }
  },
  async editCustomer({ commit }, payload) {
    try {
      let rs = await editCustomer(payload);
      console.log("EDIT LIST INFO CUSTOMER - ACTION");
      console.log(rs.data);
      commit("UPDATE_LISTINFOCUSTOMER", rs.data);
      alert("Edit Success");
    } catch (error) {
      console.log("ERROR - EDIT LIST INFO CUSTOMER");
      console.log(error);
    }
  },
  async getListCustomerByMarketerID({ commit }, payload) {
    try {
      let rs = await getListCustomerByMarketerID(payload);
      commit("SET_LISTCUSTOMER", rs.data);
    } catch (error) {
      console.log("ERROR -  LIST CUSTOMER BY MARKETER ID");
      console.log(error);
    }
  },
  async getListEditorByMarketerID({ commit }, payload) {
    try {
      let rs = await getListEditorByMarketerID(payload);
      commit("SET_LISTEDITOR", rs.data);
    } catch (error) {
      console.log("ERROR -  LIST EDITOR BY MARKETER ID");
      console.log(error);
    }
  },
  async getListWriter({ commit }, payload) {
    try {
      let rs = await getListWriter(payload);
      commit("SET_LISTWRITER", rs.data);
    } catch (error) {
      console.log("ERROR -  LIST WRITER ");
      console.log(error);
    }
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
