// import { FormControl, Select, InputLabel, MenuItem } from '@mui/material';
// import React, { useState } from 'react';

// const BreedDropdown = ({ values }) => {
//   const [activeValue, setActiveValue] = useState(values[0]);
//   return (
//     <>
//       <FormControl>
//         <InputLabel>Breeds</InputLabel>
//         <Select
//           multiple
//           sx={{
//             m: 1,
//             width: '123px',
//             height: '31px',
//             padding: '0px',
//             marginLeft: '0px'
//           }}
//         >
//           {values.map(breed => {
//             <MenuItem>{breed}</MenuItem>;
//           })}
//         </Select>
//       </FormControl>
//     </>
//   );
// };

import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';

const testData = ['one', 'two', 'three'];

const BreedDropdown = ({ text, updateFilter, values }) => {
  const [activeValues, setActiveValues] = useState(['All Breeds']);

  const handleChange = event => {
    const newValue = event.target.value;
    const idx = activeValues.indexOf(newValue);
    if (idx > -1) {
      const activeValuesCopy = [...activeValues];
      activeValuesCopy.splice(idx, 1);
      setActiveValues(activeValuesCopy);
    } else {
      setActiveValues([...activeValues, newValue]);
    }
  };

  useEffect(() => {
    // console.log(text, values.indexOf(activeValue));
    const idx = activeValues.indexOf('All Breeds');
    if (idx > -1) {
      const activeValuesCopy = [...activeValues];
      activeValuesCopy.splice(idx, 1);
      updateFilter(text, activeValuesCopy.join(','));
    } else {
      updateFilter(text, activeValues.join(','));
    }
  }, [activeValues]);

  return (
    <TextField
      id='outlined-select-currency'
      select
      label={`${text[0].toUpperCase() + text.slice(1)}`}
      value={activeValues[activeValues.length - 1]}
      onChange={handleChange}
      sx={{
        m: 1,
        width: '123px',
        height: '31px',
        padding: '0px',
        marginLeft: '0px'
      }}
      // helperText="Please select your currency"
    >
      {['All Breeds', ...values].map((option, index) => (
        <MenuItem key={index} value={option}>
          {option}
        </MenuItem>
      ))}
    </TextField>
  );
};

export default BreedDropdown;
