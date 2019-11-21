const getters = {
    getPaginationNews: state =>
        state.viewer.news.slice(
            (state.viewer.currentPage - 1) * state.viewer.itemsPerPage,
            (state.viewer.currentPage - 1) * state.viewer.itemsPerPage + state.viewer.itemsPerPage
        ),

    listCategory: state => state.viewer.tags,
    newsDetails: state => state.viewer.newsDetails,
    listTag: state => state.viewer.tags,
    trends: state => state.viewer.trends,
    ads: state => state.viewer.ads,
    recommend: state => state.viewer.recommend,
    getPaginationRecommend: state =>
    state.viewer.recommend.slice(
        (state.viewer.currentRecommendPage - 1) * state.viewer.itemsPerRecommendPage,
        (state.viewer.currentRecommendPage - 1) * state.viewer.itemsPerRecommendPage + state.viewer.itemsPerRecommendPage
    ),

    getPaginationCate: state =>
    state.viewer.category.slice(
        (state.viewer.currentCatePage - 1) * state.viewer.itemsPerCatePage,
        (state.viewer.currentCatePage - 1) * state.viewer.itemsPerCatePage + state.viewer.itemsPerCatePage
    ),


    //authentication
    profile: state => state.authentication.profileUser,
    fullname: state => state.authentication.fullName,
    getAccessToken: state => state.authentication.access_token,
    getUser: state => state.authentication.user,
    loggedUser: state => state.authentication.loggedUser,


}
export default getters;