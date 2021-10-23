import React, {useState, useEffect} from 'react';
import TextField from '@mui/material/TextField';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import InputLabel from '@mui/material/InputLabel';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const SearchBar = (props) => {
  const updateFilter = props.updateFilter;
  const [values, setValues] = useState('');

  const handleChange = (event) => {
    let zip = event.target.value;
    zip = zip.slice(0,5);
    const zipN = Number(zip);
    if (Number.isInteger(zipN)) {
      setValues(zip);
    }
  }

  useEffect(()=>{
    updateFilter('location', values);
  }, [values]);

  return (
    <FormControl sx={{ m: 1, width: '256px', marginLeft: '0px'}}>
      <InputLabel htmlFor="outlined-adornment-password"> Zip Code </InputLabel>
      <OutlinedInput
        id="outlined-adornment-password"
        value={values}
        onChange={handleChange}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              edge="end"
            >
              <SearchIcon />
            </IconButton>
          </InputAdornment>
        }
        label="Zip Code"
      />
    </FormControl>
  )
}

export default SearchBar;