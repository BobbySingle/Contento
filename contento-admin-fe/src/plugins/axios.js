import axios from 'axios';
export default{
    install(Vue){
        Vue.prototype.$axios = axios.create({
            baseURL: "",
            // baseURL: "http://localhost:5000",          
            headers:{
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Methods": "*",
                "Content-Type":"application/json",
                // Authorization: localStorage.getItem("access-token")
            }
        })
    }
}