import React, {useState} from 'react';
import SideBar from '../sidebar/sidebarPetSearch.jsx';
import DogCard from '../card/dogCard.jsx';
import Grid from '@mui/material/Grid';

// const dogArray = new Array(12).fill('dog');
let height = screen.height;

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

const PetSearch = () => {
  const [dogArray] = useState(new Array(12).fill('dog'));

  const getDogs = () => {
    return dogArray.map((dog, index)=>{
      return ( <DogCard key={index} type={'heart'} /> )
    });
  }

  return (
    <Grid
      id='petSearch'
      container
      direction="row"
      justifyContent="start"
      alignItems="center"
      sx={{
        height: '100%',
        padding: '0px',
        width:'1200px',
        overflow: 'hidden',
      }}
    >

      <Grid item style={{}}sx={{height: '100%', backgroundColor: '#C6AC8F'}}>
        <SideBar
          dropdowns={dropDownFilters}
          checkboxs={traits}
        />
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        sx={{
          overflow: 'scroll',
          width: '900px',
          height: '950px',
        }}
      >
        {getDogs()}
      </Grid>

    </Grid>
  )
}

export default PetSearch;