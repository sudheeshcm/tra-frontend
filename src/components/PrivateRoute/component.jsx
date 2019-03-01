import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { func, shape, object } from 'prop-types';

const privateRoutePropTypes = {
  component: func,
  currentUser: shape({}),
  render: object,
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
    render={props => {
      if (currentUser) {
        return render || <Component {...props} />;
      }
      return (
        <Redirect
          to={{ pathname: '/login', state: { from: props.location } }}
        />
      );
    }}
  />
);

PrivateRoute.propTypes = privateRoutePropTypes;
PrivateRoute.defaultProps = privateRouteDefaultProps;

export default PrivateRoute;
