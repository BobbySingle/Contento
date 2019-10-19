import axios from '@/plugins/axios'

const API_URL = 'http://34.87.31.23:5002'

export function getListTags(){
    return axios.get(`${API_URL}/api/contentprocess/tags`);
}