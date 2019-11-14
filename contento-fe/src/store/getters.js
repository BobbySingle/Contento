const getters = {
    getPaginationNews: state =>
        state.viewer.news.slice(
            (state.viewer.currentPage - 1) * state.viewer.itemsPerPage,
            (state.viewer.currentPage - 1) * state.viewer.itemsPerPage + state.viewer.itemsPerPage
        ),

    listCategory: state => state.viewer.tags,
    newsDetails: state => state.viewer.newsDetails,
    listTag: state => state.viewer.tags,


    topNews: state => state.viewer.news.slice(0, 10),

    //authentication
    profile: state => state.authentication.profile,
    fullname: state => state.authentication.fullName,
    getAccessToken: state => state.authentication.access_token,
    getUser: state => state.authentication.user,
    loggedUser: state => state.authentication.loggedUser,


}
export default getters;