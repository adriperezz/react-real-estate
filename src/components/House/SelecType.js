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
        <InputLabel variant="standard" htmlFor="grouped-native-select">
          Property Type
        </InputLabel>
        <NativeSelect
          defaultValue="all"
          id="grouped-native-select"
          label="Property Type"
          onChange={handleChange}
        >
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
