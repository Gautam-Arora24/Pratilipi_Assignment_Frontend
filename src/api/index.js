import axios from 'axios';

const instance = axios.create({
/* Different options that can be passed for axios instance */
});
const BASE_URL = process.env.VUE_APP_BASE_URL;

export async function signup(email, password) {
  try {
    const result = await instance.post(`${BASE_URL}/user/signup`, { email, password });
    return result.data;
  } catch (err) {
    if (err.response.data) {
      return err.response.data;
    }
  }
}

export async function topContent() {
  try {
    const result = await instance.get(`${BASE_URL}/content/topcontent`);
    return result.data;
  } catch (err) {
    if (err.response.data) {
      return err.response.data;
    }
  }
}

export async function incrementLikeCount(contentId){
  try{
    const result = await instance.post(`${BASE_URL}/user/like/${contentId}`);
    return result.data;
  }
  catch(err){
    if(err.response.data){
      return err.response.data;
    }
  }
}
