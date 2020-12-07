import React from 'react';
import { Link } from 'react-router-dom';
import kaset from '../../img/kaset.svg';
import kasetlittle from '../../img/kasetlittle.svg';

const Background = ({ form, link }) => {
  return (
    <div className='background'>
      <nav className='user-nav'>
        <span>C</span> <img src={kasetlittle} /> <span className='color-primary'>Ways</span>
      </nav>
      <div className='background-container'>
        <h1>Listening is</h1>
        <h1 className='everything'>
          <img src={kaset} className='kaset' /> Everything
        </h1>
        <p>pay and access millions of songs</p>
        <Link to={link.to} className='btn btn-small'>
          {link.name}
        </Link>
      </div>
      <div className='form'>
        <h2>{link.form}</h2>
        {form}
      </div>
    </div>
  );
};

export default Background;
