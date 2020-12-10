import React from 'react';

const Modal = ({ isOpen, source, close }) => {
  return isOpen ? (
    <div className='modal-container' onClick={close}>
      <div className='transaction-modal'>
        <img src={source} alt='transaction' />
      </div>
      <div className='btn btn-big' onClick={close}>
        Close
      </div>
    </div>
  ) : null;
};

export default Modal;
