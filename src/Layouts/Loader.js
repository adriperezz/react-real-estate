import React from 'react';

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-screen bg-own-light">
      <div className="animate-pulse duration-50 rounded-full border-8 border-t-8 border-white h-24 w-24"></div>
    </div>
  );
};

export default Loader;
