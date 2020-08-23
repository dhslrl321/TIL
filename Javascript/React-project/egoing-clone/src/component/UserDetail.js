import React from 'react';
import { users } from "../data.json";
const UserDetail = ({ match, history }) => {
  const user = users.find((user) => user.id === match.params.id)

  return (
    <div>
      <h2>UserDetail</h2>
      <dt>id: {user.id}</dt>
      <dt>name: {user.name}</dt>
      <button onClick={() => history.goBack()}>Back</button>
    </div>
  );
}
export default UserDetail;