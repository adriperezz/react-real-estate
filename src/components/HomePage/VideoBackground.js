import {
  faArrowAltCircleRight,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { Link } from 'react-router-dom';

const VideoBackground = () => {
  return (
    <div className="relative w-screen h-128 bg-black">
      <video autoPlay muted loop className="w-full h-full object-cover">
        <source src="/real_estate_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 h-full w-full bg-black opacity-60"></div>
      <div className="absolute inset-0 z-50 w-2/4 h-2/3 bg-white opacity-90 my-auto mx-auto">
        <div className="flex flex-col items-center h-full justify-center text-7xl gap-10 text-own-dark font-mono hover:text-own-brown-gray">
          <Link to="/buy" className="flex gap-4 hover:text-own-dark">
            <FontAwesomeIcon icon={faArrowRight} />
            <p>Buy</p>
          </Link>
          <Link to="/sell" className="flex gap-4 hover:text-own-dark">
            <FontAwesomeIcon icon={faArrowRight} />
            <p>Sell</p>
          </Link>
          <Link to="sold" className="flex gap-4 hover:text-own-dark">
            <FontAwesomeIcon icon={faArrowRight} />
            <p>Sold</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default VideoBackground;
