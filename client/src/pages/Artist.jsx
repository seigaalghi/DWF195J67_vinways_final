import React, { Fragment, useEffect } from 'react';
import Contents from '../components/home/Contents';
import { useParams } from 'react-router-dom';
import { loadArtist } from '../redux/action/music';
import { connect } from 'react-redux';
import Loading from '../components/universal/Loading';

const Artist = ({ music: { artist, loading }, loadArtist }) => {
  const { artistId } = useParams();

  useEffect(() => {
    loadArtist(artistId);
  }, [artistId, loadArtist]);

  return !artist || loading ? (
    <Loading />
  ) : (
    <Fragment>
      <div className='playlist-container'>
        <div className='artist'>
          <h1>{artist.name}'s Song(s)</h1>
          <img src={artist.img} alt={artist.name} className='artist-banner' />
          <div>
            <table>
              <thead>
                <tr>
                  <th>Description</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Name</td>
                  <td>: {artist.name}</td>
                </tr>
                <tr>
                  <td>Category</td>
                  <td>: {artist.type}</td>
                </tr>
                <tr>
                  <td>Start at</td>
                  <td>: {artist.start}</td>
                </tr>
                <tr>
                  <td>Songs</td>
                  <td>: {artist.musics.length}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <Contents musics={artist.musics} queue={artist.musics} />
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  music: state.music,
});

export default connect(mapStateToProps, { loadArtist })(Artist);
