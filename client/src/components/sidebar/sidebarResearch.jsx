import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Dropdown from './dropdown.jsx';
import ComparisonModal from '../comparisonModal/comparisonModal.jsx';
import { TextField } from '@mui/material';

const ResearchSidebar = props => {
  const getBreeds = props.getBreeds;
  const [dropDownFilters] = useState(props.dropdowns);
  const [breeds, setBreeds] = useState(props.breeds || []);

  const [activeFilters, setActiveFilters] = useState({});
  const [breed1, setBreed1] = useState([
    [
      {
        height: {
          imperial: "9 - 11.5",
          metric: "23 - 29",
        },
        image: {
          height: 1199,
          id: "BJa4kxc4X",
          url: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
          width: 1600,
        },
        weight: "small",
        _id: "6169acbe99bd0491f8a6c7a4",
        bred_for: "Small rodent hunting, lapdog",
        breed_group: "Toy",
        country_code: "",
        id: 1,
        life_span: "10 - 12 years",
        name: "Affenpinscher",
        origin: "Germany, France",
        reference_image_id: "BJa4kxc4X",
        temperament:
          "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
        __v: 0,
      },
    ],
    [
      {
        _id: "616af8ffac0f80f68ad2c499",
        breedName: "affenpinscher",
        description:
          "Canines in the Affenpinscher dog breed were originally created to be ratters in homes, stables, and shops. Bred down in size, they moved up in the world, becoming ladies’ companions. Today, they are happy, mischievous companion dogs.",
        __v: 0,
      },
    ],
  ]);
  const [breed2, setBreed2] = useState([
    [
      {
        height: {
          imperial: "9 - 11.5",
          metric: "23 - 29",
        },
        image: {
          height: 1199,
          id: "BJa4kxc4X",
          url: "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
          width: 1600,
        },
        weight: "small",
        _id: "6169acbe99bd0491f8a6c7a4",
        bred_for: "Small rodent hunting, lapdog",
        breed_group: "Toy",
        country_code: "",
        id: 1,
        life_span: "10 - 12 years",
        name: "Affenpinscher",
        origin: "Germany, France",
        reference_image_id: "BJa4kxc4X",
        temperament:
          "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
        __v: 0,
      },
    ],
    [
      {
        _id: "616af8ffac0f80f68ad2c499",
        breedName: "affenpinscher",
        description:
          "Canines in the Affenpinscher dog breed were originally created to be ratters in homes, stables, and shops. Bred down in size, they moved up in the world, becoming ladies’ companions. Today, they are happy, mischievous companion dogs.",
        __v: 0,
      },
    ],
  ]);

  const active = props.active;

  const updateFilter = (key, value) => {
    if (value && value !== 'None') {
      setActiveFilters({ ...activeFilters, [key]: value });
    } else {
      delete activeFilters[key];
    }
  };

  //needs to update breed1 to store breed1 information object
  const updateBreed1 = (key, value) => {
    axios
      .get(`/breed-name?name=${value}`)
      .then(response => {
        setBreed1(response.data);
      })
      .catch(err => {
        console.log('error in retrieving breed1 description');
      });
  };

  const updateBreed2 = (key, value) => {
    axios
      .get(`/breed-name?name=${value}`)
      .then(response => {
        setBreed2(response.data);
      })
      .catch(err => {
        console.log('error in retrieving breed2 description');
      });
  };

  useEffect(() => {
    setBreeds(props.breeds);
  }, [props.breeds]);

  const handleSubmit = event => {
    // console.log(activeFilters);
    getBreeds(activeFilters);
  };

  const getFilters = () => {
    if (dropDownFilters) {
      return Object.keys(dropDownFilters).map((filter, index) => {
        // console.log(filter);
        return (
          <Grid item container alignItems='flex-start' id={filter} key={filter}>
            <Dropdown
              key={index}
              text={filter}
              style={{ float: 'left' }}
              updateFilter={updateFilter}
              values={dropDownFilters[filter]}
            />
          </Grid>
        );
      });
    }
  };

  const getBreedFilter = () => {
    // console.log('breeds gotten');
    if (breeds.length > 0) {
      return (
        <Grid item container alignItems='flex-start' id='breeds' key='breeds'>
          <Dropdown
            // key={index}
            text='breeds'
            style={{ float: 'left' }}
            // updateFilter={updateFilter}
            values={breeds}
          />
        </Grid>
      );
    }
  };

  const getBreed1 = () => {
    // console.log('breeds gotten');
    if (breeds.length > 0) {
      return (
        <Grid item container alignItems='flex-start' id='Breed1' key='Breed1'>
          <Dropdown
            // key={index}
            text='Select first breed to compare'
            style={{ float: 'left' }}
            updateFilter={updateBreed1}
            values={breeds}
          />
        </Grid>
      );
    }
  };

  const getBreed2 = () => {
    // console.log('breeds gotten');
    if (breeds.length > 0) {
      return (
        <Grid item container alignItems='flex-start' id='Breed2' key='Breed2'>
          <Dropdown
            // key={index}
            text='Select 2nd breed to compare'
            style={{ float: 'left' }}
            updateFilter={updateBreed2}
            values={breeds}
          />
        </Grid>
      );
    }
  };

  return (
    <div>
      <Grid
        container
        direction='column'
        justifyContent='center'
        alignItems='flex-start'
        sx={{
          width: '300px',
          px: '5px',
          overflow: 'scroll'
        }}
      >
        <Grid
          id='testing'
          container
          direction='column'
          justifyContent='center'
          alignItems='flex-start'
          sx={{ width: '200px' }}
          rowSpacing={3}
        >
          <br />
          <br />
          <TextField
            label='Filter Breeds'
            value={props.filterTerm}
            onChange={e => props.setFilterTerm(e.target.value)}
          />
          {getFilters()}
          {getBreedFilter()}
        </Grid>
        <br />
        <br />
        <Grid
          container
          direction='row'
          justifyContent='center'
          alignItems='center'
        >
          <Button
            disabled={!active}
            variant='contained'
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
          direction='column'
          justifyContent='center'
          alignItems='flex-start'
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
          direction='row'
          justifyContent='center'
          alignItems='center'
        >
          <ComparisonModal breed1={breed1} breed2={breed2} />
        </Grid>
      </Grid>
    </div>
  );
};

export default ResearchSidebar;
