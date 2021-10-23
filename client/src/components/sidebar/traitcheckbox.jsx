import React, { useState, useEffect } from 'react';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const TraitCheckbox = (props) => {
  const text = props.text || 'empty';
  const textKey = props.textKey;
  const updateFilter = props.updateFilter;

  const handleClick = (event) =>{
    updateFilter(textKey, event.target.checked);
  }

  return (
    <FormGroup>
      <FormControlLabel control={<Checkbox value />} label={text} onClick={handleClick} />
    </FormGroup>
  )
}

export default TraitCheckbox;