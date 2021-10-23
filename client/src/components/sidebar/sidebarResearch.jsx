import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dropdown from './dropdown.jsx';
import ComparisonModal from '../comparisonModal/comparisonModal.jsx';

const ResearchSidebar = (props) => {
  const getBreeds = props.getBreeds;
  const [dropDownFilters] = useState(props.dropdowns);
  const [breeds, setBreeds] = useState(props.breeds || []);

  const [activeFilters, setActiveFilters] = useState({});
  const [breed1, setBreed1] = useState('Affenpinscher');
  const [breed2, setBreed2] = useState('Affenpinscher');

  const active = props.active;

  const updateFilter = (key, value) => {
    if (value && value !== 'None') {
      setActiveFilters({ ...activeFilters, [key]: value });
    } else {
      delete activeFilters[key];
    }
  }

  //needs to update breed1 to store breed1 information object
  const updateBreed1 = (key, value) => {
    axios.get(`/breed-name?name=${value}`)
    .then((response) => {
      setBreed1(response.data);
    })
    .catch((err)=> {
      console.log('error in retrieving breed1 description');
    })
  };

  const updateBreed2 = (key, value) => {
    axios.get(`/breed-name?name=${value}`)
    .then((response) => {
      setBreed2(response.data);
    })
    .catch((err)=> {
      console.log('error in retrieving breed2 description');
    })
  }

  useEffect(()=>{
    setBreeds(props.breeds);
  },[props.breeds])

  const handleSubmit = (event) => {
    // console.log(activeFilters);
    getBreeds(activeFilters);
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
            // updateFilter={updateFilter}
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
          id='Breed1'
          key='Breed1'
        >
          <Dropdown
            // key={index}
            text='Select first breed to compare'
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
            text='Select 2nd breed to compare'
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
          px: '5px',
          overflow: 'scroll'
        }}
      >

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
              disabled={!active}
              variant="contained"
              // style={{marginRight:'20px'}}
              onClick={handleSubmit}
            >
              Apply
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