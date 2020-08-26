import React from 'react';


const User = ({ user }) => {
  return (
    <div>
      <b>{user.name}</b> <span>{user.email}</span>
      <button>삭제</button>
    </div>
  );
}

const UserList = ({ users }) => {
  return (
    <div>
      {users.map(user => (
        <User key={user.id} user={user} />
      ))}
    </div>
  );
}
export default UserList;