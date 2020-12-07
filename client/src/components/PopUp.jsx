import React from 'react';
import { connect } from 'react-redux';
import { removeAlert } from '../redux/action/alert';

const PopUp = ({ alert, removeAlert }) => {
  const { message, alertType, isOpen } = alert;

  const closeHandler = () => {
    removeAlert();
  };

  return isOpen ? (
    <div className='modal'>
      <div className={`alert alert-${alertType}`}>
        <i className='far fa-times-circle' onClick={closeHandler}></i>
        <p>{message}</p>
      </div>
      <div className='closer' onClick={closeHandler}></div>
    </div>
  ) : null;
};

const mapStateToProps = (state) => {
  return {
    alert: state.alert,
  };
};

export default connect(mapStateToProps, { removeAlert })(PopUp);
