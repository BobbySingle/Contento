import { publishContent, getFanPages, getFanPage, createFanPage, editFanPage, deleteFanPage, getFanPageFacebook, getFanPageWordpress, getFanPageCustomer, getFanPagesByContentID } from "../../services/batchjob";
import Vue from "vue";
import router from "@/router/index";
import Swal from 'sweetalert2';
/* eslint-disable no-console */


const state = {
    fanpages: [],
    fanpage: [],
    facebook: [],
    wordpress: [],
    customer: [],
    fanpagesContent: [],
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
    SET_FANPAGES_CONTENT(state, data) {
        state.fanpagesContent = data;
    }
};

const actions = {
    async publishContent({ commit }, payload) {
        try {
            let rs = await publishContent(payload);
            if (rs.status == 202) {
                Swal.fire(
                    {
                        title: 'Publishing',
                        type: 'success',
                        confirmButtonText: "OK",
                        timer: 3000,
                        allowOutsideClick: false
                    }
                ).then(rs => {
                    router.push({
                        name: "ManagePublish"
                    });
                });
            }
        } catch (error) {
            Swal.fire(
                {
                    title: "This content has been published! Can't publish again",
                    type: 'error',
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
            let rs = await getFanPage(payload);
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
            let rs = await getFanPages(payload);
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
            let rs = await createFanPage(payload);
            if (rs.status == 202) {
                Vue.notify({
                    group: 'notice',
                    title: 'Create successful!',
                    text: 'Fanpage has been created successfully!',
                    type: 'suc'
                });
                return 202;
            }
        } catch (error) {
            console.log("ERROR - CREATE FAN PAGE");
            console.log(error);
            Vue.notify({
                group: 'notice',
                title: 'Create failed!',
                text: 'Fanpage has been created failed!',
                type: 'warn'
            });
        }
    },
    async editFanPage({ commit }, payload) {
        try {
            let rs = await editFanPage(payload);
            if (rs.status == 202) {
                Vue.notify({
                    group: 'notice',
                    title: 'Edit successful!',
                    text: 'Fanpage has been edited successfully!',
                    type: 'suc'
                });
                return 202;
            }
        } catch (error) {
            console.log("ERROR - EDIT FAN PAGE");
            console.log(error);
            Vue.notify({
                group: 'notice',
                title: 'Edit failed!',
                text: 'Fanpage has been edited failed!',
                type: 'warn'
            });
        }
    },
    async deleteFanPage({ commit }, payload) {
        try {
            let rs = await deleteFanPage(payload);
            if (rs.status == 200) {
                commit("DELETE_FANPAGE", payload);
                Vue.notify({
                    group: 'notice',
                    title: 'Delete successful!',
                    text: 'Fanpage has been Delete successfully!',
                    type: 'suc'
                });
                return 202;
            }
        } catch (error) {
            console.log("ERROR - DELETE FAN PAGE");
            console.log(error);
            Vue.notify({
                group: 'notice',
                title: 'Edit failed!',
                text: 'Fanpage has been deleted failed!',
                type: 'warn'
            });
        }
    },
    async getFanPageFacebook({ commit }, payload) {
        try {
            let rs = await getFanPageFacebook(payload);
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
            let rs = await getFanPageWordpress(payload);
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
            let rs = await getFanPageCustomer(payload);
            if (rs.status == 200) {
                commit("SET_CUSTOMER", rs.data);
            }
        } catch (error) {
            console.log("ERROR -  CUSTOMER");
            console.log(error);
        }
    },
    async getFanPagesByContentID({ commit }, payload) {
        try {
            let rs = await getFanPagesByContentID(payload);
            if (rs.status == 200) {
                commit("SET_FANPAGES_CONTENT", rs.data);
            }
        } catch (error) {
            console.log("ERROR -  FANPAGE CONTENT");
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
