import React, { Fragment, useState } from 'react';
import Background from '../components/auth/Background';
import { setAlert } from '../redux/action/alert';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { userRegister } from '../redux/action/auth';

const Register = ({ auth, setAlert, userRegister }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    password2: '',
    name: '',
  });
  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (formData.password !== formData.password2) {
      setAlert('Password does not match', 'danger');
    } else {
      userRegister(formData);
    }
  };

  const link = {
    name: 'Login',
    to: '/login',
    form: 'Register',
  };

  const form = (
    <Fragment>
      <form onSubmit={submitHandler}>
        <input type='text' value={formData.name} required onChange={changeHandler} name='name' className='input' placeholder='Full Name' />
        <input type='text' value={formData.email} required onChange={changeHandler} name='email' className='input' placeholder='Email' />
        <input
          type='password'
          value={formData.password}
          required
          onChange={changeHandler}
          name='password'
          className='input'
          placeholder='Passoword'
        />
        <input
          type='password'
          value={formData.password2}
          required
          onChange={changeHandler}
          name='password2'
          className='input'
          placeholder='Confirm Passoword'
        />
        <input type='submit' value='Register' className='btn btn-big' />
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

export default connect(mapStateToProps, { setAlert, userRegister })(Register);
