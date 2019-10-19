import { getListTags } from "../../services/contentProcess";
import { getListCustomers, getListEditors } from "../../services/authen";

const state = {
  tags: [],
  customers:[],
  editors:[],
};
const mutations = {
  SET_TAGS: (state, tags) => {
    state.tags = tags;
  },
  SET_CUSTOMERS: (state, customers) => {
    state.customers = customers;
  },
  SET_EDITORS: (state, editors) => {
    state.editors = editors;
  }
};
const actions = {
  async getListTags({ commit }) {
    const { data } = await getListTags();
    commit("SET_TAGS", data);
  },
  async getListCustomers({ commit }, userid) {
    const { data } = await getListCustomers(userid);
    commit("SET_CUSTOMERS", data);
  },
  async getListEditors({ commit }, userid) {
    const { data } = await getListEditors(userid);
    commit("SET_EDITORS", data);
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
