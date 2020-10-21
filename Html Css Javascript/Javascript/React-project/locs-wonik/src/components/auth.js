import { UserApi } from "../api"

export async function signin({ username, password }) {
  const user = null;

  try {
    const {
      data: result
    } = await UserApi.login(username, password);

    switch (result.resultCode) {
      case "101": {
        // 로그인 성공
      }
      case "102": {
        // 로그인 실패(비번 틀림)
      }
      case "103": {
        // 로그인 실패(아이디 틀림)
      }
      default: {
        console.log("signin method default switch case executed");
      }
    }

    const user = {
    }

    return
  } catch {
    console.log("Error in signin method");

  }

};