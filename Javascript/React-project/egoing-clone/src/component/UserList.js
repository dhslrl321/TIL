import React from 'react';
import { users } from '../data.json';
import { Link } from 'react-router-dom';
import User from '../page/User';


const UserList = ({ match }) => {
  return (
    <div>
      <h2>User List</h2>
      <ul>
        {users.map(({ id, name }) => (
          <li key={id}>
            <Link to={`${match.url}/${id}`}>{name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default UserList;