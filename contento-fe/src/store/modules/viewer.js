import { APIcreateCookie, APIgetContent, APIgetTags, APIgetNewsDetails, APIgetTrends, APIgetAds, APIgetNewsByTags, APIrecommend, APICountContent } from "../../services/viewer"

const state = {
    news: [],
    currentPage: 1,
    itemsPerPage: 4,
    totalPages: 0,

    trends: [],
    ads: [],

    recommend: [],
    currentRecommendPage: 1,
    itemsPerRecommendPage: 4,
    totalRecommendPages: 0,

    category: [],
    currentCatePage: 1,
    itemsPerCatePage: 12,
    totalCatePages: 0,

    tags: [],
    categoryName: "",
    newsDetails: null
}
const mutations = {
    SET_CURRENT_SELECTED_PAGE(state, payload) {
        state.currentPage = payload
    },
    SET_NEXT_SELECTED_PAGE(state) {
        state.currentPage = state.currentPage + 1
    },
    SET_PREV_SELECTED_PAGE(state) {
        state.currentPage = state.currentPage - 1
    },
    SET_NEWS_DATA(state, payload) {
        state.news = payload;
        state.totalPages = Math.ceil(
            state.news.length / state.itemsPerPage
        );
    },
    SET_CURRENT_CATE_SELECTED_PAGE(state, payload) {
        state.currentCatePage = payload
    },
    SET_NEXT_CATE_SELECTED_PAGE(state) {
        state.currentCatePage = state.currentCatePage + 1
    },
    SET_PREV_CATE_SELECTED_PAGE(state) {
        state.currentCatePage = state.currentCatePage - 1
    },
    SET_CATE_DATA(state, payload) {
        state.category = payload;
        state.totalCatePages = Math.ceil(
            state.category.length / state.itemsPerCatePage
        );
    },
    SET_CURRENT_RECOMMEND_SELECTED_PAGE(state, payload) {
        state.currentRecommendPage = payload
    },
    SET_NEXT_RECOMMEND_SELECTED_PAGE(state) {
        state.currentRecommendPage = state.currentRecommendPage + 1
    },
    SET_PREV_RECOMMEND_SELECTED_PAGE(state) {
        state.currentRecommendPage = state.currentRecommendPage - 1
    },
    SET_RECOMMEND_DATA(state, payload) {
        state.recommend = payload;
        state.totalRecommendPages = Math.ceil(
            state.recommend.length / state.itemsPerRecommendPage
        );
    },
    SET_TAGS(state, payload) {
        state.tags = payload;
    },
    SET_NEWS_DETAILS(state, payload) {
        state.newsDetails = payload;
    },
    SET_TRENDS(state, data) {
        state.trends = data
    },
    SET_ADS(state, data) {
        state.ads = data
    },
    SET_CATEGORY_NAME(state, data) {
        state.categoryName = data
    },
}
const actions = {
    setCurrentSelectedPage({ commit }, payload) {
        commit("SET_CURRENT_SELECTED_PAGE", payload)
    },
    setNextSelectedPage({ commit }) {
        commit("SET_NEXT_SELECTED_PAGE")

    },
    setPrevSelectedPage({ commit }) {
        commit("SET_PREV_SELECTED_PAGE")
    },
    setNewsData({ commit }, payload) {
        commit("SET_NEWS_DATA", payload);
    },
    setCurrentCateSelectedPage({ commit }, payload) {
        commit("SET_CURRENT_CATE_SELECTED_PAGE", payload)
    },
    setNextCateSelectedPage({ commit }) {
        commit("SET_NEXT_CATE_SELECTED_PAGE")

    },
    setPrevCateSelectedPage({ commit }) {
        commit("SET_PREV_CATE_SELECTED_PAGE")
    },
    setCateData({ commit }, payload) {
        commit("SET_RECOMMEND_DATA", payload);
    },
    setCurrentRecommendSelectedPage({ commit }, payload) {
        commit("SET_CURRENT_RECOMMEND_SELECTED_PAGE", payload)
    },
    setNextRecommendSelectedPage({ commit }) {
        commit("SET_NEXT_RECOMMEND_SELECTED_PAGE")

    },
    setPrevRecommendSelectedPage({ commit }) {
        commit("SET_PREV_RECOMMEND_SELECTED_PAGE")
    },
    setRecommendData({ commit }, payload) {
        commit("SET_RECOMMEND_DATA", payload);
    },
    async getContent({ commit }, payload) {
        try {
            let rs = await APIgetContent(payload);
            console.log(rs);
            if (rs.status == 200) {
                commit("SET_NEWS_DATA", rs.data);
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
            let rs = await APIgetTags();
            console.log(rs);
            commit("SET_TAGS", rs.data);

        } catch (error) {
            console.log("getTags Not OK");
            console.log(error);
        }
    },
    async getNewsDetails({ commit }, payload) {
        try {
            let rs = await APIgetNewsDetails(payload);
            console.log("NEW");
            console.log(rs.data);
            if (rs.status == 200) {
                commit("SET_NEWS_DETAILS", rs.data);
                return 200;
            }
        } catch (error) {
            console.log(error);
        }
    },
    async getTrends({ commit }, payload) {
        try {
            let rs = await APIgetTrends(payload);
            console.log("TRENDS");
            console.log(rs.data);
            if (rs.status == 200) {
                commit("SET_TRENDS", rs.data);
                return 200;
            }
        } catch (error) {
            console.log(error);
        }
    },
    async getAds({ commit }, payload) {
        try {
            let rs = await APIgetAds(payload);
            console.log("ADS");
            console.log(rs.data);
            if (rs.status == 200) {
                commit("SET_ADS", rs.data);
                return 200;
            }
        } catch (error) {
            console.log(error);
        }
    },
    async getNewsTags({ commit }, payload) {
        try {
            let rs = await APIgetNewsByTags(payload);
            console.log("NEWS");
            console.log(rs.data);
            if (rs.status == 200) {
                commit("SET_CATE_DATA", rs.data);
                return 200;
            }
        } catch (error) {
            console.log(error);
        }
    },
    async getRecommendNews({ commit }, payload) {
        try {
            let rs = await APIrecommend(payload);
            console.log("RECOMMEND");
            console.log(rs.data);
            if (rs.status == 200) {
                commit("SET_RECOMMEND_DATA", rs.data);
                return 200;
            }
        } catch (error) {
            console.log(error);
        }
    },
    setCategoryName({ commit }, payload) {
        try {
            commit("SET_CATEGORY_NAME", payload);
        } catch (error) {
            console.log(error);
        }
    },
    async countContent({ commit }, payload) {
        try {
            let rs = await APICountContent(payload);
            if (rs.status == 202) {
                console.log("COUNT_CONTENT");
                console.log(rs.data);
                return 202;
            }
        } catch (error) {
            console.log(error)

        }
    }
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
