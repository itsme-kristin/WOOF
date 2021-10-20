import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import SearchBar from './searchbar.jsx';
import Dropdown from './dropdown.jsx';
import ComparisonModal from '../comparisonModal/comparisonModal.jsx';

const ResearchSidebar = (props) => {
  const [dropDownFilters] = useState(props.dropdowns);
  const [breeds, setBreeds] = useState(props.breeds || []);

  const [activeFilters, setActiveFilters] = useState({});
  const [breed1, setBreed1] = useState(null);
  const [breed2, setBreed2] = useState(null);

  const updateFilter = (key, value) => {
    if (value) {
      setActiveFilters({ ...activeFilters, [key]: value });
    } else {
      delete activeFilters[key];
    }
  }

  //needs to update breed1 to store breed1 information object
  const updateBreed1 = (key, value) => {
    if (value) {
      setBreed1({ [key]: value });
    }
  }

  //needs to update breed2 to store breed2 information object
  const updateBreed2 = (key, value) => {
    if (value) {
      setBreed2({ [key]: value });
    }
  }

  useEffect(()=>{
    setBreeds(props.breeds);
  },[props.breeds])

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

  const getBreedFilter = () => {
    // console.log('breeds gotten');
    if (breeds.length > 0) {
      return (
        <Grid
          item
          container
          alignItems="flex-start"
          id='breeds'
          key='breeds'
        >
          <Dropdown
            // key={index}
            text='breeds'
            style={{float:'left'}}
            updateFilter={updateFilter}
            values={breeds}
          />
        </Grid>
      );
    }
  }

    const getBreed1 = () => {
    // console.log('breeds gotten');
    if (breeds.length > 0) {
      return (
        <Grid
          item
          container
          alignItems="flex-start"
          id='breed1'
          key='breed1'
        >
          <Dropdown
            // key={index}
            text='breed1'
            style={{float:'left'}}
            updateFilter={updateBreed1}
            values={breeds}
          />
        </Grid>
      );
    }
  }

    const getBreed2 = () => {
    // console.log('breeds gotten');
    if (breeds.length > 0) {
      return (
        <Grid
          item
          container
          alignItems="flex-start"
          id='Breed2'
          key='Breed2'
        >
          <Dropdown
            // key={index}
            text='Breed2'
            style={{float:'left'}}
            updateFilter={updateBreed2}
           values={breeds}
          />
        </Grid>
      );
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
          {getBreedFilter()}

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

          <br />
          <Grid
          id='testingBreeds'
          container
          direction="column"
          justifyContent="center"
          alignItems="flex-start"
          sx={{ width: '200px' }}
          rowSpacing={3}
        >
          <br />

          {getBreed1()}
          {getBreed2()}

        </Grid>
          <br />
          <br />
          <Grid
            container
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <ComparisonModal breed1={breed1} breed2={breed2}/>
          </Grid>
      </Grid>
    </div>
  )
}

export default ResearchSidebar;