/* 
프로미스에 관련된 리덕스 모듈을 다룰 때 고려사항 3가지.abs

1. 프로미스가 시작, 성공, 실패에 따라 다른 액션을 디스패치해야됨.
2. 각 프로미스마다 thunk 함수를 만들어야 함
3. 리듀서에서 액션에 따라 로딩중, 결과, 에러 상태를 변경해줘야 함.
*/


import * as postsAPI from '../api/posts'; // api/posts 안의 함수 모두 불러오기 

import {
  createPromiseThunk, //  type이랑 promiseCreator 을 매개변수로 받는 함수
  reducerUtils, // initial, loading, success, error 
  handleAsyncActions // 
} from '../lib/asyncUtils';


const GET_POSTS = 'GET_POSTS';
const GET_POSTS_SUCCESS = 'GET_POSTS_SUCCESS';
const GET_POSTS_ERROR = 'GET_POSTS_ERROR';

const GET_POST = 'GET_POST';
const GET_POST_SUCCESS = 'GET_POST_SUCCESS';
const GET_POST_ERROR = 'GET_POST_ERROR';


export const getPosts = createPromiseThunk(GET_POSTS, postsAPI.getPosts);
export const getPost = createPromiseThunk(GET_POST, postsAPI.getPostById);


const initialState = {
  posts: reducerUtils.initial(),
  post: reducerUtils.initial()
};

export default function posts(state = initialState, action) {
  switch (action.type) {
    case GET_POSTS:
    case GET_POSTS_SUCCESS:
    case GET_POSTS_ERROR:
      const postsReducer = handleAsyncActions(GET_POSTS, 'posts');
      return postsReducer(state, action);
    case GET_POST:
    case GET_POST_SUCCESS:
    case GET_POST_ERROR:
      return handleAsyncActions(GET_POST, 'post')(state, action);
    default:
      return state;
  }
}