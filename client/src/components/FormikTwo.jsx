import { Formik, ErrorMessage, Field, Form } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const FormikTwo = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    passwordConfirmation: '',
    file: '',
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, 'Need at least one number')
      .required('Password is required'),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match'),
  });

  return (
    <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
      <Form>
        <label>
          Name <br />
          <Field type='text' name='name' className='input' />
        </label>{' '}
        <ErrorMessage name='name' />
        <br />
        <label>
          Email <br />
          <Field type='text' name='email' className='input' />
        </label>
        <ErrorMessage name='email' />
        <br />
        <label>
          Password <br />
          <Field type='password' name='password' className='input' />
        </label>{' '}
        <br />
        <label>
          Password Confirmation <br />
          <Field type='password' name='passwordConfirmation' className='input' />
        </label>{' '}
        <ErrorMessage name='passwordConfirmation' />
        <label>
          {' '}
          <br />
          File <br />
          <Field>
            {(props) => {
              const { form } = props;
              return <input type='file' name='file' className='input' onChange={(e) => form.setFieldValue('file', e.target.files[0])} />;
            }}
          </Field>
        </label>{' '}
        <ErrorMessage name='file' />
        <br />
        <input type='submit' className='btn btn-big' />
      </Form>
    </Formik>
  );
};

export default FormikTwo;
