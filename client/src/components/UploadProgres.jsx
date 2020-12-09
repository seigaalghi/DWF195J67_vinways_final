import React from 'react';
import { connect } from 'react-redux';

const UploadProgres = ({ uploadProgress: { isOpen, progress } }) => {
  return isOpen ? (
    <div className='progress'>
      <div className='progress-value'>
        <h3>Uploading...</h3>
        <div style={{ width: `${progress}%`, height: '30px', borderRadius: '20px', margin: '20px 0px', backgroundColor: 'green' }}></div>
        {progress === 100 ? <h3>Please Wait.. processing file...</h3> : <h2>{progress}%</h2>}
      </div>
    </div>
  ) : null;
};

const mapStateToProps = (state) => ({
  uploadProgress: state.alert.uploadProgress,
});

export default connect(mapStateToProps, null)(UploadProgres);
