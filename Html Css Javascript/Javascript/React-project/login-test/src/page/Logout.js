import React from 'react';
import { withRouter } from 'react-router-dom';

const Logout = ({ logout, history }) => {

  const handleClick = () => {
    logout();
    history.push("/");
  }
  return (
    <div>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default withRouter(Logout);