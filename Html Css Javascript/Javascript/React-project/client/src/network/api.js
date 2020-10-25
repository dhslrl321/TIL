import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/",
})

export const UserApi = {
  login: (username, password) => api.post("", {
    transactionTime: "2020-10-20T20:21:40.9999405",
    data: {
      username,
      password
    }
  })
}