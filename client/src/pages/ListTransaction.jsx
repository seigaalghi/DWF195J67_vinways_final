import React, { Fragment, useEffect } from 'react';
import Table from '../components/transaction/Table';
import { connect } from 'react-redux';
import { loadPayments } from '../redux/action/payment';
import Loading from '../components/Loading';

const ListTrans = ({ payment: { transactions, loading }, loadPayments }) => {
  const headers = ['ID', 'Name', 'Account Number', 'Transfer Proof', 'Remaining Active', 'Status User', 'Status Payment', 'Action'];

  useEffect(() => {
    loadPayments();
  }, [loadPayments]);
  return transactions || !loading ? (
    <Fragment>
      <div className='transaction'>
        <h1>Incoming Transaction</h1>
        <Table transactions={transactions} headers={headers} />
      </div>
    </Fragment>
  ) : (
    <Loading />
  );
};

const mapStateToProps = (state) => ({
  payment: state.payment,
});

export default connect(mapStateToProps, { loadPayments })(ListTrans);
