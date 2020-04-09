import React from "react";
import { Route, Redirect } from "react-router-dom";
// import { isAuthenticated, isUser } from "../../utils/auth";

/**
 * Private route redirects to login page is user is not authenticated.
 *
 * @param Component
 * @param rest
 * @returns {*}
 * @constructor
 */
export const PrivateRouteDoctor = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) =>
      sessionStorage.getItem("accessToken") &&
      sessionStorage.getItem("is_doctor") === "true" ? (
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
);

export default PrivateRouteDoctor;
