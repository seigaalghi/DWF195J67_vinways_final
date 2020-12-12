import React, { Fragment, useState } from 'react';
import { addArtist } from '../redux/action/music';
import { connect } from 'react-redux';
import { Form, Formik, Field, ErrorMessage } from 'formik';
import FormControl from '../components/form/FormControl';
import * as Yup from 'yup';
import ErrorText from '../components/form/ErrorText';

const AddArtist = ({ addArtist }) => {
  const [image, setImage] = useState('');
  const initialValues = {
    name: '',
    img: '',
    age: '',
    type: '',
    start: '',
  };

  const onSubmit = (values) => {
    const { name, age, type, start, img } = values;
    const data = new FormData();
    data.append('img', img);
    data.append('name', name);
    data.append('age', age);
    data.append('type', type);
    data.append('start', start);
    addArtist(data);
  };

  const validationSchema = Yup.object({
    img: Yup.mixed()
      .test('fileSize', 'File Size is too large (Max 1 MB)', (value) => (value ? value.size <= 1024 * 1024 * 1 : null))
      .required('Artist image is required'),
    name: Yup.string().required('Artist name is required'),
    age: Yup.string()
      .matches(/^[0-9]*$/, 'Age must be numbers only')
      .required('Artist age is required'),
    type: Yup.string().required('Artist category is required'),
    start: Yup.string()
      .matches(/^[0-9]*$/, 'Start at must be numbers only')
      .min(4, 'Start at must be 4 characters')
      .max(4, 'Start at must be 4 characters')
      .required('Start at is required'),
  });

  const category = [
    { key: 'Solo', value: 'Solo' },
    { key: 'Duo', value: 'Duo' },
    { key: 'Trio', value: 'Trio' },
    { key: 'Quarted', value: 'Quarted' },
    { key: 'Band', value: 'Band' },
    { key: 'Boyband', value: 'Boyband' },
    { key: 'Girlband', value: 'Girlband' },
  ];

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

  return (
    <Fragment>
      <div className='add-artist-container'>
        <h1>Add Artist</h1>
        <Formik onSubmit={onSubmit} initialValues={initialValues} validationSchema={validationSchema}>
          {(formik) => {
            return (
              <Form>
                <div className='form-artist'>
                  <div id='artist-name'>
                    <FormControl control='input' type='text' name='name' label='Name' />
                  </div>
                  <div id='artist-age'>
                    <FormControl control='input' type='text' name='age' label='Age' id='artist-age' />
                  </div>
                  <div id='artist-category'>
                    <FormControl control='select' options={category} name='type' label='Category' id='artist-category' />
                  </div>
                  <div className='form-file' id='artist-image'>
                    <label className='input label-input-file'>
                      {formik.values.img ? (
                        formik.values.img.name
                      ) : (
                        <span>
                          Artist Image <i className='fas fa-paperclip'></i>
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
                  <div id='artist-start'>
                    <FormControl control='select' options={year()} name='start' label='Start at' id='artist-start' />
                  </div>
                  <input type='submit' className='btn btn-big' id='artist-submit' />
                </div>
              </Form>
            );
          }}
        </Formik>
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
