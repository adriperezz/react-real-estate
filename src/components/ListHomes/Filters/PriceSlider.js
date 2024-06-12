import React, { useState, useEffect } from 'react';
import Slider from '@mui/material/Slider';

const PriceSlider = ({ minPrice, maxPrice, theme, onPriceChange }) => {
  const [value, setValue] = useState([minPrice, maxPrice]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    onPriceChange(newValue);
  };

  const valueText = (value) => {
    return `${value}€`;
  };

  return (
    <div className="w-full">
      <Slider
        onChange={handleChange}
        value={value}
        valueLabelDisplay="auto"
        getAriaValueText={valueText}
        valueLabelFormat={valueText}
        step={10000}
        min={minPrice}
        max={maxPrice}
      />
    </div>
  );
};

export default PriceSlider;
