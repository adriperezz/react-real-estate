import React from 'react';
import { FormControl, NativeSelect, InputLabel } from '@mui/material';

const SelectLocation = ({ onSelectChange, provinces, theme }) => {
  const [location, setLocation] = React.useState('');

  const handleChange = (event) => {
    setLocation(event.target.value);
    onSelectChange(event.target.value);
  };

  return (
    <>
      <FormControl fullWidth>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
          Location
        </InputLabel>
        <NativeSelect
          inputProps={{ name: 'location', id: 'uncontrolled-native' }}
          defaultValue="all"
          onChange={handleChange}
        >
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
