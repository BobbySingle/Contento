import { createCookie, getContent, getTags, getNewsDetails } from "../../services/viewer"

const state = {
    news: [],
    currentPage: 1,
    itemsPerPage: 4,
    totalPages: 0,
    tags: [],
    newsDetails:null,
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
    },
    setTags(state, payload) {
        state.tags = payload;
    },
    setNewsDetails(state, payload){
        state.newsDetails = payload;
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
    async createCookie({ commit }, payload) {
        try {
            let rs = await createCookie(payload);
            console.log(rs);
            if (rs.status == 200) {
                console.log("OK")
                console.log(rs.data);
            }
        } catch (error) {
            console.log("Not OK");
            console.log(error);
        }
    },
    async getContent({ commit }, ) {
        try {
            let rs = await getContent();
            console.log(rs);
            if (rs.status == 200) {
                commit("setNewsData", rs.data);
                console.log("getContent OK");
                console.log(rs.data);
            }
        } catch (error) {
            console.log("getContent Not OK");
            console.log(error);
        }
    },
    async getTags({ commit }) {
        try {
            let rs = await getTags();
            console.log(rs);
            // if (rs.status == 200) {
                commit("setTags", rs.data);
            //     console.log("getTags OK");
            //     console.log(rs.data);
            // }
        } catch (error) {
            console.log("getTags Not OK");
            console.log(error);
        }
    },
    async getNewsDetails({commit}, payload){
        try {
            let rs = await getNewsDetails(payload);
            console.log("NEW");
            console.log(rs.data);
            if(rs.status == 200){
                commit("setNewsDetails", rs.data);
                return 200;
            }
        } catch (error) {
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
