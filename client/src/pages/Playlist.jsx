import React, { Fragment } from 'react';
import Contents from '../components/home/Contents';
import { connect } from 'react-redux';
import Loading from '../components/Loading';

const Playlist = ({ auth: { loading, user } }) => {
  return loading || !user ? (
    <Loading />
  ) : (
    <Fragment>
      <div className='playlist-container'>
        <h1>{user.name}'s Playlist</h1>
        <Contents musics={user.playlists} queue={user.playlists} />
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, null)(Playlist);
