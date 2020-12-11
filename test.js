import e from 'express';
import React from 'react';

const test = () => {
  const changeHanlder = (e) => {
    if (e.target.type === 'file') {
      if (e.target.files) {
        setFormData({ ...formData, [e.target.name]: e.target.files[0] });
      }
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };
  return <div></div>;
};

export default test;
