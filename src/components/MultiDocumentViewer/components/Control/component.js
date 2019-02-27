import React from 'react';
import PropTypes from 'prop-types';

const ControlPropTypes = {
  icon: PropTypes.string,
  iconStyle: PropTypes.shape({}),
};

const ControlDefaultProps = {
  icon: '',
  iconStyle: undefined,
};

const Control = ({ icon, iconStyle, ...rest }) => (
  <button
    className="document-viewer-control mdl-js-button mdl-js-ripple-effect"
    {...rest}
  >
    <i className="material-icons" style={iconStyle}>
      {icon}
    </i>
  </button>
);

Control.propTypes = ControlPropTypes;
Control.defaultProps = ControlDefaultProps;

export default Control;
