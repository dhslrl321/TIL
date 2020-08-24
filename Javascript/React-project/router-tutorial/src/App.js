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

  const users = [
    {
      id: 1,
      username: 'velopert',
      email: 'public.velopert@gmail.com'
    },
    {
      id: 2,
      username: 'tester',
      email: 'tester@example.com'
    },
    {
      id: 3,
      username: 'liz',
      email: 'liz@example.com'
    }
  ];

  const nextId = useRef(4);

  const onCreate = () => {

    setInputs({
      username: "",
      email: ""
    })
    nextId.current += 1;
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

      <UserList users={users} />
    </div>
  );
}
export default App;