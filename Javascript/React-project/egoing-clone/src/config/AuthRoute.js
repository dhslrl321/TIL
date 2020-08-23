import React from "react";
import { Route, Redirect } from "react-router-dom";

const AuthRoute = ({ authenticated, component: Component, render, ...rest }) => {
  <Route {...rest} render={
    (props) => authenticated ? (
      render ? (render(props)) : (
        <Component {...props} />
      )
    )
  } />
}

export default AuthRoute;