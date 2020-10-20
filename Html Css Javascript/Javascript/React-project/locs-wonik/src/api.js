import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  params: {
    transactionTime: Date.now(),
    resultCode: "200 OK",
    description: "Client"
  }
});

export const UserApi = {
  findUser: (id) => api.get(`user/${id}`),
  createUser: (username, password, email) => api.post("user", {
    data: {
      data: {
        username,
        password,
        email
      }
    }
  }),

}

export default api;
