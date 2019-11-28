
const state = {
    isLoading: false
};
const mutations = {
    SET_LOADING(state, data) {
        state.isLoading = data;
    }
};
const actions = {
    spinnerLoading({ commit }, payload) {
        commit("SET_LOADING", payload);
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};