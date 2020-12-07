import React, { Fragment, useState } from 'react';
import { uploadPayment } from '../redux/action/payment';
import { connect } from 'react-redux';

const Payment = ({ uploadPayment }) => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState('');
  const [formData, setFormData] = useState({
    accountnumber: '',
    payment: '',
  });

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const fileHandler = (e) => {
    if (e.target.files) {
      const fileName = String(e.target.files[0].name);
      setFormData({ ...formData, [e.target.name]: fileName });
      setImage(e.target.files[0]);
      if (e.target.name === 'payment') {
        setPreview(URL.createObjectURL(e.target.files[0]));
      }
    }
  };

  const clearForm = () => {
    setFormData({
      accountnumber: '',
      payment: '',
    });
    setImage(null);
    setPreview('');
  };

  const submitHandler = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('img', image);
    data.append('account', formData.accountnumber);
    uploadPayment(data);
    clearForm();
  };

  return (
    <div className='payment-container'>
      <div className='payment'>
        <h1>Premium</h1>
        <p>
          Bayar sekarang dan nikmati streaming music yang kekinian dari Co <span className='coways'>Ways</span>
        </p>
        <p>
          Co <span className='coways'>Ways</span> : 0981312323
        </p>
        <form onSubmit={submitHandler}>
          <input
            type='text'
            className='input'
            placeholder='Input your account number'
            value={formData.accountnumber}
            onChange={changeHandler}
            name='accountnumber'
            required
          />
          <label htmlFor='input-file' className='input label-input-file'>
            {formData.payment ? (
              formData.payment
            ) : (
              <Fragment>
                Attach proof of transfer <i className='fas fa-paperclip'></i>
              </Fragment>
            )}

            <input type='file' id='input-file' className='input-file' accept='image/*' onChange={fileHandler} name='payment' required />
          </label>

          <input type='submit' className='btn btn-big' />
        </form>
        <div className='preview'>
          {preview ? (
            <Fragment>
              <h5>Payment Preview</h5>
              <div
                className='blur-img'
                style={{
                  backgroundImage: `url(${preview ? preview : ''})`,
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
    </div>
  );
};

export default connect(null, { uploadPayment })(Payment);
