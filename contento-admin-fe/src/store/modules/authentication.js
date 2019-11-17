/* eslint-disable no-console */
import {
  APIlogin,
  APIgetListInfoCustomer,
  APIcreateCustomer,
  APIgetListEditorByMarketerID,
  APIgetListCustomerByMarketerID,
  APIgetListCustomerByEditorID,
  APIeditCustomer,
  APIgetListWriter,
  APIgetListWriterByMarketerID,
  APIgetCustomerDetailByCustomerID,
  APIgetProfileInfo,
  APIeditProfileInfo,
  APIcheckPassword,
  APIchangePassword,
  APIgetAdminAccounts,
  APIcreateAccount,
  APIgetMarketers,
  APIgetEditors,
  APIgetWriters,
  APIgetEditorsForWriter,
  APIgetInfoAccount,
  APIeditAccount,
  APIisActiveAccount,
  APIgetFreelanceAccount,
  APIgetManagerOfAccount,
  APIdisableAccount
} from "../../services/authentication";
import router from "@/router/index";
import Swal from 'sweetalert2';
import Vue from 'vue'

const state = {
  access_token: "",
  user: [],
  fullName: "",
  loggedUser: false,
  listCustomer: [],
  listEditor: [],
  listInfoCustomer: [],
  listWriter: [],
  listWriterByMarketerID: [],
  customerDetail: "",
  profile: "",
  listAdminAccounts: [],
  listMarketersBasic: [],
  listEditorsBasic: [],
  listWritersBasic: [],
  adminUserDetail: "",
  freelanceAccount: [],
};
const mutations = {
  SET_ACCESS_TOKEN(state, data) {
    state.access_token = data;
  },
  SET_USER(state, data) {
    state.user = data;
  },
  SET_FULLNAME(state, data) {
    state.fullName = data;
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
  SET_PROFILE(state, data) {
    state.profile = data;
  },
  SET_LISTACCOUNTS(state, data) {
    state.listAdminAccounts = data;
  },
  SET_MARKETERS_BASIC(state, data) {
    state.listMarketersBasic = data
  },
  SET_EDITORS_BASIC(state, data) {
    state.listEditorsBasic = data
  },
  SET_WRITERS_BASIC(state, data) {
    state.listWritersBasic = data
  },
  SET_ADMIN_USER_DETAIL(state, data) {
    state.adminUserDetail = data
  },
  DELETE_MARKETER_BASIC(state, id) {
    const IdElementDelete = state.listMarketersBasic.findIndex(l => l.id === id);
    state.listMarketersBasic.splice(IdElementDelete, 1);
  },
  DELETE_EDITOR_BASIC(state, id) {
    const IdElementDelete = state.listEditorsBasic.findIndex(l => l.id === id);
    state.listEditorsBasic.splice(IdElementDelete, 1);
  },
  DELETE_WRITER_BASIC(state, id) {
    const IdElementDelete = state.listWritersBasic.findIndex(l => l.id === id);
    state.listWritersBasic.splice(IdElementDelete, 1);
  },
  SET_FREELANCE_ACCOUNT(state, data) {
    state.freelanceAccount = data;
  }
};
const actions = {
  async login({ commit }, payload) {
    try {
      let rs = await APIlogin(payload.email, payload.password);
      if (rs.status == 200) {
        commit("SET_LOGGEDUSER", true);
        commit("SET_ACCESS_TOKEN", rs.data.token);
        commit("SET_USER", rs.data);
        commit("SET_FULLNAME", rs.data.fullName);
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
      let rs = await APIgetListInfoCustomer(payload);
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
      let rs = await APIcreateCustomer(payload);
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
      let rs = await APIeditCustomer(payload);
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
      let rs = await APIgetListCustomerByMarketerID(payload);
      commit("SET_LISTCUSTOMER", rs.data);
    } catch (error) {
      console.log("ERROR -  LIST CUSTOMER BY MARKETER ID");
      console.log(error);
    }
  },
  async getListCustomerByEditorID({ commit }, payload) {
    try {
      let rs = await APIgetListCustomerByEditorID(payload);
      commit("SET_LISTCUSTOMER", rs.data);
    } catch (error) {
      console.log("ERROR -  LIST CUSTOMER BY EDITOR ID");
      console.log(error);
    }
  },
  async getListEditorByMarketerID({ commit }, payload) {
    try {
      let rs = await APIgetListEditorByMarketerID(payload);
      commit("SET_LISTEDITOR", rs.data);
    } catch (error) {
      console.log("ERROR -  LIST EDITOR BY MARKETER ID");
      console.log(error);
    }
  },
  async getListEditorBasicByMarketerID({ commit }, payload) {
    try {
      let rs = await APIgetListEditorByMarketerID(payload);
      commit("SET_EDITORS_BASIC", rs.data);
    } catch (error) {
      console.log("ERROR -  LIST EDITOR BASIC BY MARKETER ID");
      console.log(error);
    }
  },
  async getListWriter({ commit }, payload) {
    try {
      let rs = await APIgetListWriter(payload);
      commit("SET_LISTWRITER", rs.data);
    } catch (error) {
      console.log("ERROR -  LIST WRITER ");
      console.log(error);
    }
  },
  async getListWriterBasic({ commit }, payload) {
    try {
      let rs = await APIgetListWriter(payload);
      commit("SET_WRITERS_BASIC", rs.data);
    } catch (error) {
      console.log("ERROR -  LIST WRITER BASIC");
      console.log(error);
    }
  },
  async getListWriterByMarketerID({ commit }, payload) {
    try {
      let rs = await APIgetListWriterByMarketerID(payload);
      commit("SET_LISTWRITER_BY_MARKETERID", rs.data);
    } catch (error) {
      console.log("ERROR -  LIST WRITER BY MARKETER ID");
      console.log(error);
    }
  },
  async getCustomerDetailByCustomerID({ commit }, payload) {
    try {
      let rs = await APIgetCustomerDetailByCustomerID(payload);
      commit("SET_CUSTOMER_DETAIL", rs.data);
    } catch (error) {
      console.log("ERROR -  CUSTOMER DETAIL");
      console.log(error);
    }
  },
  async getProfileInfo({ commit }, payload) {
    try {
      let rs = await APIgetProfileInfo(payload);
      commit("SET_PROFILE", rs.data);
    } catch (error) {
      console.log("ERROR -  PROFILE");
      console.log(error);
    }
  },
  async checkPassword({ commit }, payload) {
    try {
      let rs = await APIcheckPassword(payload);
      if (rs.status == 202) {
        return 202;
      }
    } catch (error) {
    }
  },
  async changePassword({ commit }, payload) {
    try {
      let rs = await APIchangePassword(payload);
      if (rs.status == 202) {
        Vue.notify({
          group: 'notice',
          title: 'Change password successful!',
          text: 'Password has been changed successfully!',
          type: 'suc'
        })
        return 202;
      }
    } catch (error) {
      Vue.notify({
        group: 'notice',
        title: 'Change password failed!',
        text: 'Password has been changed failed!',
        type: 'warn'
      })
      console.log("ERROR -  CHANGE PASSWORD");
      console.log(error);
    }
  },
  async editProfileInfo({ commit }, payload) {
    try {
      let rs = await APIeditProfileInfo(payload);
      commit("SET_PROFILE", rs.data);
      commit("SET_FULLNAME", rs.data.fullName);
      let profile = JSON.parse(localStorage.getItem("Profile").toString());
      profile.fullName = rs.data.fullName;
      localStorage.setItem("Profile", JSON.stringify(profile));
      Vue.notify({
        group: 'notice',
        title: 'Edit successful!',
        text: 'Profile has been edited successfully!',
        type: 'suc'
      })
      return 202;
    } catch (error) {
      console.log("ERROR -  PROFILE");
      console.log(error);
      Vue.notify({
        group: 'notice',
        title: 'Edit failed!',
        text: 'Profile has been edited failed!',
        type: 'warn'
      })
    }
  },
  async getAdminAccounts({ commit }) {
    try {
      let rs = await APIgetAdminAccounts();
      if (rs.status == 202) {
        commit("SET_LISTACCOUNTS", rs.data);
        console.log("LIST ACCOUNTS");
        console.log(rs.data);
      }
    } catch (error) {
      console.log("ERROR - LIST ACCOUNTS");
      console.log(error);
    }

  },
  async createAccount({ commit }, payload) {
    try {
      let rs = await APIcreateAccount(payload);
      if (rs.status == 202) {
        console.log("CREATE ACCOUNT");
        console.log(rs.data);
        Vue.notify({
          group: 'notice',
          title: 'Create successful!',
          text: 'Account has been created successfully!',
          type: 'suc'
        })
        return 202;
      }
    } catch (error) {
      console.log("ERROR - CREATE ACCOUNT");
      console.log(error);
      Vue.notify({
        group: 'notice',
        title: 'Create failed!',
        text: 'Account has been created failed!',
        type: 'warn'
      })
    }
  },
  async editAccount({ commit }, payload) {
    try {
      let rs = await APIeditAccount(payload);
      if (rs.status == 202) {
        console.log("EDIT ACCOUNT");
        console.log(rs.data);
        Vue.notify({
          group: 'notice',
          title: 'Edit successful!',
          text: 'Account has been edited successfully!',
          type: 'suc'
        })
        return 202;
      }
    } catch (error) {
      console.log("ERROR - EDIT ACCOUNT");
      console.log(error);
      Vue.notify({
        group: 'notice',
        title: 'Edit failed!',
        text: 'Account has been edited failed!',
        type: 'warn'
      })
    }
  },
  async assignMember({ commit }, payload) {
    try {
      let rs = await APIeditAccount(payload);
      if (rs.status == 202) {
        console.log("ASSIGN ACCOUNT");
        console.log(rs.data);
        Vue.notify({
          group: 'notice',
          title: 'Assign successful!',
          text: 'Account has been assigned successfully!',
          type: 'suc'
        })
        return 202;
      }
    } catch (error) {
      console.log("ERROR - ASSIGN ACCOUNT");
      console.log(error);
      Vue.notify({
        group: 'notice',
        title: 'Assign failed!',
        text: 'Account has been assigned failed!',
        type: 'warn'
      })
    }
  },
  async isActiveAccount({ commit }, payload) {
    try {
      let rs = await APIisActiveAccount(payload);
      if (rs.status == 202) {
        console.log("CHANGE STATUS ACCOUNT");
        console.log(rs.data);
        Vue.notify({
          group: 'notice',
          title: 'Change successful!',
          text: 'Account has been changed status successfully!',
          type: 'suc'
        })
        return 202;
      }
    } catch (error) {
      console.log("ERROR - CHANGE STATUS ACCOUNT");
      console.log(error);
      Vue.notify({
        group: 'notice',
        title: 'Change failed!',
        text: 'Account has been changed status failed!',
        type: 'warn'
      })
    }
  },
  async getMarketersBasic({ commit }) {
    try {
      let rs = await APIgetMarketers();
      if (rs.status == 200) {
        console.log("GET MARKETER BASIC");
        console.log(rs.data);
        commit("SET_MARKETERS_BASIC", rs.data);
        return 200;
      }
    } catch (error) {
      console.log("ERROR - GET MARKETER BASIC");
      console.log(error);
    }
  },
  async getEditorsBasic({ commit }) {
    try {
      let rs = await APIgetEditors();
      if (rs.status == 200) {
        console.log("GET EDITORS BASIC");
        console.log(rs.data);
        commit("SET_EDITORS_BASIC", rs.data);
        return 200;
      }
      if (rs.status == 204) {
        console.log("GET EDITORS BASIC");
        console.log(rs.data);
        commit("SET_EDITORS_BASIC", []);
        return 200;
      }
    } catch (error) {
      console.log("ERROR - GET EDITORS BASIC");
      console.log(error);
    }
  },
  async getWritersBasic({ commit }) {
    try {
      let rs = await APIgetWriters();
      if (rs.status == 200) {
        console.log("GET WRITERS BASIC");
        console.log(rs.data);
        commit("SET_WRITERS_BASIC", rs.data);
        return 200;
      }
      if (rs.status == 204) {
        console.log("GET WRITERS BASIC");
        console.log(rs.data);
        commit("SET_WRITERS_BASIC", []);
        return 200;
      }
    } catch (error) {
      console.log("ERROR - GET WRITERS BASIC");
      console.log(error);
    }
  },
  async getEditorsForWriter({ commit }) {
    try {
      let rs = await APIgetEditorsForWriter();
      if (rs.status == 200) {
        console.log("GET EDITORS FOR WRITER");
        console.log(rs.data);
        commit("SET_EDITORS_BASIC", rs.data);
        return 200;
      } if (rs.status == 204) {
        console.log("GET EDITORS FOR WRITER");
        console.log(rs.data);
        commit("SET_EDITORS_BASIC", []);
        return 200;
      }
    } catch (error) {
      console.log("ERROR - GET EDITORS FOR WRITER");
      console.log(error);
    }
  },
  async getAdminUserDetails({ commit }, payload) {
    try {
      let rs = await APIgetInfoAccount(payload);
      if (rs.status == 200) {
        console.log("GET ADMIN USER DETAIL");
        console.log(rs.data);
        commit("SET_ADMIN_USER_DETAIL", rs.data);
        return 200;
      }
    } catch (error) {
      console.log("ERROR - GET ADMIN USER DETAIL");
      console.log(error);
    }
  },
  async getFreelanceAccount({ commit }) {
    try {
      let rs = await APIgetFreelanceAccount();
      if (rs.status == 200) {
        console.log("GET FREELANCE ACCOUNT");
        console.log(rs.data);
        commit("SET_FREELANCE_ACCOUNT", rs.data);
        return 200;
      }
      if (rs.status == 204) {
        console.log("GET FREELANCE ACCOUNT");
        console.log(rs.data);
        commit("SET_FREELANCE_ACCOUNT", []);
        return 200;
      }
    } catch (error) {
      console.log("ERROR - GET FREELANCE ACCOUNT");
      console.log(error);
    }
  },
  async getManagerOfAccount({ commit }, payload) {
    try {
      let rs = await APIgetManagerOfAccount(payload);
      if (rs.status == 200) {
        return rs.data;
      }
    } catch (error) {
      console.log("ERROR - GET MANAGER OF ACCOUNT");
      console.log(error);
    }
  },
  async disableAccount({ commit }, payload) {
    try {
      let rs = await APIdisableAccount(payload);
      if (rs.status == 202) {
        Vue.notify({
          group: 'notice',
          title: 'Disable successful!',
          text: 'Account has been disable successfully!',
          type: 'suc'
        })
        return 202;
      }
    } catch (error) {
      console.log("ERROR - DISABLE ACCOUNT");
      console.log(error);
      Vue.notify({
        group: 'notice',
        title: 'Disable failed!',
        text: 'Account has been disable failed!',
        type: 'warn'
      })
    }
  },
  removeElementMarketer({ commit }, payload) {
    commit("DELETE_MARKETER_BASIC", payload);
  },
  removeElementEditor({ commit }, payload) {
    commit("DELETE_EDITOR_BASIC", payload);
  },
  removeElementWriter({ commit }, payload) {
    commit("DELETE_WRITER_BASIC", payload);
  },
  setMaketersBasic({ commit }, payload) {
    commit("SET_MARKETERS_BASIC", payload);
  },
  setEditorsBasic({ commit }, payload) {
    commit("SET_EDITORS_BASIC", payload);
  },
  setWritersBasic({ commit }, payload) {
    commit("SET_WRITERS_BASIC", payload);
  },
  refreshFullName({ commit }) {
    let profile = JSON.parse(localStorage.getItem("Profile").toString());
    commit("SET_FULLNAME", profile.fullName);
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
