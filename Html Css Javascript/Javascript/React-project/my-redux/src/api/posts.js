// 통신 환경인 척 해당 함수를 호출하면 Promise 객체를 리턴함
const sleep = n => new Promise(resolve => setTimeout(resolve, n));


const posts = [
  { id: 1, title: "redux를 배워보자.", body: "ease to learn asdf;asdflkasdjfsa;lkdfjaslkdfjalskdfj" },
  { id: 2, title: "linux는 제껴보자.", body: "funnyasdfadfsadfasdfs" },
  { id: 3, title: "react마스터를 해야지?", body: "comfi" },
];

// async로 비동기 처리해주고 await 로 5초간 기다려 posts 배열 반환
export const getPosts = async () => {
  await sleep(500);
  return posts;
}

// Id로 게시글을 조회해
export const getPostById = async (id) => {
  await sleep(500);
  return posts.find(post => post.id === id);
}

