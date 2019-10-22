import {
  getListEditorByMarketerID,
  getListCustomerByMarketerID
} from "../../services/authentication";
import { getListTag } from "../../services/contentprocess";

const state = {
  listCustomer: [],
  listEditor: [],
  listTag: []
};
const mutations = {
  SET_LISTCUSTOMER(state, data) {
    state.listCustomer = data;
  },
  SET_LISTEDITOR(state, data) {
    state.listEditor = data;
  },
  SET_LISTTAG(state, data) {
    state.listTag = data;
  }
};
const actions = {
  async getListCustomerByMarketerID({ commit }, payload) {
    await getListCustomerByMarketerID(payload)
      .then(rs => {
        commit("SET_LISTCUSTOMER", rs.data);
      })
      .catch(er => {
        console.log(er);
      });
  },
  async getListEditorByMarketerID({ commit }, payload) {
    await getListEditorByMarketerID(payload)
      .then(rs => {
        commit("SET_LISTEDITOR", rs.data);
      })
      .catch(er => {
        console.log(er);
      });
  },
  async getListTag({ commit }) {
    await getListTag()
      .then(rs => {
        commit("SET_LISTTAG", rs.data);
      })
      .catch(er => {
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
