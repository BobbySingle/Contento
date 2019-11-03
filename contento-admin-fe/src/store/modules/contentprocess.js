/* eslint-disable no-console */
import {
  getListCampaignTask,
  getTaskDetail,
  getListTaskByMarketerID,
  getListTag,
  deleteTaskByID,
  getListTagByCampaignID,
  createTask,
  getTaskDetailUpdate,
  editTaskByID,
  getContentRequest,
  setApprovalContentRequest,
  getTaskByWriterId,
  startTask,
  saveContent,
  submitContent,
  getListTaskByEditorID,
  getListStatusTask,
  getListStatusCampaign
} from "../../services/contentprocess";

import router from "@/router/index";
import Vue from "vue";

const state = {
  listCampaignTask: [],
  taskDetail: [],
  listTag: [],
  listTaskByMarketerID: [],
  listTagByCampaignID: [],
  taskDetailUpdate: [],
  listContentRequest: [],
  listTaskByWriterID: [],
  listTaskByEditorID: [],
  listStatusTask:[],
  listStatusCampaign:[],
};

const mutations = {
  SET_LISTCAMPAIGNTASK(state, data) {
    state.listCampaignTask = data;
  },
  SET_TASKDETAIL(state, data) {
    state.taskDetail = data;
  },
  SET_LISTTAG(state, data) {
    state.listTag = data;
  },
  SET_LISTTASKBYMARKETERID(state, data) {
    state.listTaskByMarketerID = data;
  },
  SET_NEWTASK: (state, data) => {
    state.listCampaignTask.unshift(data);
  },
  UPDATE_LISTTASK(state, data) {
    const current = state.listCampaignTask.find(list => list.id == data.id);
    const itemUpdate = Object.assign(current, data);
    let listNeedUpdate = state.listCampaignTask;
    state.listCampaignTask = Object.assign(listNeedUpdate, itemUpdate);
  },
  DELETE_TASK(state, id) {
    const IDTaskDelete = state.listCampaignTask.findIndex(c => c.id === id);
    state.listCampaignTask.splice(IDTaskDelete, 1);
  },
  SET_LISTTAGBYCAMPAIGNID(state, data) {
    state.listTagByCampaignID = data;
  },
  SET_TASK_DETAIL_UPDATE(state, data) {
    state.taskDetailUpdate = data;
  },
  SET_LIST_CONTENT_REQUEST(state, data) {
    state.listContentRequest = data;
  },
  SET_LIST_TASK_BY_WRITER_ID(state, data) {
    state.listTaskByWriterID = data;
  },
  SET_LIST_TASK_BY_EDITOR_ID(state, data) {
    state.listTaskByEditorID = data;
  },
  SET_LIST_STATUS_TASK(state, data) {
    state.listStatusTask = data;
  },
  SET_LIST_STATUS_CAMPAIGN(state, data) {
    state.listStatusCampaign = data;
  },
};

