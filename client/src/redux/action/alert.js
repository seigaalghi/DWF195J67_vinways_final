import { REMOVE_ALERT, SET_ALERT } from '../types';

export const setAlert = (message, alertType) => (dispatch) => {
  try {
    dispatch({
      type: SET_ALERT,
      payload: { message, alertType },
    });
  } catch (error) {
    console.log(error);
  }
};

export const removeAlert = () => (dispatch) => {
  try {
    dispatch({
      type: REMOVE_ALERT,
    });
  } catch (error) {
    console.log(error);
  }
};
