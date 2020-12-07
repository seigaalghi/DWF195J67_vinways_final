import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { userLogout } from '../../redux/action/auth';
import Loading from '../Loading';

const DropDown = ({ auth: { loading, user }, userLogout }) => {
  const [open, setOpen] = useState(false);
  const logout = () => {
    userLogout();
  };
  return loading || !user ? (
    <Loading />
  ) : (
    <div className='dropdown-container'>
      <div className='dropdown' onClick={() => setOpen(!open)} onMouseLeave={() => setOpen(false)}>
        <div className='nav-user'>
          <img
            src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQKJDaIp-Y7qVXGu6LTeoxAiaRdJAJhp9z0yw&usqp=CAU'
            className='user'
            alt='avatar'
          />
        </div>
        {open ? (
          user.admin ? (
            <div className='drop'>
              <Link to='/playlist' className='dropdown-menu'>
                Playlist <i className='fas fa-play-circle'></i>
              </Link>
              <Link to='/add-music' className='dropdown-menu'>
                Add Music <i className='fas fa-file-audio'></i>
              </Link>
              <Link to='/add-artist' className='dropdown-menu'>
                Add Artist <i className='fas fa-user-tie'></i>
              </Link>
              <Link to='/list-trans' className='dropdown-menu'>
                Purchase(s) <i className='fas fa-comment-dollar'></i>
              </Link>
              <div onClick={logout} className='dropdown-menu'>
                Log Out <i className='fas fa-sign-out-alt' />
              </div>
            </div>
          ) : !user.premium ? (
            <div className='drop'>
              <Link to='/payment' className='dropdown-menu'>
                Pay <i className='fas fa-comment-dollar'></i>
              </Link>
              <div onClick={logout} className='dropdown-menu'>
                Log Out <i className='fas fa-sign-out-alt' />
              </div>
            </div>
          ) : (
            <div className='drop'>
              <Link to='/payment' className='dropdown-menu'>
                Pay <i className='fas fa-comment-dollar'></i>
              </Link>
              <Link to='/playlist' className='dropdown-menu'>
                Playlist <i className='fas fa-play-circle'></i>
              </Link>
              <div onClick={logout} className='dropdown-menu'>
                Log Out <i className='fas fa-sign-out-alt' />
              </div>
            </div>
          )
        ) : null}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { userLogout })(DropDown);
