import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { deleteUser, loadUsers } from '../redux/action/auth';
import { deleteArtist, deleteMusic, loadArtists, loadMusics } from '../redux/action/music';
import Loading from '../components/Loading';
import Confirm from '../components/Confirm';

const Management = ({ auth, music, loadUsers, loadMusics, loadArtists, deleteArtist, deleteMusic, deleteUser }) => {
  const [userOpen, setUserOpen] = useState(false);
  const [musicOpen, setMusicOpen] = useState(false);
  const [artistOpen, setArtistOpen] = useState(false);
  const [confirm, setConfirm] = useState({
    message: 'Are You Sure?',
    confirm: '',
    isOpen: false,
  });
  const closeHandler = (e) => {
    if (e.target === e.currentTarget) {
      setConfirm({
        message: 'Are You Sure?',
        confirm: '',
        isOpen: false,
      });
    }
  };

  useEffect(() => {
    loadUsers();
    loadArtists();
    loadMusics();
  }, [loadUsers, loadArtists, loadMusics]);

  const deleteArtistHandler = (id) => {
    setConfirm({
      message: 'Are You Sure?',
      confirm: () => deleteArtist(id),
      isOpen: true,
    });
  };
  const deleteUserHandler = (id) => {
    setConfirm({
      message: 'Are You Sure?',
      confirm: () => deleteUser(id),
      isOpen: true,
    });
  };
  const deleteMusicHandler = (id) => {
    setConfirm({
      message: 'Are You Sure?',
      confirm: () => deleteMusic(id),
      isOpen: true,
    });
  };

  return auth.loading || music.loading || !auth || !music ? (
    <Loading />
  ) : (
    <div className='management'>
      <Confirm message={confirm.message} close={closeHandler} isOpen={confirm.isOpen} confirm={confirm.confirm} />
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
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {auth.users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
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
              <th>ID</th>
              <th>Name</th>
              <th>Songs</th>
              <th>Start at</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {music.artists.map((artist) => (
              <tr key={artist.id}>
                <td>{artist.id}</td>
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
              <th>ID</th>
              <th>Title</th>
              <th>Year</th>
              <th>Artist</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {music.musics.map((music) => (
              <tr key={music.id}>
                <td>{music.id}</td>
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
