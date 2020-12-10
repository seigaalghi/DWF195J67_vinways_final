import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className='not-found'>
      <h1>Oops.. Something Went Wrong..</h1>
      <h2>404 Not Found</h2>
      <Link to='/' className='btn btn-big'>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
