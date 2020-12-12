import React from 'react';
import { Field, ErrorMessage } from 'formik';
import ErrorText from './ErrorText';

const Input = ({ label, name, ...rest }) => {
  return (
    <div className='form-control'>
      <Field id={name} name={name} {...rest} placeholder={label} className='input' />
      <ErrorMessage name={name} component={ErrorText} />
    </div>
  );
};

export default Input;
