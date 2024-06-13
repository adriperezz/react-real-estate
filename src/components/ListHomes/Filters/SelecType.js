import React from 'react';
import { FormControl, NativeSelect, InputLabel } from '@mui/material';

const SelecType = ({ onChange }) => {
  const [type, setType] = React.useState('');

  const handleChange = (event) => {
    setType(event.target.value);
    onChange(event.target.value);
  };
  return (
    <>
      <FormControl fullWidth>
        <label className="block text-sm font-light leading-6 text-own-brown-gray -mb-2">
          Property Type
        </label>
        <NativeSelect
          defaultValue=""
          id="grouped-native-select"
          label="Property Type"
          onChange={handleChange}
          className="block text-sm w-full border-0 py-1 px-2 text-neutral-600 shadow-sm ring-1 ring-inset ring-own-light placeholder:text-neutral-400 focus:ring-2 focus:ring-inset focus:ring-own-dark sm:leading-6"
        >
          <option value={''}></option>
          <option value={'all'}>ALL</option>
          <optgroup label="Pisos">
            <option value="piso">Flat</option>
            <option value="atico">Penthouse</option>
            <option value="duplex">Duplex</option>
          </optgroup>
          <optgroup label="Casas y Chalets">
            <option value="independiente">Independiente</option>
            <option value="pareado">Pareado</option>
            <option value="adosada">Adosada</option>
            <option value="casa_rustica">Casa Rustica</option>
            <option value="villa">Villa</option>
          </optgroup>
          <optgroup label="Comerciales">
            <option value="trastero">Trastero</option>
            <option value="local_comercial">Local Comercial</option>
          </optgroup>
        </NativeSelect>
      </FormControl>
    </>
  );
};

export default SelecType;
