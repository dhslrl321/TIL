import React from 'react';


const User = ({ user, onRemove }) => {
  return (
    <div>
      <b>{user.username}</b> <span>{user.email}</span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
}

const UserList = ({ users, onRemove }) => {
  return (
    <div>
      {users.map(user => (
        <User key={user.id} user={user} onRemove={onRemove} />
      ))}
    </div>
  );
}
export default UserList;