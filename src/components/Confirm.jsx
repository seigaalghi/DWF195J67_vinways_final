import React from 'react';

const Confirm = ({ message, confirm, isOpen, close }) => {
  return isOpen ? (
    <div className='modal-container' onClick={close}>
      <h2>{message}</h2>
      <div className='btn btn-big bg-danger' onClick={close}>
        Cancel
      </div>
      <div className='btn btn-big' onClick={confirm}>
        Confirm
      </div>
    </div>
  ) : null;
};

export default Confirm;
