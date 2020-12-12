import React from 'react';
import Input from './Input';
import Select from './Select';
import InputFile from './InputFile';

const FormControl = ({ control, ...rest }) => {
  switch (control) {
    case 'input':
      return <Input {...rest} />;
    case 'textarea':
    case 'select':
      return <Select {...rest} />;
    case 'radio':
    case 'checkbox':
    case 'date':
    case 'file':
      return <InputFile {...rest} />;
    default:
      return null;
  }
};

export default FormControl;
