
const getters = {
  //Authentication
  getAccessToken: state => state.authentication.access_token,
  getUser: state => state.authentication.user,
  getAuth: state => state.authentication.isAuthen
};
export default getters;
