const { SET_ALERT, REMOVE_ALERT } = require('../types');

const initialState = {
  loading: true,
  isOpen: false,
  message: '',
  alertType: '',
};

const alertReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_ALERT:
      return {
        ...state,
        isOpen: true,
        message: payload.message,
        alertType: payload.alertType,
        loading: false,
      };
    case REMOVE_ALERT:
      return {
        ...state,
        isOpen: false,
        message: '',
        alertType: '',
        loading: false,
      };
    default:
      return state;
  }
};

export default alertReducer;
