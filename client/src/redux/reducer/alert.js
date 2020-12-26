const { SET_ALERT, REMOVE_ALERT, SET_UPLOAD } = require('../types');

const initialState = {
  loading: true,
  isOpen: false,
  message: '',
  alertType: '',
  uploadProgress: {
    progress: 0,
    isOpen: false,
  },
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
        uploadProgress: {
          progress: 0,
          isOpen: false,
        },
      };
    case SET_UPLOAD:
      return {
        ...state,
        loading: false,
        uploadProgress: {
          progress: payload,
          isOpen: true,
        },
      };
    case REMOVE_ALERT:
      return {
        ...state,
        isOpen: false,
        message: '',
        alertType: '',
        loading: false,
        uploadProgress: {
          progress: 0,
          isOpen: false,
        },
      };
    default:
      return state;
  }
};

export default alertReducer;
