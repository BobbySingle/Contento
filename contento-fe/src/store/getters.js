const getters = {
    getPaginationNews: state =>
        state.viewer.news.slice(
            (state.viewer.currentPage - 1) * state.viewer.itemsPerPage,
            (state.viewer.currentPage - 1) * state.viewer.itemsPerPage + state.viewer.itemsPerPage
        ),

    listCategory: state => state.viewer.tags,
    newsDetails: state => state.viewer.newsDetails,


    topNews: state => state.viewer.news.slice(0, 10),

    //Content process
    listTag: state => state.contentprocess.listTag,
}
export default getters;