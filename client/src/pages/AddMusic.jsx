import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addMusic, loadArtists } from '../redux/action/music';

const AddMusic = ({ loadArtists, artists, addMusic }) => {
  const [image, setImage] = useState('');
  const [img, setImg] = useState(null);
  const [audio, setAudio] = useState(null);
  const [formData, setForMData] = useState({
    title: '',
    img: '',
    year: '',
    artistId: '',
    audio: '',
  });

  useEffect(() => {
    loadArtists();
  }, []);

  const changeHandler = (e) => {
    setForMData({ ...formData, [e.target.name]: e.target.value });
  };

  const imageHandler = (e) => {
    if (e.target.files) {
      const fileName = String(e.target.files[0].name);
      setForMData({ ...formData, [e.target.name]: fileName });
      setImg(e.target.files[0]);
      if (e.target.name === 'img') {
        setImage(URL.createObjectURL(e.target.files[0]));
      }
    }
  };

  const audioHandler = (e) => {
    if (e.target.files) {
      const fileName = String(e.target.files[0].name);
      setForMData({ ...formData, [e.target.name]: fileName });
      setAudio(e.target.files[0]);
    }
  };

  const clearForm = () => {
    setForMData({
      title: '',
      img: '',
      year: '',
      artistId: '',
      audio: '',
    });
    setImg(null);
    setAudio(null);
    setImage('');
  };

  const { title, year, artistId } = formData;

  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', title);
    data.append('year', year);
    data.append('artistId', artistId);
    data.append('img', img);
    data.append('audio', audio);
    addMusic(data);
    clearForm();
  };
  return (
    <Fragment>
      <div className='add-music-container'>
        <h1>Add Music</h1>
        <form onSubmit={submitHandler}>
          <input type='text' className='input' name='title' onChange={changeHandler} value={formData.title} required placeholder='Song Title' />

          <label className='input label-input-file'>
            {formData.img ? (
              formData.img
            ) : (
              <span>
                Album Cover <i className='fas fa-paperclip'></i>
              </span>
            )}

            <input type='file' className='input-file' accept='image/*' onChange={imageHandler} name='img' required />
          </label>

          <input type='text' className='input' name='year' onChange={changeHandler} value={formData.year} required placeholder='Song Released Year' />

          <select className='input' name='artistId' onChange={changeHandler} value={formData.artist} required placeholder='Song Artist'>
            <option>Select Artist</option>
            {artists ? (
              artists.map((artist) => (
                <option value={`${artist.id}`} key={artist.id}>
                  {artist.name}
                </option>
              ))
            ) : (
              <option>Loading</option>
            )}
          </select>

          <label className='input label-input-file'>
            {formData.audio ? (
              formData.audio
            ) : (
              <span>
                Audio <i className='fas fa-paperclip'></i>
              </span>
            )}

            <input type='file' className='input-file' accept='audio/*' onChange={audioHandler} name='audio' required />
          </label>
          <input type='submit' className='btn btn-big' />
        </form>
        <div className='preview'>
          {image ? (
            <Fragment>
              <h5>Album Art Preview</h5>
              <div
                className='blur-img'
                style={{
                  backgroundImage: `url(${image ? image : ''})`,
                  height: '200px',
                  width: '200px',
                  backgroundRepeat: 'no-repeat',
                  backgroundSize: '100%',
                  margin: '10px auto',
                  border: '1px solid #03f387',
                }}
              />
            </Fragment>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => ({
  artists: state.music.artists,
});

export default connect(mapStateToProps, { loadArtists, addMusic })(AddMusic);
