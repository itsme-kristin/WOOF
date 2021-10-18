import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SearchBar from './searchBar.jsx';
import Dropdown from './dropdown.jsx';
import Box from '@mui/material/Box';
import TraitCheckbox from './traitCheckbox.jsx';

const Sidebar = (props) => {
  const [filters, setFilters] = useState([
    'Distance',
    'Breed',
    'Size',
    'Gender',
    'Age',
    'Coat',
  ])
  const [activeFilters, setActiveFilters] = useState({});

  const updateFilter = (key, value) => {
    setActiveFilters({ ...activeFilters, [key]: value });
  }

  const handleSubmit = (event) => {
    console.log(activeFilters);
  }


  const generatFilters = () => {
    return filters.map((filter, index)=>{
      // console.log(filter);
      return <Dropdown id={filter} key={index} text={filter} style={{float:'left'}} updateFilter={updateFilter} />
    });
  }

  return (
    <Grid
      container
      direction="column"
      justifyContent="flex-start"
      alignItems="center"
      sx={{ width: '300px' }}
    >
      <SearchBar updateFilter={updateFilter}/>
      <Box
        sx={{
          width: 256,
          height: 197,
          backgroundColor: 'white',
          '&:hover': {
            backgroundColor: 'primary.main',
            opacity: [0.9, 0.8, 0.7],
          },
        }}
      />
      <Stack spacing={4} direction="column">
        <br />
        {generatFilters()}
      </Stack>
      <br />
      <br />
      <Stack spacing={.1} direction="column">
        <TraitCheckbox updateFilter={updateFilter}/>
        <TraitCheckbox updateFilter={updateFilter}/>
        <TraitCheckbox updateFilter={updateFilter}/>
        <TraitCheckbox updateFilter={updateFilter}/>
        <TraitCheckbox updateFilter={updateFilter}/>
      </Stack>
        <Grid
          container
          direction="row"
          justifyContent="flex-end"
          alignItems="center"
        >
          <Button variant="contained" style={{marginRight:'20px'}} onClick={handleSubmit}>Apply</Button>
        </Grid>
    </Grid>
  )
}

export default Sidebar;