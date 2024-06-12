import React from 'react';

const AreaInput = ({ placeholder, onChange, value, decoration }) => {
  const handleInputChange = (event) => {
    onChange(event.target.value);
  };

  const clase =
    'block text-xs w-full border-0 py-2 px-2 text-neutral-600 shadow-sm ring-1 ring-inset ring-own-light placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-own-dark sm:leading-6';
  return (
    <>
      <div className="relative w-full h-full mt-2 shadow-sm">
        <input
          type="text"
          name="price"
          id="price"
          className={clase}
          placeholder={placeholder}
          onChange={handleInputChange}
          value={value}
        />
        <div className="pointer-events-none h-full absolute inset-y-0 right-0 flex items-center px-3">
          {decoration !== 'none' ? (
            <span className="text-gray-400 text-xs">{decoration}</span>
          ) : (
            <span className="text-gray-400 text-xs">
              m<sup>2</sup>
            </span>
          )}
        </div>
      </div>
    </>
  );
};

export default AreaInput;
