// import axios from 'axios';
// export default{
//     install(Vue){
//         Vue.prototype.$axios = axios.create({
//             baseURL: "http://34.87.79.47:8760",
//             headers:{
//                 "Access-Control-Allow-Origin": "*",
//                 "Access-Control-Allow-Methods": "*",
//                 "Content-Type":"application/json",
//                 // Authorization: localStorage.getItem("access-token")
//             }
//         })
//     }
// }


import axios from 'axios'

// const API_DOMAIN = 'http://34.87.31.23:5001'
const API_DOMAIN =''
const service = axios.create({
  baseURL: API_DOMAIN,
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*',
  'Content-Type': 'application/json'
})

export default service

// service (cho api mới) => 
// store (module mới/getters cho state mới/mutation với action) => 
// vào conpoment dùng mapGetters,mapState,mapAction dùng method như bt để call action đó để gọi api
// 3 bước vậy thôi