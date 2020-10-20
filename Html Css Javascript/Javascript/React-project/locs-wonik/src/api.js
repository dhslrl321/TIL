import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
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
