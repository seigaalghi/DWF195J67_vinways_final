import React, { Fragment } from 'react';
import Home from './Home';
import ListTransaction from './ListTransaction';
import Payment from './Payment';
import AddArtist from './AddArtist';
import AddMusic from './AddMusic';
import Navbar from '../components/navbar/Navbar';
import PrivateRoute from '../components/PrivateRoute';
import AdminRoute from '../components/AdminRoute';
import MusicPlayer from '../components/home/MusicPlayer';
import Playlist from './Playlist';
import Artist from './Artist';
import { connect } from 'react-redux';

const Registered = ({ player }) => {
  return (
    <Fragment>
      <Navbar />
      <PrivateRoute path='/' exact={true} component={Home} />
      <PrivateRoute path='/artist/:artistId' exact component={Artist} />
      <PrivateRoute path='/playlist/' exact component={Playlist} />
      <PrivateRoute path='/payment' exact component={Payment} />
      <AdminRoute path='/add-artist' exact component={AddArtist} />
      <AdminRoute path='/add-music' exact component={AddMusic} />
      <AdminRoute path='/list-trans' exact component={ListTransaction} />
      {player && player.isOpen ? <MusicPlayer /> : null}
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  player: state.player,
});

export default connect(mapStateToProps)(Registered);
