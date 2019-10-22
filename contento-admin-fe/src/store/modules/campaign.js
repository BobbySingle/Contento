import {
  getListCampaign,
  createCampaign,
  editCampaign,
  getDetailCampaign
} from "../../services/campaign";

const state = {
  listCampaign: [],
  detailCampaign: []
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
  }
};
const actions = {
  async getListCampaign({ commit }, payload) {
    await getListCampaign(payload)
      .then(rs => {
        commit("SET_LISTCAMPAIGN", rs.data);
        console.log("GET_LISTCAMPAIGN ACTION");
        console.log(rs.data);
      })
      .catch(er => {
        console.log("ERROR - GET_LISTCAMPAIGN ACTION");
        console.log(er);
      });
  },

  async createCampaign({ commit }, payload) {
    await createCampaign(payload)
      .then(rs => {
        commit("SET_NEWCAMPAIGN", rs.data);
        console.log("CREATE CAMPAIGN ACTION");
        console.log(rs.data);
        alert("Create Success");
      })
      .catch(er => {
        alert("Create Fails");
        console.log("ERROR - CREATE CAMPAIGN ACTION");
        console.log(er);
      });
  },
  async editCampaign({ commit }, payload) {
    await editCampaign(payload)
      .then(rs => {
        commit("UPDATE_CAMPAIGN", rs.data);
        console.log("UPDATE CAMPAIGN ACTION");
        console.log(rs.data);
        alert("Update Success");
      })
      .catch(er => {
        alert("Update Fails");
        console.log("ERROR - UPDATE CAMPAIGN ACTION");
        console.log(er);
      });
  },
  async getDetailCampaign({ commit }, payload) {
    await getDetailCampaign(payload)
      .then(rs => {
        commit("SET_DETAILCAMPAIGN", rs.data);
        console.log("DETAIL CAMPAIGN ACTION");
        console.log(rs.data);
      })
      .catch(er => {
        console.log("ERROR - DETAIL CAMPAIGN ACTION");
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
