import React, { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const testData = ['one', 'two', 'three'];

const Dropdown = (props) => {
  const text = props.text;
  const updateFilter = props.updateFilter;
  const [values, setValues] = useState(props.values || testData);
  const [activeValue, setActiveValue] = useState(props.values[0]);

  const handleChange = (event) => {
    setActiveValue(event.target.value);
    updateFilter(text.toLowerCase(), event.target.value);
  }

  return (
    <TextField
      id="outlined-select-currency"
      select
      label={text}
      defaultValue={text}
      value={activeValue}
      onChange={handleChange}
      sx={{ m: 1, width: '100%', height: '28px', mx: '0px'}}
      // helperText="Please select your currency"
    >
      {values.map((option, index) => (
        <MenuItem key={index} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default Dropdown;