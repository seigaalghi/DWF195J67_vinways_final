import React, { Fragment, useState } from 'react';
import { approvePayment, rejectPayment } from '../../redux/action/payment';
import { connect } from 'react-redux';
import Modal from '../universal/Modal';

const Table = ({ headers, transactions, approvePayment, rejectPayment }) => {
  const [modal, setModal] = useState({
    isOpen: false,
    src: '',
  });

  const closeModal = (e) => {
    if (e.target === e.currentTarget) {
      setModal({
        isOpen: false,
        src: '',
      });
    }
  };

  const approveHanlder = (userId, transactionId) => {
    approvePayment(userId, transactionId);
  };

  const rejectHanlder = (userId, transactionId) => {
    rejectPayment(userId, transactionId);
  };
  return (
    <Fragment>
      <Modal source={modal.src} isOpen={modal.isOpen} close={closeModal} />
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {transactions.map((transaction) => (
            <tr key={transaction.id}>
              <td>{transaction.id}</td>
              <td>{transaction.user.name}</td>
              <td>{transaction.account}</td>
              <td>
                <img
                  src={transaction.img}
                  alt={transaction.img}
                  onClick={() => setModal({ src: transaction.img, isOpen: true })}
                  className='thumbnail'
                />
              </td>
              <td>
                {Math.round(
                  (new Date(transaction.user.until).getTime() - Date.now()) / (60 * 60 * 24 * 1000)
                ) < 0 ? (
                  <span className='color-danger'>0</span>
                ) : (
                  <span className='color-primary'>
                    {Math.round(
                      (new Date(transaction.user.until).getTime() - Date.now()) /
                        (60 * 60 * 24 * 1000)
                    )}
                  </span>
                )}
              </td>
              <td>
                {transaction.user.premium ? (
                  <span className='color-primary'>Active</span>
                ) : (
                  <span className='color-danger'>Non Active</span>
                )}
              </td>
              <td>
                {transaction.status === 'PENDING' ? (
                  <span className='color-warning'>Pending</span>
                ) : transaction.status === 'APPROVED' ? (
                  <span className='color-primary'>Approved</span>
                ) : (
                  <span className='color-danger'>Rejected</span>
                )}
              </td>
              <td>
                {transaction.status === 'PENDING' ? (
                  <Fragment>
                    <div
                      className='btn'
                      onClick={() => {
                        approveHanlder(transaction.user.id, transaction.id);
                      }}>
                      Approve
                    </div>{' '}
                    <div
                      className='btn bg-danger'
                      onClick={() => {
                        rejectHanlder(transaction.user.id, transaction.id);
                      }}>
                      Reject
                    </div>
                  </Fragment>
                ) : transaction.status === 'APPROVED' ? (
                  <Fragment>
                    <div
                      className='btn bg-danger'
                      onClick={() => {
                        rejectHanlder(transaction.user.id, transaction.id);
                      }}>
                      Reject
                    </div>
                  </Fragment>
                ) : (
                  <Fragment>
                    <div
                      className='btn'
                      onClick={() => {
                        approveHanlder(transaction.user.id, transaction.id);
                      }}>
                      Approve
                    </div>
                  </Fragment>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default connect(null, { approvePayment, rejectPayment })(Table);
