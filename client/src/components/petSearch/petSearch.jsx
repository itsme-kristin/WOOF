import React from 'react';
import SideBar from '../sidebar/sidebar.jsx';
import DogCard from '../card/dogCard.jsx';
import Grid from '@mui/material/Grid';

const dogArray = new Array(12).fill('dog');

const PetSearch = () => {
  const getDogs = () => {
    return dogArray.map((dog)=>{
      return ( <DogCard type={'heart'} /> )
    });
  }

  return (
    <Grid
      container
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      sx={{
        padding: '0px'
      }}
    >
      {/* TODO: the bgcolor is not filling the entire virticle space */}
      <Grid item sx={{height: '100%', backgroundColor: '#C6AC8F'}}>
        <SideBar style={{}}/>
      </Grid>

      <Grid item sm={8.5}>
        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          sx={{
            height: '1000px',
            backgroundColor: 'white',
            overflow: 'scroll'
          }}
        >
          {getDogs()}
        </Grid>
      </Grid>

    </Grid>
  )
}

export default PetSearch;