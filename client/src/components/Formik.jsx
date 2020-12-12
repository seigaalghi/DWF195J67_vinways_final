import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const Formik = () => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
  };

  const onSubmit = (values) => {
    console.log(values);
  };

  const validationSchema = Yup.object({
    name: Yup.string().required('Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .matches(/^[a-zA-Z0-9_]*$/, 'Need at least one number')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues,
    onSubmit,
    validationSchema,
  });

  return (
    <div onSubmit={formik.handleSubmit}>
      <form>
        <label>
          Name <br />
          <input type='text' name='name' value={formik.values.name} onBlur={formik.handleBlur} onChange={formik.handleChange} className='input' />
        </label>{' '}
        {formik.errors.name && formik.touched.name ? <p>{formik.errors.name}</p> : <p></p>}
        <br />
        <label>
          Email <br />
          <input type='text' name='email' value={formik.values.email} onBlur={formik.handleBlur} onChange={formik.handleChange} className='input' />
        </label>
        {formik.errors.email && formik.touched.email ? <p>{formik.errors.email}</p> : <p></p>}
        <br />
        <label>
          Password <br />
          <input
            type='password'
            name='password'
            value={formik.values.password}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            className='input'
          />
        </label>{' '}
        {formik.errors.password && formik.touched.password ? <p>{formik.errors.password}</p> : <p></p>}
        <br />
        <input type='submit' className='btn btn-big' />
      </form>
    </div>
  );
};

export default Formik;
