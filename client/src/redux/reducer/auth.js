import { AUTH_ERROR, LOAD_USER, LOGIN_SUCCESS, LOGOUT, REGISTER_FAILED, REGISTER_SUCCESS, ADD_PLAYLIST, REMOVE_PLAYLIST } from '../types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null,
};

const authReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
      };

    case REGISTER_FAILED:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    case LOAD_USER:
      return {
        ...state,
        ...payload,
        loading: false,
        isAuthenticated: true,
      };

    case AUTH_ERROR:
    case LOGOUT:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };
    case LOGIN_SUCCESS:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
      };
    case ADD_PLAYLIST:
      return {
        ...state,
        user: payload.user,
      };
    case REMOVE_PLAYLIST:
      return {
        ...state,
        user: payload.user,
      };
    default:
      return state;
  }
};

export default authReducer;
