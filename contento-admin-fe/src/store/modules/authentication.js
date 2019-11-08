/* eslint-disable no-console */
import {
  login,
  getListInfoCustomer,
  createCustomer,
  getListEditorByMarketerID,
  getListCustomerByMarketerID,
  getListCustomerByEditorID,
  editCustomer,
  getListWriter,
  getListWriterByMarketerID,
  getCustomerDetailByCustomerID,
  getProfileInfo
} from "../../services/authentication";
import router from "@/router/index";
import Swal from 'sweetalert2';
import Vue from 'vue'

const state = {
  access_token: "",
  user: [],
  loggedUser: false,
  listCustomer: [],
  listEditor: [],
  listInfoCustomer: [],
  listWriter: [],
  listWriterByMarketerID: [],
  customerDetail: "",
  profile:"",
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
  },
  SET_LISTWRITER_BY_MARKETERID(state, data) {
    state.listWriterByMarketerID = data;
  },
  SET_CUSTOMER_DETAIL(state, data) {
    state.customerDetail = data;
  },
  SET_PROFILE(state, data){
    state.profile = data;
  }
};
const actions = {
  async login({ commit }, payload) {
    try {
      let rs = await login(payload.email, payload.password);
      if (rs.status == 200) {
        commit("SET_LOGGEDUSER", true);
        commit("SET_ACCESS_TOKEN", rs.data.token);
        commit("SET_USER", rs.data);
        localStorage.setItem("Profile", JSON.stringify(rs.data));
      }
    } catch (error) {
      Swal.fire(
        {
          title: 'Warning',
          text: "Your email or password is incorrect. Please try again!",
          type: 'warning',
          confirmButtonText: "OK",
          timer: 3000,
          allowOutsideClick: false
        }
      );
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
      if (rs.status == 202) {
        console.log("NEW LIST INFO CUSTOMER - ACTION");
        console.log(rs.data);
        commit("SET_NEW_LISTINFOCUSTOMER", rs.data);
        commit("SET_NEW_LISTCUSTOMER", {
          id: rs.data.id,
          name: rs.data.fullName
        });
        Vue.notify({
          group: 'notice',
          title: 'Create successful!',
          text: 'Customer has been created successfully!',
          type: 'suc'
        });
        return 202;
      }
    } catch (error) {
      console.log("ERROR - NEW LIST INFO CUSTOMER");
      console.log(error);
      Vue.notify({
        group: 'notice',
        title: 'Create failed!',
        text: 'Customer has been created failed!',
        type: 'warn'
      })
    }
  },
  async editCustomer({ commit }, payload) {
    try {
      let rs = await editCustomer(payload);
      if (rs.status == 202) {
        console.log("EDIT LIST INFO CUSTOMER - ACTION");
        console.log(rs.data);
        commit("UPDATE_LISTINFOCUSTOMER", rs.data);
        Vue.notify({
          group: 'notice',
          title: 'Edit successful!',
          text: 'Customer has been edited successfully!',
          type: 'suc'
        })
        return 202;
      }
    } catch (error) {
      Vue.notify({
        group: 'notice',
        title: 'Edit failed!',
        text: 'Customer has been edited failed!',
        type: 'warn'
      })
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
  async getListCustomerByEditorID({ commit }, payload) {
    try {
      let rs = await getListCustomerByEditorID(payload);
      commit("SET_LISTCUSTOMER", rs.data);
    } catch (error) {
      console.log("ERROR -  LIST CUSTOMER BY EDITOR ID");
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
  async getListWriterByMarketerID({ commit }, payload) {
    try {
      let rs = await getListWriterByMarketerID(payload);
      commit("SET_LISTWRITER_BY_MARKETERID", rs.data);
    } catch (error) {
      console.log("ERROR -  LIST WRITER BY MARKETER ID");
      console.log(error);
    }
  },
  async getCustomerDetailByCustomerID({ commit }, payload) {
    try {
      let rs = await getCustomerDetailByCustomerID(payload);
      commit("SET_CUSTOMER_DETAIL", rs.data);
    } catch (error) {
      console.log("ERROR -  CUSTOMER DETAIL");
      console.log(error);
    }
  },
  async getProfileInfo({ commit }, payload) {
    try {
      let rs = await getProfileInfo(payload);
      commit("SET_PROFILE", rs.data);
    } catch (error) {
      console.log("ERROR -  PROFILE");
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
