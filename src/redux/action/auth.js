import axios from 'axios';
import { AUTH_ERROR, LOAD_USER, LOGIN_SUCCESS, REGISTER_SUCCESS, LOGOUT, ADD_PLAYLIST, REMOVE_PLAYLIST, DELETE_USER, LOAD_USERS } from '../types';
import { setAlert } from './alert';
import setAuth from '../utility/setAuthToken';

// =====================================================================
// Load User
// =====================================================================

export const loadUser = () => async (dispatch) => {
  if (localStorage.token) {
    setAuth(localStorage.token);
  }
  try {
    const res = await axios.get('/api/v1/auth/');
    dispatch({
      type: LOAD_USER,
      payload: res.data.data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// =====================================================================
// Register
// =====================================================================

export const userRegister = ({ name, email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const body = JSON.stringify({ name, email, password });
  try {
    const res = await axios.post('/api/v1/auth/register', body, config);

    dispatch({
      type: REGISTER_SUCCESS,
      payload: res.data.data,
    });
    dispatch(setAlert('Registered Successfully', 'success'));
    dispatch(loadUser());
  } catch (error) {
    if (error.response.data.message) {
      dispatch(setAlert(error.response.data.message, 'danger'));
    }
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// =====================================================================
// Login
// =====================================================================

export const userLogin = ({ email, password }) => async (dispatch) => {
  const config = {
    headers: {
      'Content-type': 'application/json',
    },
  };
  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/api/v1/auth/login', body, config);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: res.data.data,
    });
    dispatch(setAlert('Logged in Successfully', 'success'));
    dispatch(loadUser());
  } catch (error) {
    if (error.response.data.message) {
      dispatch(setAlert(error.response.data.message, 'danger'));
    }
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// =====================================================================
// Logout
// =====================================================================

export const userLogout = () => async (dispatch) => {
  try {
    dispatch({
      type: LOGOUT,
    });
  } catch (error) {
    if (error.response.data.message) {
      dispatch(setAlert(error.response.data.message, 'danger'));
    }
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

// =========================================================================================
// ADD PLAYLIST
// =========================================================================================

export const addPlaylist = (id) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/v1/user/playlist/${id}`);
    dispatch({
      type: ADD_PLAYLIST,
      payload: res.data.data,
    });
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        dispatch(setAlert(error.response.data.message, 'danger'));
      }
    }
  }
};

// =========================================================================================
// REMOVE
// =========================================================================================

export const removePlaylist = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/v1/user/playlist/${id}`);
    dispatch({
      type: REMOVE_PLAYLIST,
      payload: res.data.data,
    });
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        dispatch(setAlert(error.response.data.message, 'danger'));
      }
    }
  }
};

// =========================================================================================
// LOAD USERS
// =========================================================================================

export const loadUsers = () => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/users`);
    dispatch({
      type: LOAD_USERS,
      payload: res.data.data,
    });
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        dispatch(setAlert(error.response.data.message, 'danger'));
      }
    }
  }
};

// =========================================================================================
// DELETE USER
// =========================================================================================

export const deleteUser = (UserId) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/user/${UserId}`);
    dispatch({
      type: DELETE_USER,
      payload: { UserId },
    });
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        dispatch(setAlert(error.response.data.message, 'danger'));
      }
    }
  }
};
