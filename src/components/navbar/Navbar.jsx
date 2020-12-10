import React from 'react';
import { Link } from 'react-router-dom';
import kasetlittle from '../../img/kasetlittle.svg';
import DropDown from './DropDown';

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='navbar-container'>
        <Link to='/' className='nav-icon'>
          <span>C</span> <img src={kasetlittle} alt='logo' /> <span className='color-primary'>Ways</span>{' '}
        </Link>
        <DropDown />
      </div>
    </div>
  );
};

export default Navbar;
