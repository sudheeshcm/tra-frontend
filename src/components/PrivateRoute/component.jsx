import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { func, shape, string } from 'prop-types';

const privateRoutePropTypes = {
  component: func,
  currentUser: shape({}),
  render: func,
};

const privateRouteDefaultProps = {
  currentUser: null,
  component: null,
  render: null,
};

const PrivateRoute = ({
  component: Component,
  currentUser,
  render,
  ...rest
}) => (
  <Route
    {...rest}
    render={
      currentUser && render
        ? render
        : props =>
            currentUser ? (
              <Component {...props} />
            ) : (
              <Redirect
                to={{ pathname: '/', state: { from: props.location } }}
              />
            )
    }
  />
);

PrivateRoute.propTypes = privateRoutePropTypes;
PrivateRoute.defaultProps = privateRouteDefaultProps;

export default PrivateRoute;
