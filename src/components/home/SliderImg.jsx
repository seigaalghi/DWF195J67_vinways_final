import React from 'react';
import { Link } from 'react-router-dom';
import Slider from 'react-slick';
import Loading from '../Loading';

const SliderImg = ({ artists }) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    adaptiveHeight: true,
    centerMode: true,
    centerPadding: '30%',
  };
  return !artists ? (
    <Loading />
  ) : (
    <div>
      <div className='slider-container'>
        <Slider {...settings} className='slider-tag'>
          {artists.map((artist, index) => (
            <div className='slider' key={index}>
              <Link to={`/artist/${artist.id}`}>
                <img src={artist.img} alt={artist.name} />
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};

export default SliderImg;
