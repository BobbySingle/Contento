/* eslint-disable no-console */
import {
  APIgetListCampaignTask,
  APIgetTaskDetail,
  APIgetListTaskByMarketerID,
  APIgetListTag,
  APIdeleteTaskByID,
  APIgetListTagByCampaignID,
  APIcreateTask,
  APIgetTaskDetailUpdate,
  APIeditTaskByID,
  APIgetContentRequest,
  APIsetApprovalContentRequest,
  APIgetTaskByWriterId,
  APIstartTask,
  APIsaveContent,
  APIsubmitContent,
  APIgetListTaskByEditorID,
  APIgetListStatusTask,
  APIgetListStatusCampaign,
  APIgetListStatusPublish,
  APIgetStatisticsOneWeek,
  APIgetStatisticsOneMonth,
  APIgetStatisticsByTag,
  APIgetStatisticsTrend,
  APIgetStatisticsTrendMonth,
  APIgetStatisticsByTagMonth,
  APIgetStatisticsCampaign,
} from "../../services/contentprocess";

import router from "@/router/index";
import Vue from "vue";
import { get } from "http";

const state = {
  listCampaignTask: [],
  taskDetail: [],
  listTag: [],
  listTaskByMarketerID: [],
  listTagByCampaignID: [],
  taskDetailUpdate: "",
  listContentRequest: [],
  listTaskByWriterID: [],
  listTaskByEditorID: [],
  listStatusTask: [],
  listStatusCampaign: [],
  listStatusPublish: [],
  dataStatisticsOneWeek: [],
  dataStatisticsOneMonth: [],
  dataStatisticsByTag: [],
  dataStatisticsByTagMonth: [],
  dataStatisticsWeekTrend: [],
  dataStatisticsMonthTrend: [],
  dataStatisticsCampaign:[]
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
  SET_LIST_STATUS_PUBLISH(state, data) {
    state.listStatusPublish = data;
  },
  SET_DATA_STATISTICS_WEEK(state, data) {
    state.dataStatisticsOneWeek = data;
  },
  SET_DATA_STATISTICS_MONTH(state, data) {
    state.dataStatisticsOneMonth = data;
  },
  SET_DATA_STATISTICS_BY_TAG(state, data) {
    state.dataStatisticsByTag = data;
  },
  SET_DATA_STATISTICS_BY_TAG_MONTH(state, data) {
    state.dataStatisticsByTagMonth = data;
  },
  SET_DATA_STATISTICS_WEEK_TREND(state, data) {
    state.dataStatisticsWeekTrend = data;
  },
  SET_DATA_STATISTICS_MONTH_TREND(state, data) {
    state.dataStatisticsMonthTrend = data;
  },
  SET_DATA_STATISTICS_CAMPAIGN(state, data) {
    state.dataStatisticsCampaign = data;
  }
};

