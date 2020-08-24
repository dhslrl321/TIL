import React from 'react';

const User = ({ user }) => {
  return (
    <div>
      <b>{user.username}</b> <span>({user.email})</span>
    </div>
  )
}

const UserList = ({ users }) => {

  return (
    <div>
      {users.map(user => (
        <User key={user.id} user={user} />
      ))}
    </div>
  )
}

export default UserList;
