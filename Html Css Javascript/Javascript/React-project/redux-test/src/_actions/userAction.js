import { REGISTER_USER } from "./types";
import { request } from "../utils/axios";

const USER_URL = "/user";

export function registerUser(dataToSubmit) {
  const data = request("post", USER_URL + "/register", dataToSubmit);

  return {
    type: REGISTER_USER,
    payload: data,
  }
}
