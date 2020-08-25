import React from 'react';

const User = ({ username, email, name }) => {
  return (
    <div>
      <b>{username}</b> : ({email}) 의 이름은 <b>{name}</b> 입니다.
    </div>
  );
}


const UserList = ({ users }) => {

  return (
    <div>
      {users.map(user => (
        <User key={user.id} username={user.username} email={user.email} name={user.name} />
      ))}
    </div>
  );
}

export default UserList;