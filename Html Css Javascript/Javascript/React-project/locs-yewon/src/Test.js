import React, { useState, useRef } from 'react';

const User = ({ user }) => {
  return (
    <div>
      {user.userName} ({user.userAge})
    </div>
  );
}

const Test = () => {

  const [users, setUsers] = useState([]);

  const [inputs, setInputs] = useState({
    userName: "",
    userAge: ""
  })


  const { userName, userAge } = inputs;
  const handleOnChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }
  const handleOnClick = () => {
    const { userName, userAge } = inputs;

    const user = {
      userName,
      userAge
    }

    setUsers([
      ...users,
      user
    ])

    setInputs({
      userName: "",
      userAge: ""
    })
  };

  return (
    <div>
      <h1>사용자를 입력하세요!</h1>
      <div>
        <input type="text" name="userName" onChange={handleOnChange} value={userName} />
        <input type="text" name="userAge" onChange={handleOnChange} value={userAge} />
      </div>
      <button onClick={handleOnClick}>add</button>
      {users.map(user => (
        <User user={user} />
      ))}
    </div >
  );
}

export default Test;