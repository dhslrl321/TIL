import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export const AuthRouter = ({ authenticated, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props => authenticated ? (
        render ? render(props) : <Component {...props} />
      ) : (
          <Redirect
            to={{ pathname: "/sign-in", state: { from: props.location } }} />
        )}
    />
  );
}