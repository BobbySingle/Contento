import {
  getListCampaignTask,
  getTaskDetail
} from "../../services/contentprocess";

const state = {
  listCampaignTask: [],
  taskDetail:[],
};
const mutations = {
  SET_LISTCAMPAIGNTASK(state, data) {
    state.listCampaignTask = data;
  },
  SET_TASKDETAIL(state, data){
    state.taskDetail = data;
  }
};
const actions = {
  async getListCampaignTask({ commit }, payload) {
    await getListCampaignTask(payload)
      .then(rs => {
        commit("SET_LISTCAMPAIGNTASK", rs.data);
        console.log("LIST CAMPAIGN TASK - ACTION");
        console.log(rs.data);
      })
      .catch(er => {
        console.log("ERROR - LIST CAMPAIGN TASK ");
        console.log(er);
      });
  },
  async getTaskDetail({ commit }, payload) {
    await getTaskDetail(payload)
      .then(rs => {
        commit("SET_TASKDETAIL", rs.data);
        console.log("TASK DETAIL - ACTION");
        console.log(rs.data);
      })
      .catch(er =>{
        console.log("ERROR - TASK DETAIL ");
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
