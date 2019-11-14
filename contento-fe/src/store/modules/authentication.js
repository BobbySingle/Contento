
import Swal from 'sweetalert2';
import Vue from 'vue'
import { APIlogin, APIregister } from '../../services/authentication';
const state = {
    access_token: "",
    user: [],
    fullName: "",
    loggedUser: false,
};

const mutations = {
    SET_ACCESS_TOKEN(state, data) {
        state.access_token = data;
    },
    SET_USER(state, data) {
        state.user = data;
    },
    SET_FULLNAME(state, data) {
        state.fullName = data;
    },
    SET_LOGGEDUSER(state, data) {
        state.loggedUser = data;
    },
};

const actions = {
    async login({ commit }, payload) {
        try {
            let rs = await APIlogin(payload.email, payload.password);
            if (rs.status == 200) {
                commit("SET_LOGGEDUSER", true);
                commit("SET_ACCESS_TOKEN", rs.data.token);
                commit("SET_USER", rs.data);
                commit("SET_FULLNAME", rs.data.fullName);
                localStorage.setItem("ProfileUser", JSON.stringify(rs.data));
                return 200;
            }
        } catch (error) {
            Swal.fire(
                {
                    title: 'Warning',
                    text: "Your email or password is incorrect. Please try again!",
                    icon: 'warning',
                    confirmButtonText: "OK",
                    timer: 3000,
                    allowOutsideClick: false
                }
            );
            console.log("ERROR - LOGIN ACTION");
            console.log(error);
        }
    },
    refreshFullName({ commit }) {
        let profile = JSON.parse(localStorage.getItem("ProfileUser").toString());
        commit("SET_FULLNAME", profile.fullName);
    },
    setLoggedUser({ commit }, payload) {
        commit("SET_LOGGEDUSER", payload);
    },
    setUser({ commit }, payload) {
        commit("SET_USER", payload);
    },
    setAccessToken({ commit }, payload) {
        commit("SET_ACCESS_TOKEN", payload);
    },
    async register({ commit }, payload) {
        try {
            let rs = await APIregister(payload);
            if (rs.status == 202) {
                let login = await APIlogin(payload.email, payload.password);
                if (login.status == 200) {
                    commit("SET_LOGGEDUSER", true);
                    commit("SET_ACCESS_TOKEN", login.data.token);
                    commit("SET_USER", login.data);
                    commit("SET_FULLNAME", login.data.fullName);
                    localStorage.setItem("ProfileUser", JSON.stringify(login.data));
                    return 202;
                }
            }
        } catch (error) {
            console.log("ERROR");
            console.log(error);
        }
    }
    // async getProfileInfo({ commit }, payload) {
    //     try {
    //       let rs = await APIgetProfileInfo(payload);
    //       commit("SET_PROFILE", rs.data);
    //     } catch (error) {
    //       console.log("ERROR -  PROFILE");
    //       console.log(error);
    //     }
    //   },
    // async checkPassword({ commit }, payload) {
    //     try {
    //       let rs = await APIcheckPassword(payload);
    //       if (rs.status == 202) {
    //         return 202;
    //       }
    //     } catch (error) {
    //     }
    //   },
    //   async changePassword({ commit }, payload) {
    //     try {
    //       let rs = await APIchangePassword(payload);
    //       if (rs.status == 202) {
    //         Vue.notify({
    //           group: 'notice',
    //           title: 'Change password successful!',
    //           text: 'Password has been changed successfully!',
    //           type: 'suc'
    //         })
    //         return 202;
    //       }
    //     } catch (error) {
    //       Vue.notify({
    //         group: 'notice',
    //         title: 'Change password failed!',
    //         text: 'Password has been changed failed!',
    //         type: 'warn'
    //       })
    //       console.log("ERROR -  CHANGE PASSWORD");
    //       console.log(error);
    //     }
    //   },
    //   async editProfileInfo({ commit }, payload) {
    //     try {
    //       let rs = await APIeditProfileInfo(payload);
    //       commit("SET_PROFILE", rs.data);
    //       commit("SET_FULLNAME", rs.data.fullName);
    //       let profile = JSON.parse(localStorage.getItem("ProfileUser").toString());
    //       profile.fullName = rs.data.fullName;
    //       localStorage.setItem("ProfileUser", JSON.stringify(profile));
    //       Vue.notify({
    //         group: 'notice',
    //         title: 'Edit successful!',
    //         text: 'Profile has been edited successfully!',
    //         type: 'suc'
    //       })
    //       return 202;
    //     } catch (error) {
    //       console.log("ERROR -  PROFILE");
    //       console.log(error);
    //       Vue.notify({
    //         group: 'notice',
    //         title: 'Edit failed!',
    //         text: 'Profile has been edited failed!',
    //         type: 'warn'
    //       })
    //     }
    //   },
}

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
