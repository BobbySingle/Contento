import axios from '@/plugins/axios'

const API_URL = 'http://34.87.31.23:5001/api/campaign'

export function getCampaigns(userid) {
    return axios.get(`${API_URL}/campaigns/marketers/${userid}`);
  }
  
export function createCampaign(campaign){
  return axios.post(`${API_URL}/campaign`, campaign);
}

