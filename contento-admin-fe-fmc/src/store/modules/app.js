const state = {
    loadingData: false
  }
  
  const mutations = {
    TOGGLE_LOADING_DATA: (state, payload) => {
      state.loadingData = payload
    }
  }
  
  const actions = {
    toggleLoadingData({ commit }, payload) {
      commit('TOGGLE_LOADING_DATA', payload)
    }
  }
  
  export default {
    namespaced: true,
    state,
    mutations,
    actions
  }
  