const SET_USER = "SET_USER";
const SET_TOKEN = "SET_TOKEN";

export const setUser = (username, password) => ({
  type: SET_USER,
  username,
  password
});

export const setToken = token => ({
  type: SET_TOKEN,
  token
})

const initialState = {
  username: "",
  password: "",
  token: ""
}

export default function user(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        username: action.username,
        password: action.password,
      };

    case SET_TOKEN:
      return {
        ...state,
        token: action.token
      };

    default:
      return state;
  }
}