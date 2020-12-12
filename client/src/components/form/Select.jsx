import React from 'react';
import { Field, ErrorMessage } from 'formik';
import ErrorText from './ErrorText';

const Select = ({ label, name, options, ...rest }) => {
  return (
    <div className='form-control'>
      <Field as='select' id={name} name={name} {...rest} placeholder={label} className='input'>
        <option className='input'>{label}</option>
        {options.map((option, index) => (
          <option className='input' value={option.value} key={index}>
            {option.key}
          </option>
        ))}
      </Field>
      <ErrorMessage name={name} component={ErrorText} />
    </div>
  );
};

export default Select;
