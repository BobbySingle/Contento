import { postTags } from "../../services/viewer"

const state = {
    news: [],
    currentPage: 1,
    itemsPerPage: 8,
    totalPages: 0,
}
const mutations = {
    setCurrentSelectedPage(state, payload) {
        state.currentPage = payload
    },
    setNextSelectedPage(state) {
        state.currentPage = state.currentPage + 1
    },
    setPrevSelectedPage(state) {
        state.currentPage = state.currentPage - 1
    },
    setNewsData(state, payload) {
        state.news = payload;
        state.totalPages = Math.ceil(
            state.news.length / state.itemsPerPage
        );
    }
}
const actions = {
    setCurrentSelectedPage({ commit }, payload) {
        commit("setCurrentSelectedPage", payload)
    },
    setNextSelectedPage({ commit }) {
        commit("setNextSelectedPage")

    },
    setPrevSelectedPage({ commit }) {
        commit("setPrevSelectedPage")
    },
    setPaginationData({ commit }, payload) {
        commit("setPaginationData", payload)
    },
    setNewsData({ commit }, payload) {
        commit("setNewsData", payload);
    },
    async postTags({ commit }, payload) {
        try {
            console.log(payload);
            let rs = await postTags(payload);
            console.log(rs);
            if (rs.status == 200) {
                console.log("OK")
                console.log(rs.data);
            }
        } catch (error) {
            console.log("Not OK");
            console.log(error);
        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
