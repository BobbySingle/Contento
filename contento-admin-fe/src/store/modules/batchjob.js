import {
  APIpublishContent,
  APIgetFanPages,
  APIgetFanPage,
  APIcreateFanPage,
  APIeditFanPage,
  APIdeleteFanPage,
  APIgetFanPageFacebook,
  APIgetFanPageWordpress,
  APIgetFanPageCustomer,
  APIgetFanPagesByContentID,
  APIgetFanPagesByTagsId,
  APIcheckTokenGetLink,
  APIgetListContentByFanPagesID,
  APIgetInteractionFanpageByCampaignId,
  APIrecommendTimePublish,
  APIcancelContent
} from "../../services/batchjob";
import Vue from "vue";
import router from "@/router/index";
import Swal from "sweetalert2";
/* eslint-disable no-console */

const state = {
  fanpages: [],
  fanpage: [],
  facebook: [],
  wordpress: [],
  customer: [],
  fanpagesTag: [],
  link: "",
  listContentOfFanpage: [],
  listInteractionFanpageByCampaign: [],
  recommendPublishData: []
};

const mutations = {
  SET_FANPAGE: (state, data) => {
    state.fanpage = data;
  },
  SET_FANPAGES: (state, data) => {
    state.fanpages = data;
  },
  DELETE_FANPAGE(state, id) {
    const IDTaskDelete = state.fanpages.findIndex(c => c.id === id);
    state.fanpages.splice(IDTaskDelete, 1);
  },
  SET_FACEBOOK(state, data) {
    state.facebook = data;
  },
  SET_WORDPRESS(state, data) {
    state.wordpress = data;
  },
  SET_CUSTOMER(state, data) {
    state.customer = data;
  },
  SET_CONTENTS_OF_FANPAGE(state, data) {
    state.listContentOfFanpage = data;
  },
  SET_FANPAGES_TAG(state, data) {
    state.fanpagesTag = data;
  },
  SET_LINK(state, data) {
    state.link = data;
  },
  SET_INTERACTION_FANPAGE_BY_CAMPAIGN_ID(state, data) {
    state.listInteractionFanpageByCampaign = data;
  },
  RECOMMEND_PUBLISHTIME(state, data) {
    state.recommendPublishData = data;
  }
};

