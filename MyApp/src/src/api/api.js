// import axios from '../utils/axios'
import axios from 'axios'


export function register(equipInfo) {
  return axios({
    method: 'POST',
    url: `/Userservice/register`,
    data: equipInfo
  });
}

export function upload(param) {
  return axios({
    method: 'POST',
    url: `http://192.168.31.109:71/Videoservice/upload`,
    headers: {
        'Content-Type': 'multipart/form-data'
    },
    data: param,
    withCredentials:true
  });
}
