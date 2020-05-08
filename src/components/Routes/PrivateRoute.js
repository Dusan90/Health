import React from "react";
import { Route, Redirect, Switch } from "react-router-dom";
// import { isAuthenticated, isUser } from "../../utils/auth";

/**
 * Private route redirects to login page is user is not authenticated.
 *
 * @param Component
 * @param rest
 * @returns {*}
 * @constructor
 */
export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Switch>
    <Route
      {...rest}
      render={(props) =>
        sessionStorage.getItem("accessToken") &&
        sessionStorage.getItem("is_doctor") === "false" ? (
          <Component {...props} />
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: { from: props.location },
            }}
          />
        )
      }
    />
  </Switch>
);

export default PrivateRoute;
