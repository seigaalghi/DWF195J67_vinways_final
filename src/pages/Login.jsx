import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Background from '../components/auth/Background';
import { connect } from 'react-redux';
import { userLogin } from '../redux/action/auth';

const Login = ({ auth, userLogin }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    userLogin(formData);
  };

  const link = {
    name: 'Register',
    to: '/register',
    form: 'Login',
  };

  const form = (
    <Fragment>
      <form onSubmit={submitHandler}>
        <input type='text' value={formData.email} required onChange={changeHandler} name='email' className='input' placeholder='Email' />
        <input type='password' value={formData.password} required onChange={changeHandler} name='password' className='input' placeholder='Password' />
        <input type='submit' value='Login' className='btn btn-big' />
      </form>
    </Fragment>
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
