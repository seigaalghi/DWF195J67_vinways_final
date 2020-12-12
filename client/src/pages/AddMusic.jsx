import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { addMusic, loadArtists } from '../redux/action/music';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import FormControl from '../components/form/FormControl';
import * as Yup from 'yup';
import ErrorText from '../components/form/ErrorText';

const AddMusic = ({ loadArtists, artists, addMusic }) => {
  const [image, setImage] = useState('');
  const initialValues = {
    title: '',
    img: '',
    year: '',
    artistId: '',
    audio: '',
  };

  useEffect(() => {
    loadArtists();
  }, [loadArtists]);

  const onSubmit = (values) => {
    const data = new FormData();
    data.append('title', values.title);
    data.append('year', values.year);
    data.append('artistId', values.artistId);
    data.append('img', values.img);
    data.append('audio', values.audio);
    addMusic(data);
  };

  const validationSchema = Yup.object({
    title: Yup.string().required('Artist name is required'),
    img: Yup.mixed()
      .required('Artist image is required')
      .test('fileSize', 'File Size is too large (Max 1 MB)', (value) => (value ? value.size <= 1024 * 1024 * 1 : null)),
    year: Yup.string()
      .matches(/^[0-9]*$/, 'Start at must be numbers only')
      .min(4, 'Start at must be 4 characters')
      .max(4, 'Start at must be 4 characters')
      .required('Start at is required'),
    artistId: Yup.string().required('Music artist is required'),
    audio: Yup.mixed()
      .required('Artist image is required')
      .test('fileSize', 'File Size is too large (Max 15 MB)', (value) => (value ? value.size <= 1024 * 1024 * 15 : null)),
  });

  const year = () => {
    let years = [];
    for (let i = 1980; i <= new Date().getFullYear(); i++) {
      years.push({ key: i, value: i });
    }
    years.sort((a, b) => {
      if (a.value > b.value) {
        return -1;
      }
      if (a.value < b.value) {
        return 1;
      }
      return 0;
    });
    return years;
  };

  const artistList = () => {
    let artistLists = [];
    if (artists) {
      artists.map((artist) => artistLists.push({ key: artist.name, value: artist.id }));
    }
    artistLists.sort((a, b) => {
      if (a.key < b.key) {
        return -1;
      }
      if (a.key > b.key) {
        return 1;
      }
      return 0;
    });
    return artistLists;
  };

  return (
    <Fragment>
      <div className='add-music-container'>
        <h1>Add Music</h1>
        <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
          {(formik) => {
            return (
              <Form>
                <div className='form-music'>
                  <div id='music-title'>
                    <FormControl control='input' type='text' name='title' label='Title' />
                  </div>
                  <div className='form-file' id='music-img'>
                    <label className='input label-input-file'>
                      {formik.values.img ? (
                        formik.values.img.name
                      ) : (
                        <span>
                          Music Image <i className='fas fa-paperclip'></i>
                        </span>
                      )}
                      <Field>
                        {(props) => {
                          const { form } = props;
                          return (
                            <input
                              type='file'
                              name='img'
                              id='input-file'
                              className='input-file'
                              accept='image/*'
                              onChange={(e) => {
                                if (e.target.files[0]) {
                                  form.setFieldValue(e.target.name, e.target.files[0]);
                                  setImage(URL.createObjectURL(e.target.files[0]));
                                } else {
                                  form.setFieldValue(e.target.name, '');
                                  setImage('');
                                }
                              }}
                            />
                          );
                        }}
                      </Field>
                    </label>
                    <ErrorMessage name='img' component={ErrorText} />
                  </div>
                  <div id='music-year'>
                    <FormControl control='select' options={year()} name='year' label='Released Year' id='music-year' />
                  </div>
                  <div id='music-artist'>
                    <FormControl control='select' options={artistList()} name='artistId' label='Artist' id='music-artist' />
                  </div>
                  <div className='form-file' id='music-audio'>
                    <label className='input label-input-file'>
                      {formik.values.audio ? (
                        formik.values.audio.name
                      ) : (
                        <span>
                          Music Audio <i className='fas fa-paperclip'></i>
                        </span>
                      )}
                      <Field>
                        {(props) => {
                          const { form } = props;
                          return (
                            <input
                              type='file'
                              name='audio'
                              id='input-file'
                              className='input-file'
                              accept='audio/*'
                              onChange={(e) => {
                                if (e.target.files[0]) {
                                  form.setFieldValue(e.target.name, e.target.files[0]);
                                } else {
                                  form.setFieldValue(e.target.name, '');
                                }
                              }}
                            />
                          );
                        }}
                      </Field>
                    </label>
                    <ErrorMessage name='audio' component={ErrorText} />
                  </div>
                  <input type='submit' className='btn btn-big' id='music-submit' />
                </div>
              </Form>
            );
          }}
        </Formik>
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
