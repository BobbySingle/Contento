/* eslint-disable no-console */
import {
  APIgetListCampaign,
  APIcreateCampaign,
  APIeditCampaign,
  APIgetDetailCampaign,
  APIgetListCampaignByCustomerID,
  APIgetListCampaignByEditorID,
  APIgetListFilterCampaignByEditorID,
  APIgetListFilterCampaignByWriterID,
  APIgetStatisticsByCustomer,
  APIgetStatisticsTotalCampaign
} from "../../services/campaign";
import Vue from "vue";
const state = {
  listCampaign: [],
  detailCampaign: "",
  listCampaignByCustomerID: [],
  listCampaignByCustomerIDFacebook: [],
  listCampaignByEditorID: [],
  listFilterCampaignByEditorID: [],
  listFilterCampaignByWriterID: [],
  dataStatisticsByCustomer: [],
  dataStatisticsByCustomerFacebook: [],
  dataStatisticsTotalCampaign: [],
  dataStatisticsTotalCampaignFacebook: []
};
const mutations = {
  SET_LISTCAMPAIGN(state, data) {
    state.listCampaign = data;
  },
  // SET_NEWCAMPAIGN: (state, campaign) => {
  //   state.listCampaign.unshift(campaign);
  // },
  // UPDATE_CAMPAIGN: (state, campaign) => {
  //   const current = state.listCampaign.find(c => c.id == campaign.id);
  //   const itemUpdate = Object.assign(current, campaign);
  //   let listNeedUpdate = state.listCampaign;
  //   state.listCampaign = Object.assign(listNeedUpdate, itemUpdate);
  // },
  SET_DETAILCAMPAIGN: (state, data) => {
    state.detailCampaign = data;
  },
  SET_LISTCAMPAIGNBYCUSTOMERID: (state, data) => {
    state.listCampaignByCustomerID = data;
  },
  SET_LISTCAMPAIGNBYCUSTOMERIDFACEBOOK: (state, data) => {
    state.listCampaignByCustomerIDFacebook = data;
  },
  SET_LISTCAMPAIGNBYEDITORID: (state, data) => {
    state.listCampaignByEditorID = data;
  },
  SET_LIST_FILTER_CAMPAIGN_BY_WRITER_ID: (state, data) => {
    state.listFilterCampaignByWriterID = data;
  },
  SET_LIST_FILTER_CAMPAIGN_BY_EDITOR_ID: (state, data) => {
    state.listFilterCampaignByEditorID = data;
  },
  SET_DATA_STATISTICS_BY_CUSTOMER(state, data) {
    state.dataStatisticsByCustomer = data;
  },
  SET_DATA_STATISTICS_BY_CUSTOMER_FACEBOOK(state, data) {
    state.dataStatisticsByCustomerFacebook = data;
  },
  SET_DATA_STATISTICS_TOTAL_CAMPAIGN(state, data) {
    state.dataStatisticsTotalCampaign = data;
  },
  SET_DATA_STATISTICS_TOTAL_CAMPAIGN_FACEBOOK(state, data) {
    state.dataStatisticsTotalCampaignFacebook = data;
  }
};
const actions = {
  async getListCampaign({ commit }, payload) {
    try {
      let rs = await APIgetListCampaign(payload);
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
      let rs = await APIcreateCampaign(payload);
      if (rs.status == 202) {
        // commit("SET_NEWCAMPAIGN", rs.data);
        console.log("CREATE CAMPAIGN ACTION");
        console.log(rs.data);
        Vue.notify({
          group: "notice",
          title: "Create successful!",
          text: "Campaign has been created successfully!",
          type: "suc"
        });
        return 202;
      }
    } catch (error) {
      Vue.notify({
        group: "notice",
        title: "Create Failed!",
        text: "Campaign has been created failed!",
        type: "err"
      });
      console.log("ERROR - CREATE CAMPAIGN ACTION");
      console.log(error);
    }
  },
  async editCampaign({ commit }, payload) {
    try {
      let rs = await APIeditCampaign(payload);
      if (rs.status == 202) {
        // commit("UPDATE_CAMPAIGN", rs.data);
        console.log("UPDATE CAMPAIGN ACTION");
        console.log(rs.data);
        Vue.notify({
          group: "notice",
          title: "Edit successful!",
          text: "Campaign has been edited successfully!",
          type: "suc"
        });
        return 202;
      }
    } catch (error) {
      Vue.notify({
        group: "notice",
        title: "Edit failed!",
        text: "Campaign has been edited failed!",
        type: "err"
      });
      console.log("ERROR - UPDATE CAMPAIGN ACTION");
      console.log(error);
    }
  },
  async getDetailCampaign({ commit }, payload) {
    try {
      let rs = await APIgetDetailCampaign(payload);
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
      let rs = await APIgetListCampaignByCustomerID(payload);
      if (rs.status == 200) {
        console.log("LIST CAMPAIGN BY CUSTOMER ID - ACTION");
        console.log(rs.data);
        commit("SET_LISTCAMPAIGNBYCUSTOMERID", rs.data);
      }
    } catch (error) {
      console.log("ERROR - LIST CAMPAIGN BY CUSTOMER ID");
      console.log(error);
      if (error.response.status == 400) {
        commit("SET_LISTCAMPAIGNBYCUSTOMERID", []);
      }
    }
  },
  async getListCampaignByCustomerIDFacebook({ commit }, payload) {
    try {
      let rs = await APIgetListCampaignByCustomerID(payload);
      if (rs.status == 200) {
        console.log("LIST CAMPAIGN BY CUSTOMER ID - ACTION");
        console.log(rs.data);
        commit("SET_LISTCAMPAIGNBYCUSTOMERIDFACEBOOK", rs.data);
      }
    } catch (error) {
      console.log("ERROR - LIST CAMPAIGN BY CUSTOMER ID");
      console.log(error);
      if (error.response.status == 400) {
        commit("SET_LISTCAMPAIGNBYCUSTOMERIDFACEBOOK", []);
      }
    }
  },
  async getListCampaignByEditorID({ commit }, payload) {
    try {
      let rs = await APIgetListCampaignByEditorID(payload);
      console.log("LIST CAMPAIGN BY EDITOR ID - ACTION");
      console.log(rs.data);
      commit("SET_LISTCAMPAIGNBYEDITORID", rs.data);
    } catch (error) {
      console.log("ERROR - LIST CAMPAIGN BY EDITOR ID");
      console.log(error);
    }
  },
  async getListFilterCampaignByEditorID({ commit }, payload) {
    try {
      let rs = await APIgetListFilterCampaignByEditorID(payload);
      console.log("LIST FILTER CAMPAIGN BY EDITOR ID - ACTION");
      console.log(rs.data);
      commit("SET_LIST_FILTER_CAMPAIGN_BY_EDITOR_ID", rs.data);
    } catch (error) {
      console.log("ERROR - LIST FILTER CAMPAIGN BY EDITOR ID");
      console.log(error);
    }
  },
  async getListFilterCampaignByWriterID({ commit }, payload) {
    try {
      let rs = await APIgetListFilterCampaignByWriterID(payload);
      console.log("LIST FILTER CAMPAIGN BY WRITER ID - ACTION");
      console.log(rs.data);
      commit("SET_LIST_FILTER_CAMPAIGN_BY_WRITER_ID", rs.data);
    } catch (error) {
      console.log("ERROR - LIST FILTER CAMPAIGN BY WRITER ID");
      console.log(error);
    }
  },
  async getStatisticsByCustomer({ commit }, payload) {
    try {
      let rs = await APIgetStatisticsByCustomer(payload);
      if (rs.status == 200) {
        commit("SET_DATA_STATISTICS_BY_CUSTOMER", rs.data);
        return 200;
      }
    } catch (error) {
      console.log("ERROR - Statistics By Customer");
      console.log(error);
      if (error.response.status == 400) {
        commit("SET_DATA_STATISTICS_BY_CUSTOMER", []);
      }
    }
  },
  async getStatisticsByCustomerFacebook({ commit }, payload) {
    try {
      let rs = await APIgetStatisticsByCustomer(payload);
      if (rs.status == 200) {
        commit("SET_DATA_STATISTICS_BY_CUSTOMER_FACEBOOK", rs.data);
        return 200;
      }
    } catch (error) {
      console.log("ERROR - Statistics By Customer Facebook");
      console.log(error);
      if (error.response.status == 400) {
        commit("SET_DATA_STATISTICS_BY_CUSTOMER_FACEBOOK", []);
      }
    }
  },
  async getStatisticsTotalCampaign({ commit }, payload) {
    try {
      let rs = await APIgetStatisticsTotalCampaign(payload);
      if (rs.status == 200) {
        commit("SET_DATA_STATISTICS_TOTAL_CAMPAIGN", rs.data);
        return 200;
      }
    } catch (error) {
      console.log("ERROR - Statistics Total Campaign");
      console.log(error);
      if (error.response.status == 400) {
        commit("SET_DATA_STATISTICS_TOTAL_CAMPAIGN", []);
      }
    }
  },
  async getStatisticsTotalCampaignFacebook({ commit }, payload) {
    try {
      let rs = await APIgetStatisticsTotalCampaign(payload);
      if (rs.status == 200) {
        commit("SET_DATA_STATISTICS_TOTAL_CAMPAIGN_FACEBOOK", rs.data);
        return 200;
      }
    } catch (error) {
      console.log("ERROR - Statistics Total Campaign Facebook");
      console.log(error);
      if (error.response.status == 400) {
        commit("SET_DATA_STATISTICS_TOTAL_CAMPAIGN_FACEBOOK", []);
      }
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
