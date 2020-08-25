import React, { useState } from 'react';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';

const App = () => {

  const users = [
    { id: 1, username: "dhslrl321", email: "dhslrl321@gmail.com", name: "장원익" },
    { id: 2, username: "heo015", email: "heo015414@gmail.com", name: "허혜진" },
    { id: 3, username: "Jpark01", email: "Jpark23@gmail.com", name: "박지훈" },
    { id: 4, username: "mapu0029", email: "mapu0029@gmail.com", name: "최재웅" },
  ]
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    name: ""
  })
  const { username, email, name } = inputs;

  const handleCreate = (e) => {
    // 추가 버튼 클릭했을 시의 액션
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value
    })
  }

  const handleChange = () => {
    // 텍스트 필드가 변경되었을 때의 액션
  }

  return (
    <div>
      <CreateUser onClick={handleCreate} onChange={handleChange} />
      <UserList users={users} />
    </div>
  );
}

export default App;
