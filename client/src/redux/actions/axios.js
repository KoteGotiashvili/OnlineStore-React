import axios from 'axios';
import URL from './Url';
const instanceAxios = axios.create({
  baseURL: `${URL}`,
  headers: {
    token: `${localStorage.getItem("token")}`,
  }
});



// update your token in axios instance
export const setAuthToken = (token) => {
  if (token ) {
    console.log('[axios] confirm new token update  ===>', token);
    instanceAxios.defaults.headers.common['token'] = `${token}`;
    
  } else {
    delete instanceAxios.defaults.headers.common['token'];
   
  }
};

export default setAuthToken;