import React from 'react';
import { Field, ErrorMessage } from 'formik';
import ErrorText from './ErrorText';

const InputFile = ({ label, name, ...rest }) => {
  return (
    <div className='form-control'>
      <label htmlFor={name} className='input label-input-file'>
        {label}
      </label>
      <Field>
        {(props) => {
          const { form } = props;
          const { setFieldValue } = form;
          return (
            <input
              type='file'
              name={name}
              id={name}
              accept='image/*'
              className='input-file'
              onChange={(e) => (e.target.files ? setFieldValue([name, e.target.files[0]]) : null)}
            />
          );
        }}
      </Field>
      <ErrorMessage name={name} component={ErrorText} />
    </div>
  );
};

export default InputFile;
