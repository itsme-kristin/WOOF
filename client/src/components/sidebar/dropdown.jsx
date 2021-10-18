import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const testData = [
  {
    value: '0',
    label: 'One',
  },
  {
    value: '1',
    label: 'Two',
  },
  {
    value: '2',
    label: 'Three',
  },
  {
    value: '3',
    label: 'Four',
  },
];

const Dropdown = (props) => {
  const text = props.text;
  const updateFilter = props.updateFilter;
  const [value, setValue] = useState(0);

  const handleChange = (event) => {
    setValue(event.target.value);
  }

  useEffect(()=>{
    // console.log(testData[value]);
    updateFilter(text, testData[value]);
  }, [value])

  return (
    <TextField
      id="outlined-select-currency"
      select
      label={text}
      defaultValue={text}
      onChange={handleChange}
      sx={{ m: 1, width: '123px', height: '31px' , padding: '0px'}}
      // helperText="Please select your currency"
    >
      {testData.map((option) => (
        <MenuItem key={option.value} value={option.value}>
          {option.label}
        </MenuItem>
      ))}
    </TextField>
  )
}

export default Dropdown;