const actions = {
  async getListCampaignTask({ commit }, payload) {
    try {
      let rs = await getListCampaignTask(payload);
      commit("SET_LISTCAMPAIGNTASK", rs.data);
      console.log("LIST CAMPAIGN TASK - ACTION");
      console.log(rs.data);
    } catch (error) {
      console.log("ERROR - LIST CAMPAIGN TASK ");
      console.log(error);
    }
  },
  async getTaskDetail({ commit }, payload) {
    try {
      let rs = await getTaskDetail(payload);
      commit("SET_TASKDETAIL", rs.data);
      console.log("TASK DETAIL - ACTION");
      console.log(rs.data);
    } catch (error) {
      console.log("ERROR - TASK DETAIL ");
      console.log(error);
    }
  },
  async getListTag({ commit }) {
    try {
      let rs = await getListTag();
      commit("SET_LISTTAG", rs.data);
    } catch (error) {
      console.log("ERROR - LIST TASK ");
      console.log(error);
    }
  },
  async getListTaskByMarketerID({ commit }, payload) {
    try {
      let rs = await getListTaskByMarketerID(payload);
      commit("SET_LISTTASKBYMARKETERID", rs.data);
      console.log("LIST TASK BY MARKETERID- ACTION");
      console.log(rs.data);
    } catch (error) {
      console.log("ERROR - LIST TASK BY MARKETERID");
      console.log(error);
    }
  },
  async createTask({ commit }, data) {
    try {
      let rs = await createTask(data);
      if (rs.status == 202) {
        commit("SET_NEWTASK", rs.data);
        Vue.notify({
          group: 'notice',
          title: 'Create successful!',
          text: 'Task has been created successfully!',
          type: 'suc'
        });
        return 202;
      }
    } catch (error) {
      Vue.notify({
        group: 'notice',
        title: 'Create Failed!',
        text: 'Task has been created failed!',
        type: 'warn'
      });
      console.log("ERROR - CREATE TASK");
      console.log(error);
    }
  },
  async editTaskByID({ commit }, data) {
    try {
      console.log("data");
      console.log(data);
      let rs = await editTaskByID(data);
      console.log(rs.data);
      if (rs.status == 202) {
        // commit("UPDATE_LISTTASK", rs.data);
        // console.log("EDIT LIST TASK - ACTION");
        console.log(rs.data);
        Vue.notify({
          group: 'notice',
          title: 'Edit successful!',
          text: 'Task has been edited successfully!',
          type: 'suc'
        });
        return rs.status;
      }
    } catch (error) {
      Vue.notify({
        group: 'notice',
        title: 'Edit failed!',
        text: 'Task has been edited failed!',
        type: 'warn'
      });
      console.log("ERROR - EDIT TASK");
      console.log(error);
    }
  },
  async deleteTaskByID({ commit }, id) {
    try {
      let rs = await deleteTaskByID(id);
      if (rs.status == 200) {
        commit("DELETE_TASK", id);
        Vue.notify({
          group: 'notice',
          title: 'Delete successful!',
          text: 'Task has been deleted successfully!',
          type: 'suc'
        });
      }
    } catch (error) {
      console.log("ERROR - DELETE TASK");
      console.log(error);
      Vue.notify({
        group: 'notice',
        title: 'Delete Failed!',
        text: 'Task has been deleted failed!',
        type: 'warn'
      });
    }
  },
  async getListTagByCampaignID({ commit }, payload) {
    try {
      let rs = await getListTagByCampaignID(payload);
      commit("SET_LISTTAGBYCAMPAIGNID", rs.data);
      console.log("ACTIONS");
    } catch (error) {
      console.log("ERROR - DELETE TASK");
      console.log(error);
    }
  },
  async getTaskDetailUpdate({ commit }, payload) {
    try {
      let rs = await getTaskDetailUpdate(payload);
      commit("SET_TASK_DETAIL_UPDATE", rs.data);
    } catch (error) {
      console.log("ERROR - TASK DETAIL UPDATE");
      console.log(error);
    }
  }
  ,
  async getContentRequest({ commit }, payload) {
    try {
      let rs = await getContentRequest(payload);
      commit("SET_LIST_CONTENT_REQUEST", rs.data);
      console.log("LIST CONTENT REQUEST - ACTION");
      console.log(rs.data);
    } catch (error) {
      console.log("ERROR - LIST CONTENT REQUEST");
      console.log(error);
    }
  }
  ,
  async setApprovalContentRequest({ commit }, payload) {
    try {
      await setApprovalContentRequest(payload);
      router.push({
        name: "ApproveRequest"
      });
    } catch (error) {
      console.log("ERROR - APPROVAL CONTENT REQUEST");
      console.log(error);
    }
  },
  async getTaskByWriterId({ commit }, payload) {
    try {
      let rs = await getTaskByWriterId(payload);
      commit("SET_LIST_TASK_BY_WRITER_ID", rs.data);
    } catch (error) {
      console.log("ERROR - GET TASK BY WRITER ID");
      console.log(error);
    }
  },
  async startTask({ commit }, payload) {
    try {
      let rs = await startTask(payload);
      commit("SET_TASKDETAIL", rs.data);
    } catch (error) {
      console.log("ERROR - START TASK");
      console.log(error);
    }
  },
  async saveContent({ commit }, payload) {
    try {
      let rs = await saveContent(payload);
      if (rs.status == 200) {
        alert("Save Success!");
      }
    } catch (error) {
      console.log("ERROR - SAVE CONTENT");
      console.log(error);
    }
  },
  async submitContent({ commit }, payload) {
    try {
      let rs = await submitContent(payload);
      if (rs.status == 202) {
        alert("Submit Success!");
      }
    } catch (error) {
      console.log("ERROR - SUBMIT CONTENT");
      console.log(error);
    }
  },
  async getListTaskByEditorID({ commit }, payload) {
    try {
      let rs = await getListTaskByEditorID(payload);
      commit("SET_LIST_TASK_BY_EDITOR_ID", rs.data);
      console.log("LIST TASK BY EDITOR ID -ACTION");
      console.log(rs.data);
    } catch (error) {
      console.log("ERROR - LIST TASK BY EDITOR ID");
      console.log(error);
    }
  },
  async getListStatusTask({ commit }) {
    try {
      let rs = await getListStatusTask();
      if(rs.status == 200){
        commit("SET_LIST_STATUS_TASK",rs.data);
      }
      console.log("LIST STATUS TASK - ACTION");
      console.log(rs.data);
    } catch (error) {
      console.log("ERROR - LIST STATUS TASK");
      console.log(error);
    }
  },
  async getListStatusCampaign({ commit }) {
    try {
      let rs = await getListStatusCampaign();
      if(rs.status == 200){
        commit("SET_LIST_STATUS_CAMPAIGN",rs.data);
      }
      console.log("LIST STATUS TASK - ACTION");
      console.log(rs.data);
    } catch (error) {
      console.log("ERROR - LIST STATUS TASK");
      console.log(error);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions
};
