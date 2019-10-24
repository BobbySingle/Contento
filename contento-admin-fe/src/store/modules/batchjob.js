import { publishContent } from "../../services/batchjob";

/* eslint-disable no-console */


const state = {

};

const mutations = {

};

const actions = {
    async publishContent({ commit }, payload) {
        try {
            let rs = await publishContent(payload);
            if(rs.status == 202){
                alert("Publising");
            }
        } catch (error) {
            console.log("ERROR - PUBLISH CONTENT");
            console.log(error);
        }
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
};
