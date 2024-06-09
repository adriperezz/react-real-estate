import React from 'react';

const VideoBackground = () => {
  return (
    /*<div className="relative w-screen h-96 bg-black flex items-center justify-center">
      <video autoPlay muted className="max-w-full max-h-full object-cover">
        <source src="/real_estate_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 bg-black opacity-60"></div>
    </div>*/
    <div className="relative w-screen h-128 bg-black">
      <video autoPlay muted loop className="w-full h-full object-cover">
        <source src="/real_estate_video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="absolute inset-0 h-full bg-black opacity-60"></div>
    </div>
  );
};

export default VideoBackground;
