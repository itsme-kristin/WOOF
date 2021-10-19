import React, {useState} from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SearchBar from './searchbar.jsx';
import Dropdown from './dropdown.jsx';
import Box from '@mui/material/Box';
import TraitCheckbox from './traitcheckbox.jsx';
import PetMap from '../petmap/petMap.jsx';

const dropDownFilters = {
  'Distance': [5,10,25,50],
  'Breed': [1,2,3,4],
  'Size': ['small','medium','large','xlarge'],
  'Gender': ['male', 'female'],
  'Age': ['baby', 'young', 'adult', 'senior'],
  'Coat': ['short', 'medium', 'long', 'wire', 'hairless'],
}

const traits = {
  'Good with children': 'good_with_children' ,
  'Good with dogs': 'good_with_dogs' ,
  'Good with cats': 'good_with_cats' ,
  'House trained': 'house_trained' ,
  'Special needs': 'special_needs'
}

const Sidebar = (props) => {

  const [activeFilters, setActiveFilters] = useState({});

  const updateFilter = (key, value) => {
    if (value) {
      setActiveFilters({ ...activeFilters, [key]: value });
    } else {
      delete activeFilters[key];
    }
  }

  const handleSubmit = (event) => {
    console.log(activeFilters);
  }


  const getFilters = () => {
    return Object.keys(dropDownFilters).map((filter, index)=>{
      // console.log(filter);
      return (
        <Grid
          item
          container
          alignItems="flex-start"
          id={filter}
          key={filter}
        >
          <Dropdown
          key={index}
          text={filter}
          style={{float:'left'}}
          updateFilter={updateFilter}
          values={dropDownFilters[filter]}
          />
        </Grid>
      )
    });
  }

  const getChecksboxs = () => {
    return (Object.keys(traits).map((traitName)=>{
      return (
        <TraitCheckbox
          key={traitName}
          updateFilter={updateFilter}
          text={traitName}
          textKey={traits[traitName]}
        />
      )
    }
    ))
  }

  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        paddingLeft="15px"
      >
        <br />
        <SearchBar updateFilter={updateFilter}/>
        <br />
        <Box
          id="googleMap"
          sx={{
            width: 256,
            height: 197,
            backgroundColor: 'white',
            '&:hover': {
              backgroundColor: 'primary.main',
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <PetMap />
        </Box>

        <Grid
          container
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          sx={{ width: '200px' }}
          rowSpacing={3}
        >
          <br />
          {getFilters()}
        </Grid>
        <br />
        <br />
        <Stack spacing={.1} direction="column">
          {getChecksboxs()}
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
    </div>
  )
}

export default Sidebar;