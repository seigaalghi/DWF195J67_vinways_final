import React, { Fragment, useState } from 'react';
import { addArtist } from '../redux/action/music';
import { connect } from 'react-redux';

const AddArtist = ({ addArtist }) => {
  const [image, setImage] = useState('');
  const [img, setImg] = useState(null);
  const [formData, setForMData] = useState({
    name: '',
    img: '',
    age: '',
    type: '',
    start: '',
  });

  const changeHandler = (e) => {
    setForMData({ ...formData, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    if (e.target.files) {
      const fileName = String(e.target.files[0].name);
      setForMData({ ...formData, [e.target.name]: fileName });
      if (e.target.name === 'img') {
        setImage(URL.createObjectURL(e.target.files[0]));
        setImg(e.target.files[0]);
      }
    }
  };

  const { name, age, type, start } = formData;

  const cleanForm = () => {
    setForMData({
      name: '',
      img: '',
      age: '',
      type: '',
      start: '',
    });
    setImg(null);
    setImage('');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('img', img);
    data.append('name', name);
    data.append('age', age);
    data.append('type', type);
    data.append('start', start);
    addArtist(data);
    cleanForm();
  };
  return (
    <Fragment>
      <div className='add-music-container'>
        <h1>Add Artist</h1>
        <form onSubmit={submitHandler}>
          <input type='text' className='input' name='name' onChange={changeHandler} value={formData.name} required placeholder='Artist Name' />

          <label className='input label-input-file'>
            {formData.img ? (
              formData.img
            ) : (
              <span>
                Artist Picture <i className='fas fa-paperclip'></i>
              </span>
            )}

            <input type='file' className='input-file' accept='image/*' onChange={fileHandler} name='img' required />
          </label>

          <input type='text' className='input' name='age' onChange={changeHandler} value={formData.age} required placeholder='Age' />

          <select className='input' name='type' onChange={changeHandler} value={formData.type} required placeholder='Artist Type'>
            <option>Select Category</option>
            <option value='Solo'>Solo</option>
            <option value='Duo'>Duo</option>
            <option value='Trio'>Trio</option>
            <option value='Quarted'>Quarted</option>
            <option value='Band'>Band</option>
            <option value='Boyband'>Boyband</option>
            <option value='Girlband'>Girlband</option>
          </select>

          <input type='text' className='input' name='start' onChange={changeHandler} value={formData.start} required placeholder='Start a career' />

          <input type='submit' className='btn btn-big' />
        </form>
      </div>
      <div className='preview'>
        {image ? (
          <Fragment>
            <h5>Album Art Preview</h5>
            <div
              className='blur-img'
              style={{
                backgroundImage: `url(${image ? image : ''})`,
                height: '180px',
                width: '320px',
                backgroundRepeat: 'no-repeat',
                backgroundSize: '100%',
                margin: '10px auto',
                border: '1px solid #03f387',
              }}
            />
          </Fragment>
        ) : null}
      </div>
    </Fragment>
  );
};

export default connect(null, { addArtist })(AddArtist);
