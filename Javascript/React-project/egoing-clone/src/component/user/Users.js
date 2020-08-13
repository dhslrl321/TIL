import React from 'react';
import { Route } from 'react-router-dom';
import UserList from './UserList';
import UserDetail from './UserDetail';

const Users = ({ match }) => {
  return (
    <div>
      <h2>Users</h2>
      <Route exact path={match.path} component={UserList} />
      <Route path={`${match.path}/:id`} component={UserDetail} />
    </div>
  );
}

export default Users;