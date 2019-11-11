import { APIgetListTag } from "../../services/contentprocess";

/* eslint-disable no-console */

const state = {
    listTag: [],
};

const mutations = {
    SET_LISTTAG(state, data) {
        state.listTag = data;
    },

};

const actions = {
    async getListTag({ commit }) {
        try {
            let rs = await APIgetListTag();
            commit("SET_LISTTAG", rs.data);
        } catch (error) {
            console.log("ERROR - LIST TASK ");
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
