import React from 'react';
import './Alert.scss';

const Alert = (props) => (
  <div
    role="alert"
    className={`alert alert-${props.type} fade in`}
    style={{ marginTop: 18, ...props.style }}
  >
    {props.children}
  </div>
);

export default Alert;
