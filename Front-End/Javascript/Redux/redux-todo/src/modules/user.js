// state
const initialState = {}

// actions
export const SET_USER = "user/SET_USER";
export const CLEAR_USER = "user/CLEAR_USER";

// reducer
export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER: {
      return action.user
    }
    case CLEAR_USER: {
      return null;
    }
    default:
      return state;
  }
}

export const setUser = (user) => {
  return {
    type: SET_USER,
    user,
  }
}

export const clearUser = () => {
  return {
    type: CLEAR_USER,
  }
}