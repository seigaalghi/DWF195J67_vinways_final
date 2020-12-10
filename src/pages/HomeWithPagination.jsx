import React, { Fragment, useEffect, useState } from 'react';
import Contents from '../components/home/Contents';
import SliderImg from '../components/home/SliderImg';
import { cleanMusic, loadArtists, loadMusics } from '../redux/action/music';
import { connect } from 'react-redux';
import Loading from '../components/Loading';

const Home = ({ loadMusics, loadArtists, cleanMusic, music: { loading, artists, musics } }) => {
  const [listMusic, setListMusic] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [musicPerPage, setMusicPerPage] = useState(12);
  const indexOflastMusic = currentPage * musicPerPage;
  const indexOfFirstMusic = indexOflastMusic - musicPerPage;

  useEffect(() => {
    loadMusics();
    loadArtists();
    return () => {
      cleanMusic();
    };
  }, [loadMusics, loadArtists, cleanMusic]);

  useEffect(() => {
    if (musics) {
      setListMusic(musics.slice(indexOfFirstMusic, indexOflastMusic));
    }
  }, [musics, currentPage, indexOfFirstMusic, indexOflastMusic]);

  const [search, setSearch] = useState([]);

  const prevHandler = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const nextHandler = () => {
    if (musics) {
      if (indexOflastMusic < musics.length) {
        setCurrentPage((prev) => prev + 1);
      }
    }
  };

  const searchhandler = (e) => {
    const list = musics
      .map((music) => (music.title.toLowerCase().includes(e.target.value.toLowerCase()) ? music : null))
      .filter((music) => music !== null);
    setSearch(list);
  };

  return !musics || !artists || loading ? (
    <Loading />
  ) : (
    <Fragment>
      <SliderImg artists={artists} />
      <div className='form-group'>
        <input type='text' placeholder={`Search..`} onChange={searchhandler} />
        <i className='fa fa-search'></i>
      </div>
      <div className='pagination'>
        <label htmlFor='per-page'>Music per page</label>
        <select value={musicPerPage} onChange={(e) => setMusicPerPage(e.target.value)} id='per-page'>
          <option value='12'>12</option>
          <option value='24'>24</option>
          <option value='36'>36</option>
          <option value='48'>48</option>
          <option value='60'>60</option>
        </select>
      </div>
      <div className='pagination'>
        <i className='fas fa-step-backward' onClick={prevHandler}></i>
        <span> {currentPage}</span>
        <i className='fas fa-step-forward' onClick={nextHandler}></i>
      </div>
      <Contents musics={search.length > 0 ? search : listMusic} queue={musics} />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  music: state.music,
});

export default connect(mapStateToProps, { loadMusics, loadArtists, cleanMusic })(Home);
