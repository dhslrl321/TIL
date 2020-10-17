import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const TestApi = {
  getTest: () => api.get("test/get"),
  postTest: (data) => api.post("test/post", data),
  putTest: () => api.put("test/put"),
  delete: () => api.delete("test/delete")
}

export default api;