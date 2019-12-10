import axios from '../utils/axios'


export function register(equipInfo) {
  return axios({
    method: 'POST',
    url: `/Userservice/register`,
    data: equipInfo
  });
}