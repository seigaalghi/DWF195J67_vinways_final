import axios from 'axios';
import {
  LOAD_ARTISTS,
  LOAD_ARTIST,
  LOAD_MUSICS,
  MUSIC_ERROR,
  MUSIC_CLEAN,
  ADD_LIKE,
  REMOVE_LIKE,
  ADD_MUSIC,
  ADD_ARTIST,
  DELETE_MUSIC,
  DELETE_ARTIST,
  REMOVE_PLAYLIST_LIKE,
  ADD_PLAYLIST_LIKE,
} from '../types';
import { setAlert, setUpload } from './alert';
import { closePlayer } from './player';
import baseUrl from '../utility/baseUrl';

// =========================================================================================
// LOAD MUSIC
// =========================================================================================

export const loadMusics = () => async (dispatch) => {
  try {
    const res = await axios.get(`${baseUrl}/api/v1/musics`);
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
      onUploadProgress: (progressEvent) => {
        const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(percentage);
        dispatch(setUpload(percentage));
      },
    };
    const res = await axios.post(`${baseUrl}/api/v1/music/`, data, config);
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
    const res = await axios.get(`${baseUrl}/api/v1/artists`);
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
    const res = await axios.get(`${baseUrl}/api/v1/artist/${id}`);
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
      onUploadProgress: (progressEvent) => {
        const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
        console.log(percentage);
        dispatch(setUpload(percentage));
      },
    };
    const res = await axios.post(`${baseUrl}/api/v1/artist/`, data, config);
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
    const res = await axios.post(`${baseUrl}/api/v1/music/like/${id}`);
    dispatch({
      type: ADD_LIKE,
      payload: { ...res.data.data, id },
    });
    dispatch({
      type: ADD_PLAYLIST_LIKE,
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

export const removeLike = (MusicId, UserId) => async (dispatch) => {
  try {
    await axios.delete(`${baseUrl}/api/v1/music/like/${MusicId}`);
    dispatch({
      type: REMOVE_LIKE,
      payload: { MusicId, UserId },
    });
    dispatch({
      type: REMOVE_PLAYLIST_LIKE,
      payload: { MusicId, UserId },
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
// DELETE MUSIC
// =========================================================================================

export const deleteMusic = (MusicId) => async (dispatch) => {
  try {
    dispatch(closePlayer());
    await axios.delete(`${baseUrl}/api/v1/music/${MusicId}`);
    dispatch({
      type: DELETE_MUSIC,
      payload: { MusicId },
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
// DELETE ARTISTS
// =========================================================================================

export const deleteArtist = (ArtistId) => async (dispatch) => {
  try {
    await axios.delete(`${baseUrl}/api/v1/artist/${ArtistId}`);
    dispatch({
      type: DELETE_ARTIST,
      payload: { ArtistId },
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
