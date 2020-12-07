const { LOAD_MUSICS, MUSIC_ERROR, CLEAN_MUSIC, LOAD_ARTISTS, LOAD_ARTIST, ADD_LIKE, REMOVE_LIKE, ADD_MUSIC } = require('../types');

const initialState = {
  loading: true,
  musics: null,
  artists: null,
  artist: null,
  music: null,
};

const musicReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case LOAD_MUSICS:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case ADD_MUSIC:
      return {
        ...state,
        musics: [...state.musics, payload.music],
        loading: false,
      };
    case MUSIC_ERROR:
      return {
        ...state,
        loading: true,
        musics: null,
        artists: null,
        music: null,
      };
    case CLEAN_MUSIC:
      return {
        ...state,
        loading: true,
      };
    case LOAD_ARTISTS:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case LOAD_ARTIST:
      return {
        ...state,
        ...payload,
        loading: false,
      };
    case ADD_LIKE:
      return {
        ...state,
        musics: state.musics.map((music) => (music.id === payload.id ? payload.like : music)),
      };
    case REMOVE_LIKE:
      return {
        ...state,
        musics: state.musics.map((music) =>
          music.id === payload.musicId ? { ...music, likes: music.likes.filter((like) => like.id !== payload.userId) } : music
        ),
      };

    default:
      return state;
  }
};

export default musicReducer;
