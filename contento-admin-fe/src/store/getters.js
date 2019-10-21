
const getters = {
  //Authentication
  getAccessToken: state => state.authentication.access_token,
  getUser: state => state.authentication.user,
  loggedUser: state => state.authentication.loggedUser
};
export default getters;
