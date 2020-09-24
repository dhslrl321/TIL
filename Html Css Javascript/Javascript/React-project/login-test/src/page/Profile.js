import React from 'react';

export const Profile = ({ user }) => {
  const { email, password, name } = user || {};

  return (
    <div>
      <h1>Profile</h1>
      <dt>Email</dt>
      <dd>{email}</dd>
      <dt>Password</dt>
      <dd>{password}</dd>
      <dt>Name</dt>
      <dd>{name}</dd>
    </div>
  );
}