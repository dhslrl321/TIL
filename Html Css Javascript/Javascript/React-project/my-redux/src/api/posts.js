const sleep = n => new Promise(resolve => setTimeout(resolve, n));


const posts = [
  { id: 1, title: "redux", body: "ease" },
  { id: 2, title: "linux", body: "funny" },
  { id: 3, title: "react", body: "comfi" },
];

export const getPosts = async () => {
  await sleep(500);
  return posts;
}

export const getPostById = async (id) => {
  await sleep(500);
  return posts.find(post => post.id === id);
}

