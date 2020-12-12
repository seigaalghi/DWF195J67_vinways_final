import React from 'react';

const ErrorText = (props) => {
  return (
    <small className='color-danger' style={{ display: 'block' }}>
      {props.children}
    </small>
  );
};

export default ErrorText;
