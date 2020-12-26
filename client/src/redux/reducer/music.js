const {
  LOAD_MUSICS,
  MUSIC_ERROR,
  CLEAN_MUSIC,
  LOAD_ARTISTS,
  LOAD_ARTIST,
  ADD_LIKE,
  REMOVE_LIKE,
  ADD_MUSIC,
  DELETE_MUSIC,
  DELETE_ARTIST,
  LOAD_MUSIC_LIST,
} = require('../types');

const initialState = {
  loading: true,
  musics: null,
  artists: null,
  artist: null,
  music: null,
  count: null,
  musicList: null,
};

const musicReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case LOAD_MUSICS:
      return {
        ...state,
        musics: payload.musics.rows,
        count: payload.musics.count,
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
        musics: null,
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
          music.id === payload.MusicId
            ? { ...music, likes: music.likes.filter((like) => like.id !== payload.UserId) }
            : music
        ),
      };
    case DELETE_MUSIC:
      return {
        ...state,
        musics: state.musics.filter((music) => music.id !== payload.MusicId),
      };
    case DELETE_ARTIST:
      return {
        ...state,
        artists: state.artists.filter((artist) => artist.id !== payload.ArtistId),
      };
    case LOAD_MUSIC_LIST:
      return {
        ...state,
        musicList: payload,
      };
    default:
      return state;
  }
};

export default musicReducer;
