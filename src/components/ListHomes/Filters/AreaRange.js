import React, { useState } from 'react';
import AreaInput from './AreaInput';

const AreaRange = ({ onSubmit }) => {
  const [areaValues, setAreaValues] = useState(['', '']);

  const handleInputChange = (index, value) => {
    const newValues = [...areaValues];
    newValues[index] = value;
    setAreaValues(newValues);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSubmit(areaValues);
  };

  const handleReset = (event) => {
    event.preventDefault();
    setAreaValues(['', '']);
    onSubmit(['', '']);
  };

  return (
    <>
      <label className="block text-sm font-light leading-6 text-own-brown-gray">
        Total Area
      </label>
      <form onSubmit={handleSubmit} onReset={handleReset}>
        <div className="flex items-center justify-between space-x-2">
          <AreaInput
            placeholder={'min'}
            onChange={(value) => handleInputChange(0, value)}
            value={areaValues[0]}
            decoration={'none'}
          />
          <AreaInput
            placeholder={'max'}
            onChange={(value) => handleInputChange(1, value)}
            value={areaValues[1]}
            decoration={'none'}
          />
        </div>
        <div className="flex items-center justify-between w-full">
          <div className="w-2/3">
            <button type="reset" className="text-neutral-500 underline text-xs">
              Reset
            </button>
          </div>
          <div className="w-1/3 xl:w-1/4">
            <button
              type="submit"
              className="w-full bg-own-dark py-2 text-xs xl:text-sm font-light xl:font-normal leading-6 text-white shadow-sm hover:bg-own-brown-gray focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-own-dark"
            >
              Done
            </button>
          </div>
        </div>
      </form>
    </>
  );
};

export default AreaRange;
