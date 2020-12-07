const { SET_PLAYER, CLOSE_PLAYER, SET_QUEUE } = require('../types');

const initialState = {
  music: null,
  isOpen: false,
  queue: null,
  loading: true,
};

const playerReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case SET_PLAYER:
      return {
        ...state,
        music: payload,
        isOpen: true,
        loading: false,
      };
    case SET_QUEUE:
      return {
        ...state,
        queue: payload,
        isOpen: true,
        loading: false,
      };
    case CLOSE_PLAYER:
      return {
        ...state,
        music: null,
        queue: null,
        loading: true,
      };
    default:
      return state;
  }
};

export default playerReducer;
