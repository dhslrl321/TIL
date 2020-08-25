import React, { useRef, useState } from "react";
import CreateUser from "./components/CreateUser";
import UserList from "./components/UserList";

const App = () => {

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

  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com',
      active: true
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com',
      active: false
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com',
      active: false
    }
  ]);

  const nextId = useRef(4);

  const onCreate = () => {

    const user = {
      id: nextId.current,
      username,
      email
    }

    setUsers([...users, user]);

    setInputs({
      username: "",
      email: ""
    })
    nextId.current += 1;
  }

  const onRemove = (id) => {
    setUsers(users.filter(user => user.id !== id));
  }

  const onToggle = (id) => {
    setUsers(
      users.map(user => (
        user.id === id ? { ...user, active: !user.active } : user
      ))
    )
  }
  return (
    <div>
      <br></br>
      <CreateUser
        username={username}
        email={email}
        onChange={onChange}
        onCreate={onCreate}
      /><br></br>

      <UserList users={users} onRemove={onRemove} onToggle={onToggle} />
    </div>
  );
}
export default App;