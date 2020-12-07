import axios from 'axios';
import { LOAD_ARTISTS, LOAD_ARTIST, LOAD_MUSICS, MUSIC_ERROR, MUSIC_CLEAN, ADD_LIKE, REMOVE_LIKE, ADD_MUSIC, ADD_ARTIST } from '../types';
import { setAlert } from './alert';

// =========================================================================================
// LOAD MUSIC
// =========================================================================================

export const loadMusics = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/musics');
    dispatch({
      type: LOAD_MUSICS,
      payload: res.data.data,
    });
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        dispatch(setAlert(error.response.data.message, 'danger'));
      }
    }
    dispatch({
      type: MUSIC_ERROR,
    });
  }
};

// =========================================================================================
// ADD MUSIC
// =========================================================================================

export const addMusic = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    };
    const res = await axios.post('/api/v1/music/', data, config);
    dispatch({
      type: ADD_MUSIC,
      payload: res.data.data,
    });
    dispatch(setAlert(res.data.message, 'success'));
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        dispatch(setAlert(error.response.data.message, 'danger'));
      }
    }
  }
};

// =========================================================================================
// LOAD ARTISTS
// =========================================================================================

export const loadArtists = () => async (dispatch) => {
  try {
    const res = await axios.get('/api/v1/artists');
    dispatch({
      type: LOAD_ARTISTS,
      payload: res.data.data,
    });
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        dispatch(setAlert(error.response.data.message, 'danger'));
      }
    }
    dispatch({
      type: MUSIC_ERROR,
    });
  }
};

// =========================================================================================
// LOAD ARTIST
// =========================================================================================

export const loadArtist = (id) => async (dispatch) => {
  try {
    const res = await axios.get(`/api/v1/artist/${id}`);
    dispatch({
      type: LOAD_ARTIST,
      payload: res.data.data,
    });
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        dispatch(setAlert(error.response.data.message, 'danger'));
      }
    }
    dispatch({
      type: MUSIC_ERROR,
    });
  }
};

// =========================================================================================
// ADD ARTIST
// =========================================================================================

export const addArtist = (data) => async (dispatch) => {
  try {
    const config = {
      headers: {
        'Content-type': 'multipart/form-data',
      },
    };
    const res = await axios.post('/api/v1/artist/', data, config);
    dispatch({
      type: ADD_ARTIST,
      payload: res.data.data,
    });
    dispatch(setAlert(res.data.message, 'success'));
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        dispatch(setAlert(error.response.data.message, 'danger'));
      }
    }
  }
};

// =========================================================================================
// CLEAN MUSIC
// =========================================================================================

export const cleanMusic = () => (dispatch) => {
  try {
    dispatch({
      type: MUSIC_CLEAN,
    });
  } catch (error) {
    console.log(error);
  }
};

// =========================================================================================
// ADD LIKE
// =========================================================================================

export const addLike = (id) => async (dispatch) => {
  try {
    const res = await axios.post(`/api/v1/music/like/${id}`);
    dispatch({
      type: ADD_LIKE,
      payload: { ...res.data.data, id },
    });
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        dispatch(setAlert(error.response.data.message, 'danger'));
      }
    }
    dispatch({
      type: MUSIC_ERROR,
    });
  }
};

// =========================================================================================
// REMOVE LIKE
// =========================================================================================

export const removeLike = (musicId, userId) => async (dispatch) => {
  try {
    await axios.delete(`/api/v1/music/like/${musicId}`);
    dispatch({
      type: REMOVE_LIKE,
      payload: { musicId, userId },
    });
  } catch (error) {
    if (error.response) {
      if (error.response.data.message) {
        dispatch(setAlert(error.response.data.message, 'danger'));
      }
    }
    dispatch({
      type: MUSIC_ERROR,
    });
  }
};
