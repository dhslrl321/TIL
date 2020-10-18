import axios from "axios";
import { Common } from "./config";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  params: {
    transactionTIme: Date.now(),
    resultCode: "200 OK",
    description: "Client",
    data: {}
  }
});

export const TestApi = {
  getTest: () => api.get("test/get"),
  postTest: () => api.post("test/post", data),
  putTest: () => api.put("test/put"),
  delete: () => api.delete("test/delete")
}

export const UserApi = {
  findUser: () => api.get("user"),
  createUser: () => api.post("user", data),

}

export default api;