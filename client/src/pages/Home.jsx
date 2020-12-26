import React, { Fragment, useEffect, useState } from 'react';
import Contents from '../components/home/Contents';
import SliderImg from '../components/home/SliderImg';
import { cleanMusic, loadArtists, loadMusics } from '../redux/action/music';
import { connect } from 'react-redux';
import Loading from '../components/universal/Loading';

const Home = ({
  loadMusics,
  loadArtists,
  cleanMusic,
  music: { loading, artists, musics, count },
}) => {
  const [page, setPage] = useState(1);
  useEffect(() => {
    loadMusics(page * 12);
    return () => {
      cleanMusic();
    };
  }, [loadMusics, cleanMusic, page]);

  useEffect(() => {
    loadArtists();
  }, [loadArtists]);

  const [search, setSearch] = useState([]);

  const searchhandler = (e) => {
    const list = musics
      .map((music) =>
        music.title.toLowerCase().includes(e.target.value.toLowerCase()) ? music : null
      )
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
      <Contents
        musics={search.length > 0 ? search : musics}
        queue={search.length > 0 ? search : musics}
        count={count}
        next={() => setPage((prev) => prev + 1)}
      />
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  music: state.music,
});

export default connect(mapStateToProps, { loadMusics, loadArtists, cleanMusic })(Home);
