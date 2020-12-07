import React from 'react';
import { connect } from 'react-redux';
import { setAlert } from '../../redux/action/alert';
import { setPlayer, setQueue } from '../../redux/action/player';
import { addLike, removeLike } from '../../redux/action/music';
import { addPlaylist, removePlaylist } from '../../redux/action/auth';
import Loading from '../Loading';

const Contents = ({ musics, queue, auth, setAlert, setPlayer, setQueue, addLike, removeLike, addPlaylist, removePlaylist }) => {
  const handlerMusic = (music) => {
    if (auth.user.premium) {
      setPlayer(music);
      setQueue(queue);
    } else {
      setAlert('Please make a payment to listen to the hottest songs in the world', 'warning');
    }
  };
  const likeHandler = (e, id) => {
    e.stopPropagation();
    addLike(id);
  };
  const dislikeHandler = (e, id) => {
    e.stopPropagation();
    removeLike(id, auth.user.id);
  };

  const addPlaylistHandler = (e, id) => {
    e.stopPropagation();
    addPlaylist(id);
  };
  const removePlaylistHandler = (e, id) => {
    e.stopPropagation();
    removePlaylist(id);
  };

  return !musics || !auth.user ? (
    <Loading />
  ) : (
    <div>
      <div className='content-container'>
        {musics.map((music, index) => (
          <div className='contents' key={index} onClick={() => handlerMusic(music)}>
            <img src={`/api/v1/file/${music.img}`} alt={music.title} />
            <div className='content'>
              <div className='song-title'>{music.title}</div>
              <div className='song-year'>{music.year}</div>
              <div className='song-artist'>{music.artist.name}</div>
              <div className='content-action'>
                {!music.likes.find((like) => like.id === auth.user.id) ? (
                  <span>
                    <span className='like' onClick={(e) => likeHandler(e, music.id)}>
                      {music.likes.length > 0 ? <span>{music.likes.length}</span> : null}
                    </span>{' '}
                    <i className='far fa-heart' onClick={(e) => likeHandler(e, music.id)}></i>
                  </span>
                ) : (
                  <span>
                    <span className='like' onClick={(e) => dislikeHandler(e, music.id)}>
                      {music.likes.length > 0 ? <span>{music.likes.length}</span> : null}
                    </span>{' '}
                    <i className='fas fa-heart color-danger' onClick={(e) => dislikeHandler(e, music.id)}></i>
                  </span>
                )}
                {!auth.user.playlists.find((play) => play.id === music.id) ? (
                  <i className='fas fa-plus' onClick={(e) => addPlaylistHandler(e, music.id)}></i>
                ) : (
                  <i className='fas fa-plus color-primary' onClick={(e) => removePlaylistHandler(e, music.id)}></i>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { setAlert, setPlayer, setQueue, addLike, removeLike, addPlaylist, removePlaylist })(Contents);
