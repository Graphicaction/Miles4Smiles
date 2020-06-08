import React from 'react';
import './FormBtn.scss';

export const FormBtn = (props) => (
  <button {...props} className="btn formBtn" data-dismiss="modal">
    {props.children}
  </button>
);