const actions = {
  async getListCampaignTask({ commit }, payload) {
    try {
      let rs = await APIgetListCampaignTask(payload);
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
      let rs = await APIgetTaskDetail(payload);
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
      let rs = await APIgetListTag();
      commit("SET_LISTTAG", rs.data);
    } catch (error) {
      console.log("ERROR - LIST TASK ");
      console.log(error);
    }
  },
  async getListTaskByMarketerID({ commit }, payload) {
    try {
      let rs = await APIgetListTaskByMarketerID(payload);
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
      let rs = await APIcreateTask(data);
      if (rs.status == 202) {
        commit("SET_NEWTASK", rs.data);
        Vue.notify({
          group: "notice",
          title: "Create successful!",
          text: "Task has been created successfully!",
          type: "suc"
        });
        return 202;
      }
    } catch (error) {
      Vue.notify({
        group: "notice",
        title: "Create Failed!",
        text: "Task has been created failed!",
        type: "warn"
      });
      console.log("ERROR - CREATE TASK");
      console.log(error);
    }
  },
  async editTaskByID({ commit }, data) {
    try {
      console.log("data");
      console.log(data);
      let rs = await APIeditTaskByID(data);
      console.log(rs.data);
      if (rs.status == 202) {
        console.log("EDIT LIST TASK - ACTION");
        console.log(rs.data);
        Vue.notify({
          group: "notice",
          title: "Edit successful!",
          text: "Task has been edited successfully!",
          type: "suc"
        });
        return rs.status;
      }
    } catch (error) {
      Vue.notify({
        group: "notice",
        title: "Edit failed!",
        text: "Task has been edited failed!",
        type: "warn"
      });
      console.log("ERROR - EDIT TASK");
      console.log(error);
    }
  },
  async deleteTaskByID({ commit }, id) {
    try {
      let rs = await APIdeleteTaskByID(id);
      if (rs.status == 200) {
        commit("DELETE_TASK", id);
        Vue.notify({
          group: "notice",
          title: "Delete successful!",
          text: "Task has been deleted successfully!",
          type: "suc"
        });
      }
    } catch (error) {
      console.log("ERROR - DELETE TASK");
      console.log(error);
      Vue.notify({
        group: "notice",
        title: "Delete Failed!",
        text: "Task has been deleted failed!",
        type: "warn"
      });
    }
  },
  async getListTagByCampaignID({ commit }, payload) {
    try {
      let rs = await APIgetListTagByCampaignID(payload);
      commit("SET_LISTTAGBYCAMPAIGNID", rs.data);
      console.log("ACTIONS");
    } catch (error) {
      console.log("ERROR - DELETE TASK");
      console.log(error);
    }
  },
  async getTaskDetailUpdate({ commit }, payload) {
    try {
      let rs = await APIgetTaskDetailUpdate(payload);
      commit("SET_TASK_DETAIL_UPDATE", rs.data);
    } catch (error) {
      console.log("ERROR - TASK DETAIL UPDATE");
      console.log(error);
    }
  },
  async getContentRequest({ commit }, payload) {
    try {
      let rs = await APIgetContentRequest(payload);
      commit("SET_LIST_CONTENT_REQUEST", rs.data);
      console.log("LIST CONTENT REQUEST - ACTION");
      console.log(rs.data);
    } catch (error) {
      console.log("ERROR - LIST CONTENT REQUEST");
      console.log(error);
    }
  },
  async setApprovalContentRequest({ commit }, payload) {
    try {
      await APIsetApprovalContentRequest(payload);
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
      let rs = await APIgetTaskByWriterId(payload);
      commit("SET_LIST_TASK_BY_WRITER_ID", rs.data);
    } catch (error) {
      console.log("ERROR - GET TASK BY WRITER ID");
      console.log(error);
    }
  },
  async startTask({ commit }, payload) {
    try {
      let rs = await APIstartTask(payload);
      commit("SET_TASKDETAIL", rs.data);
    } catch (error) {
      console.log("ERROR - START TASK");
      console.log(error);
    }
  },
  async saveContent({ commit }, payload) {
    try {
      let rs = await APIsaveContent(payload);
      if (rs.status == 200) {
        Vue.notify({
          group: "notice",
          title: "Save successful!",
          text: "Content has been save successfully!",
          type: "suc"
        });
        return 200;
      }
    } catch (error) {
      console.log("ERROR - SAVE CONTENT");
      console.log(error);
      Vue.notify({
        group: "notice",
        title: "Save failed!",
        text: "Content has been save failed!",
        type: "warn"
      });
    }
  },
  async autoSaveContent({ commit }, payload) {
    try {
      let rs = await APIsaveContent(payload);
      if (rs.status == 200) {
        Vue.notify({
          group: "notice",
          title: "Auto save successful!",
          text: "Content has been auto save successfully!",
          type: "suc"
        });
        return 200;
      }
    } catch (error) {
      console.log("ERROR - SAVE CONTENT");
      console.log(error);
      Vue.notify({
        group: "notice",
        title: "Auto save failed!",
        text: "Content has been auto save failed!",
        type: "warn"
      });
    }
  },
  async submitContent({ commit }, payload) {
    try {
      let rs = await APIsubmitContent(payload);
      if (rs.status == 202) {
        Vue.notify({
          group: "notice",
          title: "Submit successful!",
          text: "Content has been submit successfully!",
          type: "suc"
        });
        return 202;
      }
    } catch (error) {
      Vue.notify({
        group: "notice",
        title: "Submit failed!",
        text: "Content has been submit failed!",
        type: "warn"
      });
      console.log("ERROR - SUBMIT CONTENT");
      console.log(error);
    }
  },
  async getListTaskByEditorID({ commit }, payload) {
    try {
      let rs = await APIgetListTaskByEditorID(payload);
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
      let rs = await APIgetListStatusTask();
      if (rs.status == 200) {
        commit("SET_LIST_STATUS_TASK", rs.data);
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
      let rs = await APIgetListStatusCampaign();
      if (rs.status == 200) {
        commit("SET_LIST_STATUS_CAMPAIGN", rs.data);
      }
      console.log("LIST STATUS TASK - ACTION");
      console.log(rs.data);
    } catch (error) {
      console.log("ERROR - LIST STATUS TASK");
      console.log(error);
    }
  },
  async getListStatusPublish({ commit }) {
    try {
      let rs = await APIgetListStatusPublish();
      if (rs.status == 200) {
        commit("SET_LIST_STATUS_PUBLISH", rs.data);
      }
      console.log("LIST STATUS PUBLISH - ACTION");
      console.log(rs.data);
    } catch (error) {
      console.log("ERROR - LIST STATUS PUBLISH");
      console.log(error);
    }
  },
  async getStatisticsOneWeek({ commit }, payload) {
    try {
      let rs = await APIgetStatisticsOneWeek();
      if (rs.status == 200) {
        commit("SET_DATA_STATISTICS_WEEK", rs.data);
        return 200;
      }
    } catch (error) {
      console.log("ERROR - Statistics WEEK");
      console.log(error);
      if (error.response.status == 400) {
        commit("SET_DATA_STATISTICS_WEEK", []);
      }
    }
  },
  async getStatisticsOneMonth({ commit }, payload) {
    try {
      let rs = await APIgetStatisticsOneMonth();
      if (rs.status == 200) {
        commit("SET_DATA_STATISTICS_MONTH", rs.data);
        return 200;
      }
    } catch (error) {
      console.log("ERROR - Statistics MONTH");
      console.log(error);
      if (error.response.status == 400) {
        commit("SET_DATA_STATISTICS_MONTH", []);
      }
    }
  },
  async getStatisticsByTag({ commit }, payload) {
    try {
      let rs = await APIgetStatisticsByTag(payload);
      if (rs.status == 200) {
        commit("SET_DATA_STATISTICS_BY_TAG", rs.data);
        return 200;
      }
    } catch (error) {
      console.log("ERROR - Statistics By TAG");
      console.log(error);
      if (error.response.status == 400) {
        commit("SET_DATA_STATISTICS_BY_TAG", []);
      }
    }
  },
  async getStatisticsByTagMonth({ commit }, payload) {
    try {
      let rs = await APIgetStatisticsByTagMonth(payload);
      if (rs.status == 200) {
        commit("SET_DATA_STATISTICS_BY_TAG_MONTH", rs.data);
        return 200;
      }
    } catch (error) {
      console.log("ERROR - Statistics By TAG MONTH");
      console.log(error);
      if (error.response.status == 400) {
        commit("SET_DATA_STATISTICS_BY_TAG_MONTH", []);
      }
    }
  },
  async getStatisticsTrend({ commit }, payload) {
    try {
      let rs = await APIgetStatisticsTrend();
      if (rs.status == 200) {
        commit("SET_DATA_STATISTICS_WEEK_TREND", rs.data);
        return 200;
      }
    } catch (error) {
      console.log("ERROR - Statistics Week Trend");
      console.log(error);
      if (error.response.status == 400) {
        commit("SET_DATA_STATISTICS_WEEK_TREND", []);
      }
    }
  },
  async getStatisticsTrendMonth({ commit }, payload) {
    try {
      let rs = await APIgetStatisticsTrendMonth();
      if (rs.status == 200) {
        commit("SET_DATA_STATISTICS_MONTH_TREND", rs.data);
        return 200;
      }
    } catch (error) {
      console.log("ERROR - Statistics Month Trend");
      console.log(error);
      if (error.response.status == 400) {
        commit("SET_DATA_STATISTICS_MONTH_TREND", []);
      }
    }
  },
  async getStatisticsCampaign({ commit }, payload) {
    try {
      let rs = await APIgetStatisticsCampaign(payload);
      if (rs.status == 200) {
        commit("SET_DATA_STATISTICS_CAMPAIGN", rs.data);
        return 200;
      }
    } catch (error) {
      console.log("ERROR - Statistics Campaign");
      console.log(error);
      if (error.response.status == 400) {
        commit("SET_DATA_STATISTICS_CAMPAIGN", []);
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
