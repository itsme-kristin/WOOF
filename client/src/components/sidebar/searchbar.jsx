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
    setValues(event.target.value);
  }

  useEffect(()=>{
    updateFilter('search', values);
  }, [values]);

  return (
    <FormControl sx={{ m: 1, width: '256px'}}>
      <InputLabel htmlFor="outlined-adornment-password"> SEARCH </InputLabel>
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
        label="Search"
      />
    </FormControl>
  )
}

export default SearchBar;