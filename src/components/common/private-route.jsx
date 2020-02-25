import React from 'react';
import { Redirect, Route } from 'react-router-dom';

const PrivateRoute = ({
  component: Component,
  isAllowed = true,
  props = {},
  redirectTo = '/',
  ...rest
}) => {
  return (
    <Route
      {...rest}
      render={routeProps =>
        isAllowed ? (
          <Component {...routeProps} {...props} />
        ) : (
          <Redirect to={redirectTo} />
        )
      }
    />
  );
};

export default PrivateRoute;
