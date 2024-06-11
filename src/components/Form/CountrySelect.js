import React from 'react';
import Select from 'react-select';

const CountrySelect = ({ onChange, value }) => {
  const countryOptions = [
    { value: 'ES', label: '+34' },
    { value: 'US', label: '+1' },
    { value: 'MX', label: '+52' },
    { value: 'CA', label: '+1' },
  ];

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: 'none',
      boxShadow: 'none',
      padding: '0',
      height: '100%',
      backgroundColor: 'none',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: 'inherit',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: 'inherit',
    }),
    dropdownIndicator: (provided) => ({
      padding: '0',
    }),
  };

  return (
    <Select
      options={countryOptions}
      onChange={onChange}
      value={value}
      styles={customStyles}
      className="block text-xs w-full border-0 py-0 text-neutral-600 shadow-sm ring-1 ring-inset ring-own-light placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-own-dark sm:leading-6"
      classNamePrefix="react-select"
      placeholder="Code"
    />
  );
};

export default CountrySelect;
