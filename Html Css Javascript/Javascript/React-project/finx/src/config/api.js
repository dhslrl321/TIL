import axios from "axios";

const api = axios.create({
  baseURL: "localhost:8080",
});

export const accountApi = {
  getAccount: () => api.get("/account"),
  getTransaction: () => api.get("/transaction"),
  postTransaction: (id, balance, create_date, money, content, account_id) => api.post("/transaction", {
    id,
    balance,
    create_date,
    money,
    content,
    account_id
  }),
  getFix: () => api.get("/fix"),
  postFix: (content, money, payment_date, account_id) => api.post("/fix", {
    content,
    money,
    payment_date,
    account_id
  }),
  // putFix
  deleteFix: () => api.delete("/fix")
}

export default api;