import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api/",

});

export const UserApi = {

  findUser: (id) => api.get(`user/${id}`),
  login: (username, password) => api.post("user", {
    transactionTime: "2020-10-20T20:21:40.999305",
    resultCode: "OK",
    description: "Client",
    data: {
      username,
      password,
    }
  }),
  register: (username, password, email) => api.post("user", {
    transactionTime: "2020-10-20T20:21:40.999305",
    resultCode: "OK",
    description: "Client",
    data: {
      username,
      password,
      email
    }
  }),

}

export default api;
