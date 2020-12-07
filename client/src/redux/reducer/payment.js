const { UPLOAD_PAYMENT, GET_PAYMENTS, APPROVE, REJECT } = require('../types');

const initialState = {
  loading: true,
  transactions: null,
};

const paymentReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case UPLOAD_PAYMENT:
      return {
        ...state,
      };
    case GET_PAYMENTS:
      return {
        ...state,
        loading: false,
        ...payload,
      };
    case APPROVE:
      return {
        ...state,
        loading: false,
        transactions: state.transactions.map((transaction) => (transaction.id === payload.transaction.id ? payload.transaction : transaction)),
      };
    case REJECT:
      return {
        ...state,
        loading: false,
        transactions: state.transactions.map((transaction) => (transaction.id === payload.transaction.id ? payload.transaction : transaction)),
      };
    default:
      return state;
  }
};

export default paymentReducer;
