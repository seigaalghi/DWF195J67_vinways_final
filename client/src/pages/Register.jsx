import React, { Fragment } from 'react';
import Background from '../components/auth/Background';
import { setAlert } from '../redux/action/alert';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userRegister } from '../redux/action/auth';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import FormControl from '../components/form/FormControl';

const Register = ({ auth, userRegister }) => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    password2: '',
  };

  const onSubmit = (values) => {
    userRegister(values);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is Required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .matches(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/, 'Need at least one number')
      .required('Password is required'),
    password2: Yup.string()
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
      .required('Please confirm your password'),
  });

  const link = {
    name: 'Login',
    to: '/login',
    form: 'Register',
  };

  const form = (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {(formik) => (
        <Form>
          <FormControl control='input' label='Name' name='name' />
          <FormControl control='input' label='Email' name='email' />
          <FormControl control='input' label='Password' type='password' name='password' />
          <FormControl control='input' label='Confirm Password' type='password' name='password2' />
          <input type='submit' value='Register' className='btn btn-big' />
        </Form>
      )}
    </Formik>
  );

  if (auth.isAuthenticated) {
    return <Redirect to='/' />;
  }

  return (
    <Fragment>
      <Background form={form} link={link} />
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    auth: state.auth,
  };
};

export default connect(mapStateToProps, { setAlert, userRegister })(Register);
