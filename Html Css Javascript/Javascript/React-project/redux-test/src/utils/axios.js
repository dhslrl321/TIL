import axios from "axios";

const DOMAIN = "http://localhost:4000";

axios.defaults.withCredentials = true; // 쿠키 전송을 받기 위해

export const request = (method, url, data) => { // request를 export 해서 어디서든 import 할 수 있도록 모듈화
  return axios({
    method,
    url: DOMAIN + url,
    data
  })
    .then((res) => res.data)
    .catch((err) => console.log(err));
}