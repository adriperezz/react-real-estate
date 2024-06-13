import React from 'react';
import { FormControl, NativeSelect, InputLabel } from '@mui/material';

const SelectLocation = ({ onSelectChange, provinces }) => {
  const [location, setLocation] = React.useState('');

  const handleChange = (event) => {
    setLocation(event.target.value);
    onSelectChange(event.target.value);
  };

  return (
    <>
      <FormControl fullWidth>
        <label className="block text-sm font-light leading-6 text-own-brown-gray -mb-2">
          Property Type
        </label>
        <NativeSelect
          inputProps={{ name: 'location', id: 'uncontrolled-native' }}
          defaultValue=""
          onChange={handleChange}
          className="block text-sm w-full border-0 py-1 px-2 text-neutral-600 shadow-sm ring-1 ring-inset ring-own-light placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-own-dark sm:leading-6"
        >
          <option value={''}></option>
          <option value={'all'}>ALL</option>
          {provinces.map((province, index) => (
            <option key={index} value={province}>
              {province}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </>
  );
};

export default SelectLocation;
