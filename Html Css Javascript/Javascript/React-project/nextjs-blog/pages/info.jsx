import React from "react";
import { data } from "../data/myInfo";
const Info = ({ userData }) => {
  console.log(userData);
  return (
    <div>
      <h1>this is about</h1>
    </div>
  );
};

// localhost:3000/1
// localhost:3000/2

export async function getStaticProps() {
  return {
    props: {
      userData: data,
    },
  };
}

// 해당 페이지에서 외부 데이터를 사용할 경우

// 해당 페이지의 url 에서 외부 데이터를 사용할 경우 / 게시글 번호
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: "1" } }, { params: { id: "2" } }],
    fallback: false,
  };
}
export default Info;