const actions = {
  async publishContent({ commit }, payload) {
    try {
      let rs = await APIpublishContent(payload);
      if (rs.status == 202) {
        Swal.fire({
          title: "Publishing",
          type: "success",
          confirmButtonText: "OK",
          timer: 3000,
          allowOutsideClick: false
        }).then(rs => {
          router.push({
            name: "ManagePublish"
          });
        });
      }
    } catch (error) {
      Swal.fire({
        title: "This content has been published! Can't publish again",
        type: "error",
        confirmButtonText: "OK",
        timer: 3000,
        allowOutsideClick: false
      }).then(rs => {
        router.push({
          name: "ManagePublish"
        });
      });
      console.log("ERROR - PUBLISH CONTENT");
      console.log(error);
    }
  },
  async getFanPage({ commit }, payload) {
    try {
      let rs = await APIgetFanPage(payload);
      if (rs.status == 200) {
        commit("SET_FANPAGE", rs.data);
      }
    } catch (error) {
      console.log("ERROR - GET FAN PAGE");
      console.log(error);
    }
  },
  async getFanPages({ commit }, payload) {
    try {
      let rs = await APIgetFanPages(payload);
      if (rs.status == 200) {
        commit("SET_FANPAGES", rs.data);
      }
    } catch (error) {
      console.log("ERROR - GET FAN PAGES");
      console.log(error);
    }
  },
  async createFanPage({ commit }, payload) {
    try {
      let rs = await APIcreateFanPage(payload);
      if (rs.status == 202) {
        Vue.notify({
          group: "notice",
          title: "Create successful!",
          text: "Fanpage has been created successfully!",
          type: "suc"
        });
        return 202;
      }
    } catch (error) {
      console.log("ERROR - CREATE FAN PAGE");
      console.log(error);
      Vue.notify({
        group: "notice",
        title: "Create failed!",
        text: "Fanpage has been created failed!",
        type: "warn"
      });
    }
  },
  async editFanPage({ commit }, payload) {
    try {
      let rs = await APIeditFanPage(payload);
      if (rs.status == 202) {
        Vue.notify({
          group: "notice",
          title: "Edit successful!",
          text: "Fanpage has been edited successfully!",
          type: "suc"
        });
        return 202;
      }
    } catch (error) {
      console.log("ERROR - EDIT FAN PAGE");
      console.log(error);
      Vue.notify({
        group: "notice",
        title: "Edit failed!",
        text: "Fanpage has been edited failed!",
        type: "warn"
      });
    }
  },
  async deleteFanPage({ commit }, payload) {
    try {
      let rs = await APIdeleteFanPage(payload);
      if (rs.status == 200) {
        commit("DELETE_FANPAGE", payload);
        Vue.notify({
          group: "notice",
          title: "Delete successful!",
          text: "Fanpage has been Delete successfully!",
          type: "suc"
        });
        return 202;
      }
    } catch (error) {
      console.log("ERROR - DELETE FAN PAGE");
      console.log(error);
      Vue.notify({
        group: "notice",
        title: "Edit failed!",
        text: "Fanpage has been deleted failed!",
        type: "warn"
      });
    }
  },
  async getFanPageFacebook({ commit }, payload) {
    try {
      let rs = await APIgetFanPageFacebook(payload);
      if (rs.status == 200) {
        commit("SET_FACEBOOK", rs.data);
      }
    } catch (error) {
      console.log("ERROR -  FACEBOOK");
      console.log(error);
    }
  },
  async getFanPageWordpress({ commit }, payload) {
    try {
      let rs = await APIgetFanPageWordpress(payload);
      if (rs.status == 200) {
        commit("SET_WORDPRESS", rs.data);
      }
    } catch (error) {
      console.log("ERROR -  WORDPRESS");
      console.log(error);
    }
  },
  async getFanPageCustomer({ commit }, payload) {
    try {
      let rs = await APIgetFanPageCustomer(payload);
      if (rs.status == 200) {
        commit("SET_CUSTOMER", rs.data);
      }
    } catch (error) {
      console.log("ERROR -  CUSTOMER");
      console.log(error);
    }
  },
  async getListContentByFanPagesID({ commit }, payload) {
    try {
      let rs = await APIgetListContentByFanPagesID(payload);
      if (rs.status == 200) {
        commit("SET_CONTENTS_OF_FANPAGE", rs.data);
      }
    } catch (error) {
      console.log("ERROR -  LIST CONTENT FANPAGE");
      console.log(error);
    }
  },
  async getFanPagesByTagsID({ commit }, payload) {
    try {
      let rs = await APIgetFanPagesByTagsId(payload);
      if (rs.status == 200) {
        commit("SET_FANPAGES_TAG", rs.data);
      }
    } catch (error) {
      console.log("ERROR -  FANPAGE TAG");
      console.log(error);
    }
  },
  async checkTokenGetLink({ commit }, payload) {
    try {
      let rs = await APIcheckTokenGetLink(payload);
      console.log("LINK", rs);
      if (rs.status == 202) {
        commit("SET_LINK", rs.data.link);
        return 202;
      }
    } catch (error) {
      console.log("ERROR -  LINK");
      console.log(error);
    }
  },
  async getInteractionFanpageByCampaignId({ commit }, payload) {
    try {
      let rs = await APIgetInteractionFanpageByCampaignId(payload);
      if (rs.status == 200) {
        commit("SET_INTERACTION_FANPAGE_BY_CAMPAIGN_ID", rs.data);
        console.log("INTERACTION_FANPAGE", rs.data);
        return 200;
      }
    } catch (error) {
      console.log("ERROR -  LINK");
      console.log(error);
      if (error.response.status == 400) {
        commit("SET_INTERACTION_FANPAGE_BY_CAMPAIGN_ID", []);
      }
    }
  },
  async recommendTimePublish({ commit }, payload) {
    try {
      let rs = await APIrecommendTimePublish(payload);
      if (rs.status == 200) {
        commit("RECOMMEND_PUBLISHTIME", rs.data);
        console.log("RECOMMEND_PUBLISHTIME", rs.data);
        return 200;
      }
    } catch (error) {
      console.log("ERROR -  LINK");
      console.log(error);
      if (error.response.status == 400) {
        commit("RECOMMEND_PUBLISHTIME", []);
      }
    }
  },
  async cancelContent({ commit }, payload) {
    try {
      let rs = await APIcancelContent(payload);
      if (rs.status == 200) {
        return 200;
      }
    } catch (error) {
      console.log("ERROR -  CANCEL CONTENT");
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
