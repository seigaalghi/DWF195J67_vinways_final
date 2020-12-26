import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';
import Background from '../components/auth/Background';
import { connect } from 'react-redux';
import { userLogin } from '../redux/action/auth';
import * as Yup from 'yup';
import { Formik, Form } from 'formik';
import FormControl from '../components/form/FormControl';

const Login = ({ auth, userLogin }) => {
  const initialValues = {
    email: '',
    password: '',
  };
  const onSubmit = (values) => {
    userLogin(values);
  };
  const validationSchema = Yup.object({
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const link = {
    name: 'Register',
    to: '/register',
    form: 'Login',
  };

  const form = (
    <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validationSchema}>
      {(formik) => (
        <Form>
          <FormControl control='input' label='Email' type='text' name='email' />
          <FormControl control='input' label='Password' type='password' name='password' />
          <input type='submit' value='Login' className='btn btn-big' />
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

export default connect(mapStateToProps, { userLogin })(Login);
