import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SearchBar from './searchbar.jsx';
import Dropdown from './dropdown.jsx';

const ResearchSidebar = (props) => {
  const [dropDownFilters] = useState(props.dropdowns);

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

  return (
    <div>
      <Grid
        container
        direction="column"
        justifyContent="center"
        alignItems="flex-start"
        sx={{
          width: '300px',
          px: '5px'
        }}
      >
        <br />
        <SearchBar updateFilter={updateFilter}/>
        <br />

        <Grid
          id='testing'
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
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Button
              variant="contained"
              // style={{marginRight:'20px'}}
              onClick={handleSubmit}
            >
              Compare
        </Button>
          </Grid>
      </Grid>
    </div>
  )
}

export default ResearchSidebar;