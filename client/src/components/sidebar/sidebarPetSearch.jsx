import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SearchBar from './searchbar.jsx';
import Dropdown from './dropdown.jsx';
import Box from '@mui/material/Box';
import TraitCheckbox from './traitcheckbox.jsx';
import PetMap from '../petmap/petMap.jsx';

const Sidebar = (props) => {
  const [dropDownFilters] = useState(props.dropdowns);
  const [checkboxTraits] = useState(props.checkboxs);
  const [buttonType] = useState(props.buttonText || 'apply');

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
    if (dropDownFilters) {
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
  }

  const getChecksboxs = () => {
    if (checkboxTraits) {
      const traitArr = Object.keys(checkboxTraits);
      return (traitArr.map((traitName)=>{
        return (
          <TraitCheckbox
            key={traitName}
            updateFilter={updateFilter}
            text={traitName}
            textKey={checkboxTraits[traitName]}
          />
        )
      }
      ))
    }
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
            <Button
              variant="contained"
              style={{marginRight:'20px'}}
              onClick={handleSubmit}
            >
              Apply
            </Button>
          </Grid>
      </Grid>
    </div>
  )
}

export default Sidebar;