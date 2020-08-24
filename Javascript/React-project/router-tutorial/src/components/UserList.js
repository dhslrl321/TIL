import React from 'react';

const User = ({ user }) => {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  )
}

const UserList = () => {
  const users = [
    { id: 1, username: "dhslrl321", email: "dhslrl321@gmail.com" },
    { id: 2, username: "heo0125", email: "heo015@gmail.com" },
    { id: 3, username: "park102", email: "ffuiw2@gmail.com" }
  ];

  return (
    <div>
      {users.map(user => {
        <User user={user} />
      })}
    </div>
  )
}

export default { User, UserList }
