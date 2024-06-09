import React from 'react';

const Container = ({ children, bgColor }) => {
  return (
    <div className={bgColor}>
      <div className="lg:max-w-full lg:mx-auto lg:py-3 lg:px-20 py-2 px-6">
        {children}
      </div>
    </div>
  );
};

export default Container;
