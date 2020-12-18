
// Promise 에 기반한 Thunk를 만들어주는 함수
export const createPromiseThunk = (type, promiseCreator) => {

  // 이 함수는 promiseCreator가 단 하나의 파라미터만 받는다는 전제하에 작성되었습니다.
  // 만약 여러 종류의 파라미터를 전달해야하는 상황에서는 객체 타입의 파라미터를 받아오도록 하면 됩니다.
  // 예: writeComment({ postId: 1, text: '댓글 내용' });
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];

  return param => async dispatch => {
    // 요청 시작
    dispatch({ type, param });

    try {
      const payload = await promiseCreator(param);
      dispatch({ type: SUCCESS, payload });
    } catch (e) {
      dispatch({ type: ERROR, payload: e, error: true })
    }
  }
}



export const reducerUtils = {
  initial: (initialState = null) => ({
    loading: false,
    data: initialState,
    error: null
  }),
  loading: (prevState = null) => ({
    loading: true,
    data: prevState,
    error: null
  }),
  success: (payload) => ({
    loading: false,
    data: payload,
    error: null
  }),
  error: (error) => ({
    lading: false,
    data: null,
    error: error
  })
}

export const handleAsyncActions = (type, key) => {
  const [SUCCESS, ERROR] = [`${type}_SUCCESS`, `${type}_ERROR`];
  return (state, action) => {
    switch (action.type) {
      case type:
        return {
          ...state,
          [key]: reducerUtils.loading()
        }
      case SUCCESS:
        return {
          ...state,
          [key]: reducerUtils.success(action.payload)
        }
      case ERROR:
        return {
          ...state,
          [key]: reducerUtils.error(action.payload)
        }
      default:
        return state
    }
  }
}