import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { deleteUser, loadUsers } from '../redux/action/auth';
import { deleteArtist, deleteMusic, loadArtists, loadMusics } from '../redux/action/music';
import Loading from '../components/Loading';

const Management = ({ auth, music, loadUsers, loadMusics, loadArtists, deleteArtist, deleteMusic, deleteUser }) => {
  const [userOpen, setUserOpen] = useState(false);
  const [musicOpen, setMusicOpen] = useState(false);
  const [artistOpen, setArtistOpen] = useState(false);
  useEffect(() => {
    loadUsers();
    loadArtists();
    loadMusics();
  }, [loadUsers, loadArtists, loadMusics]);

  const deleteArtistHandler = (id) => {
    if (window.confirm('Are You Sure?')) {
      deleteArtist(id);
    }
  };
  const deleteUserHandler = (id) => {
    if (window.confirm('Are You Sure?')) {
      deleteUser(id);
    }
  };
  const deleteMusicHandler = (id) => {
    if (window.confirm('Are You Sure?')) {
      deleteMusic(id);
    }
  };

  return auth.loading || music.loading || !auth || !music ? (
    <Loading />
  ) : (
    <div className='management'>
      <h1>Management</h1>
      <div className='openner' onClick={() => setUserOpen(!userOpen)}>
        <hr />
        <h2>Users</h2>
        {userOpen ? <i className='fas fa-chevron-up'></i> : <i className='fas fa-chevron-down'></i>}
        <hr />
      </div>
      {userOpen ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {auth.users.map((user) => (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.premium ? 'Active' : 'Non Active'}</td>
                <td>
                  <div className='btn bg-danger' onClick={() => deleteUserHandler(user.id)}>
                    Delete
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

      <div className='openner' onClick={() => setArtistOpen(!artistOpen)}>
        <hr />
        <h2>Artist</h2>
        {artistOpen ? <i className='fas fa-chevron-up'></i> : <i className='fas fa-chevron-down'></i>}
        <hr />
      </div>
      {artistOpen ? (
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Songs</th>
              <th>Start at</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {music.artists.map((artist) => (
              <tr key={artist.id}>
                <td>{artist.name}</td>
                <td>{artist.musics.length}</td>
                <td>{artist.start}</td>
                <td>
                  <div className='btn bg-danger' onClick={() => deleteArtistHandler(artist.id)}>
                    Delete
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}

      <div className='openner' onClick={() => setMusicOpen(!musicOpen)}>
        <hr />
        <h2>Music</h2>
        {musicOpen ? <i className='fas fa-chevron-up'></i> : <i className='fas fa-chevron-down'></i>}
        <hr />
      </div>
      {musicOpen ? (
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Year</th>
              <th>Artist</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {music.musics.map((music) => (
              <tr key={music.id}>
                <td>{music.title}</td>
                <td>{music.year}</td>
                <td>{music.artist.name}</td>
                <td>
                  <div className='btn bg-danger' onClick={() => deleteMusicHandler(music.id)}>
                    Delete
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : null}
    </div>
  );
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  music: state.music,
});

export default connect(mapStateToProps, { loadUsers, loadMusics, loadArtists, deleteArtist, deleteMusic, deleteUser })(Management);
