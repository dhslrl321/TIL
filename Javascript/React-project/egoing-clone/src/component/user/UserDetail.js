import React from 'react';

const UserDetail = ({ match, history }) => {
  const users = [
    { id: 1, email: "kim@test.com", password: "123", name: "Kim" },
    { id: 2, email: "lee@test.com", password: "456", name: "Lee" },
    { id: 3, email: "park@test.com", password: "789", name: "Park" },
  ]

  const user = users.find((user) => user.id === match.param.id)

  return (
    <div>
      <h2>User Detail</h2>
      <dt>id</dt>
      <dd>{user.id}</dd>
      <dt>name</dt>
      <dd>{user.name}</dd>
      <button onClick={() => history.goBack()}>Back</button>
    </div>
  );
}

export default UserDetail;