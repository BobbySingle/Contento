import axios from 'axios';
export default{
    install(Vue){
        Vue.prototype.$axios = axios.create({
            baseURL: "http://34.87.79.47:8760",
            headers:{
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Content-Type":"application/json",
                // Authorization: localStorage.getItem("access-token")
            }
        })
    }
}