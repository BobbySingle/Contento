const getters = {
    getPaginationNews(state) {
        return state.viewer.news.slice(
            (state.viewer.currentPage - 1) * state.viewer.itemsPerPage,
            (state.viewer.currentPage - 1) * state.viewer.itemsPerPage + state.viewer.itemsPerPage
        );
    }
}
export default getters;