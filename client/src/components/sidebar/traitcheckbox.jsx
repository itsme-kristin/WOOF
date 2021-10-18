import React, { useState, useEffect } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const TraitCheckbox = (props) => {
  const text = props.text || 'empty';
  const updateFilter = props.updateFilter;
  const [value, setValue] = useState(false);

  useEffect(()=>{
    updateFilter(text, value);
  }, [value]);

  const handleClick = () =>{
    setValue(!value);
  }

  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox value />} label={text} onClick={handleClick} />
    </FormGroup>
  )
}

export default TraitCheckbox;