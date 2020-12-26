import {
  AUTH_ERROR,
  LOAD_USER,
  LOGIN_SUCCESS,
  LOGOUT,
  REGISTER_FAILED,
  REGISTER_SUCCESS,
  ADD_PLAYLIST,
  REMOVE_PLAYLIST,
  LOAD_USERS,
  DELETE_USER,
  REMOVE_PLAYLIST_LIKE,
  ADD_PLAYLIST_LIKE,
} from '../types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: false,
  loading: true,
  user: null,
  users: null,
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
        loading: true,
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
    case LOAD_USERS:
      return {
        ...state,
        users: payload.users,
      };
    case DELETE_USER:
      return {
        ...state,
        users: state.users.filter((user) => user.id !== payload.UserId),
      };

    case ADD_PLAYLIST_LIKE:
      return {
        ...state,
        user: {
          ...state.user,
          playlists: state.user.playlists.map((play) => (play.id === payload.id ? payload.like : play)),
        },
      };
    case REMOVE_PLAYLIST_LIKE:
      return {
        ...state,
        user: {
          ...state.user,
          playlists: state.user.playlists.map((play) =>
            play.id === payload.MusicId ? { ...play, likes: play.likes.filter((like) => like.id !== payload.UserId) } : play
          ),
        },
      };
    default:
      return state;
  }
};

export default authReducer;
