import React from 'react';
import logo from '../../img/kaset.svg';

const Loading = () => {
  return (
    <div className='loading-spinner'>
      <img src={logo} alt='loading' className='loading-img' />
    </div>
  );
};

export default Loading;
