import React from "react";

const CreateUser = ({ onChange, onCreate }) => {
  return (
    <div>
      <input name="username" placeholder="이름" onChange={onChange} />
      <input name="email" placeholder="이메일" onChange={onChange} />
      <button onClick={onCreate}>추가</button>
    </div>
  );
}

export default CreateUser;