import { CLOSE_PLAYER, SET_PLAYER, SET_QUEUE } from '../types';

export const setPlayer = (music) => (dispatch) => {
  try {
    dispatch({
      type: SET_PLAYER,
      payload: music,
    });
  } catch (error) {
    console.log(error);
  }
};

export const setQueue = (queue) => (dispatch) => {
  try {
    dispatch({
      type: SET_QUEUE,
      payload: queue,
    });
  } catch (error) {
    console.log(error);
  }
};

export const closePlayer = () => (dispatch) => {
  try {
    dispatch({
      type: CLOSE_PLAYER,
    });
  } catch (error) {
    console.log(error);
  }
};
