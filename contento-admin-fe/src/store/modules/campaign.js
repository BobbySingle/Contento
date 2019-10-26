/* eslint-disable no-console */
import {
  getListCampaign,
  createCampaign,
  editCampaign,
  getDetailCampaign,
  getListCampaignByCustomerID,
  getListCampaignByEditorID
} from "../../services/campaign";
import Vue from 'vue'
const state = {
  listCampaign: [],
  detailCampaign: [],
  listCampaignByCustomerID: [],
  listCampaignByEditorID: []
};
const mutations = {
  SET_LISTCAMPAIGN(state, data) {
    state.listCampaign = data;
  },
  SET_NEWCAMPAIGN: (state, campaign) => {
    state.listCampaign.unshift(campaign);
  },
  UPDATE_CAMPAIGN: (state, campaign) => {
    const current = state.listCampaign.find(c => c.id == campaign.id);
    const itemUpdate = Object.assign(current, campaign);
    let listNeedUpdate = state.listCampaign;
    state.listCampaign = Object.assign(listNeedUpdate, itemUpdate);
  },
  SET_DETAILCAMPAIGN: (state, data) => {
    state.detailCampaign = data;
  },
  SET_LISTCAMPAIGNBYCUSTOMERID: (state, data) => {
    state.listCampaignByCustomerID = data;
  },
  SET_LISTCAMPAIGNBYEDITORID: (state, data) => {
    state.listCampaignByEditorID = data;
  }
};
const actions = {
  async getListCampaign({ commit }, payload) {
    try {
      let rs = await getListCampaign(payload);
      commit("SET_LISTCAMPAIGN", rs.data);
      console.log("GET_LISTCAMPAIGN ACTION");
      console.log(rs.data);
    } catch (error) {
      console.log("ERROR - GET_LISTCAMPAIGN ACTION");
      console.log(error);
    }
  },

  async createCampaign({ commit }, payload) {
    try {
      let rs = await createCampaign(payload);
      if (rs.status == 202) {
        commit("SET_NEWCAMPAIGN", rs.data);
        console.log("CREATE CAMPAIGN ACTION");
        console.log(rs.data);
        Vue.notify({
          group: 'notice',
          title: 'Create successful!',
          text: 'Campaign has been created successfully!',
          type: 'suc'
        });
        return 202;
      }
    } catch (error) {
      Vue.notify({
        group: 'notice',
        title: 'Create Failed!',
        text: 'Campaign has been created failed!',
        type: 'err'
      });
      console.log("ERROR - CREATE CAMPAIGN ACTION");
      console.log(error);
    }
  },
  async editCampaign({ commit }, payload) {
    try {
      let rs = await editCampaign(payload);
      if(rs.status == 202){
      commit("UPDATE_CAMPAIGN", rs.data);
      console.log("UPDATE CAMPAIGN ACTION");
      console.log(rs.data);
      Vue.notify({
        group: 'notice',
        title: 'Edit successful!',
        text: 'Campaign has been edited successfully!',
        type: 'suc'
      });
      return 202;
      }
    } catch (error) {
      Vue.notify({
        group: 'notice',
        title: 'Edit failed!',
        text: 'Campaign has been edited failed!',
        type: 'err'
      });
      console.log("ERROR - UPDATE CAMPAIGN ACTION");
      console.log(error);
    }
  },
  async getDetailCampaign({ commit }, payload) {
    try {
      let rs = await getDetailCampaign(payload);
      commit("SET_DETAILCAMPAIGN", rs.data);
      console.log("DETAIL CAMPAIGN ACTION");
      console.log(rs.data);
    } catch (error) {
      console.log("ERROR - DETAIL CAMPAIGN ");
      console.log(error);
    }
  },
  async getListCampaignByCustomerID({ commit }, payload) {
    try {
      let rs = await getListCampaignByCustomerID(payload);
      console.log("LIST CAMPAIGN BY CUSTOMER ID - ACTION");
      console.log(rs.data);
      commit("SET_LISTCAMPAIGNBYCUSTOMERID", rs.data);
    } catch (error) {
      console.log("ERROR - LIST CAMPAIGN BY CUSTOMER ID");
      console.log(error);
    }
  },
  async getListCampaignByEditorID({ commit }, payload) {
    try {
      let rs = await getListCampaignByEditorID(payload);
      console.log("LIST CAMPAIGN BY EDITOR ID - ACTION");
      console.log(rs.data);
      commit("SET_LISTCAMPAIGNBYEDITORID", rs.data);
    } catch (error) {
      console.log("ERROR - LIST CAMPAIGN BY EDITOR ID");
      console.log(error);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};