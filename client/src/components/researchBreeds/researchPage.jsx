import React, {useState} from 'react';
import ResearchSidebar from '../sidebar/sidebarReSearch.jsx';
import DogCard from '../card/dogCard.jsx';
import Grid from '@mui/material/Grid';

let height = screen.height;

const dropDownFilters = {
  'Breed': [1,2,3,4],
  'Breed Group': [5,10,25,50],
  'Size': ['small','medium','large','xlarge'],
  'Tempurment': ['male', 'female'],
}

const PetRearch = () => {
  const [dogArray] = useState(new Array(9).fill('dog'));

  const getDogs = () => {
    return dogArray.map((dog, index)=>{
      return ( <DogCard key={index} type={'star'} orientation={'landscape'} image={'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53309608/1/?bust=1634664953&width=300'}/> )
    });
  }

  return (
    <Grid
      id='petSearch'
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{
        height: '100%',
        padding: '0px',
        width:'1200px',
        overflow: 'hidden',
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        sx={{
          overflow: 'scroll',
          width: '900px',
          height: '800px',
        }}
      >
        {getDogs()}
      </Grid>


      <Grid item style={{}}sx={{height: '100%', backgroundColor: '#C6AC8F', overflow:'scroll'}}>
        <ResearchSidebar
          buttonText='compare'
          dropdowns={dropDownFilters}
        />
      </Grid>

    </Grid>
  )
}

export default PetRearch;