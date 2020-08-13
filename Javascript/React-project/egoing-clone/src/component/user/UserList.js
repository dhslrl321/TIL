import React from 'react';
import { Link } from 'react-router-dom';

const UserList = ({ match }) => {

  const users = [
    { id: 1, email: "kim@test.com", password: "123", name: "Kim" },
    { id: 2, email: "lee@test.com", password: "456", name: "Lee" },
    { id: 3, email: "park@test.com", password: "789", name: "Park" },
  ]

  return (
    <div>
      <h3>User List</h3>
      <ul>
        {users.map(({ id, email }) => (
          <li key={id}>
            <Link to={`${match.url}/${id}`}>{email}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList