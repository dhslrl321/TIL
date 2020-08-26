import React, { useState, useRef } from "react";
import UserList from "./components/UserList";
import CreateUser from "./components/CreateUser";

const App = () => {

  const [users, setUsers] = useState([
    { id: 1, username: "장원익", email: "dhslrl321@gmail.com" },
    { id: 2, username: "허혜진", email: "heo60070@gmail.com" },
    { id: 3, username: "박지훈", email: "jpark10947@gmail.com" },
    { id: 4, username: "최재웅", email: "mapu1123@gmail.com" },
  ])

  const [inputs, setInputs] = useState({
    username: "",
    email: ""
  })
  const { username, email } = inputs;

  const onChange = (e) => {
    const { name, value } = e.target;

    setInputs({
      ...inputs,
      [name]: value
    });
  }

  const nextId = useRef(5);
  const onCreate = () => {
    const user = {
      id: nextId.current,
      username,
      email
    }

    setUsers([...users, user]);

    console.log(...users);

    setInputs({
      username: "",
      email: ""
    })
    nextId.current += 1;
  }

  return (
    <div>
      <h1>DDodo Users</h1>
      <hr />

      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate} />

      <UserList
        users={users} />
    </div>
  );
}

export default App;
