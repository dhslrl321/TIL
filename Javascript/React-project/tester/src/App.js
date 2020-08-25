import React, { useState, useRef } from 'react';
import UserList from './components/UserList';
import CreateUser from './components/CreateUser';

const App = () => {

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    name: ""
  })

  const [users, setUsers] = useState([
    { id: 1, username: "dhslrl321", email: "dhslrl321@gmail.com", name: "장원익" },
    { id: 2, username: "heo015", email: "heo015414@gmail.com", name: "허혜진" },
    { id: 3, username: "Jpark01", email: "Jpark23@gmail.com", name: "박지훈" },
    { id: 4, username: "mapu0029", email: "mapu0029@gmail.com", name: "최재웅" },
  ]);

  const { username, email, name } = inputs;

  const handleChange = (e) => {
    // 텍스트 필드가 변경되었을 때의 액션
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value
    })
  }

  const nextId = useRef(5);

  const handleCreate = () => {
    // 추가 버튼 클릭했을 시의 액션

    const user = {
      id: nextId.current,
      username,
      email,
      name
    };

    setUsers([...users, user]);
    // setUsers(users.concat(user));
    setInputs({
      username: "",
      email: "",
      name: ""
    });

    nextId.current += 1;
  }

  return (
    <div>
      <CreateUser
        username={username}
        email={email}
        name={name}
        onCreate={handleCreate}
        onChange={handleChange} />

      <UserList users={users} />
    </div>
  );
}

export default App;
