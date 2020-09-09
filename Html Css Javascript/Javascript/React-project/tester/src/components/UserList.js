import React from 'react';


const User = ({ user, onRemove, onToggle }) => {
  return (
    <div>
      <span
        style={{
          cursor: "pointer",
          color: user.active ? "green" : "black"
        }}
        onClick={() => onToggle(user.id)}><b>{user.username}</b> <span>{user.email}</span></span>
      <button onClick={() => onRemove(user.id)}>삭제</button>
    </div>
  );
}

const UserList = ({ users, onRemove, onToggle }) => {
  return (
    <div>
      {users.map(user => (
        <User key={user.id} user={user} onRemove={onRemove} onToggle={onToggle} />
      ))}
    </div>
  );
}
export default UserList;