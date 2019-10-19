import { createCampaign, getCampaigns } from "../../services/campaign";

const state = {
  campaigns: []
};

const mutations = {
  SET_CAMPAIGNS: (state, campaigns) => {
    state.campaigns = campaigns;
  },
  SET_NEWCAMPAIGN: (state, campaign) => {
    state.campaigns.unshift(campaign);
  },
  UPDATE_CAMPAIGN: (state, campaign) => {
    //vd update viet ntn se khong chay vi tuy data doi nhung no ko detect đc de render
    // const current = state.campaigns.find(c => c.id === campaign.id);
    // current.abc = "new value";
    // viet nhu nay moi chay dc
    // const current = state.campaigns.find(c => c.id == campaign.id);
    // const updated = Object.assign({}, idx, {
    //   abc: 'new value'
    // })
    // Object.assign là gán updated cho object current
    // Object.assign(current, updated)
  },
  DELETE_CAMPAIGN: (state, id) => {
    //delete cung tuong tu
    // const idx = state.campaigns.findIndex(c => c.id === id)
    //splice la cat bo 1 mang tu vi tri idx => immutable => tao object moi nen no se render lai
    // state.campaigns.splice(idx, 1)
  }
};

const actions = {
  async getCampaigns({ commit }, userid) {
    const { data } = await getCampaigns(userid);
    commit("SET_CAMPAIGNS", data);
  },
  async createCampaign({ commit }, campaign) {
    try {
      const { data } = await createCampaign(campaign);
      commit("SET_NEWCAMPAIGN", data);
      alert("Create Success");
    } catch (er) {
      alert("Create Fails");
      console.log(er);
    }
  }
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
