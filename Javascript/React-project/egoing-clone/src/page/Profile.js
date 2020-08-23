import React from "react";

const Profile = ({ user }) => {
  const { email, password, name } = user || {}
  return (
    <div>
      <h2>Profile</h2>
      <dt>Email</dt>
      <dd>{email}</dd>
      <dt>Password</dt>
      <dd>{password}</dd>
      <dt>Name</dt>
      <dd>{name}</dd>
    </div>
  );
}

export default Profile;