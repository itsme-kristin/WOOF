import React, {useState} from 'react';
import SideBar from '../sidebar/sidebar.jsx';
import DogCard from '../card/dogCard.jsx';
import Grid from '@mui/material/Grid';

// const dogArray = new Array(12).fill('dog');
let height = screen.height - 170;


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
        height: {height},
        padding: '0px',
        width:'1200px',
        overflow: 'hidden',
      }}
    >

      <Grid item style={{}}sx={{height: {height}, backgroundColor: '#C6AC8F'}}>
        <SideBar style={{}}/>
      </Grid>

      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          overflow: 'scroll',
          width: '900px'
        }}
      >
        {getDogs()}
      </Grid>

    </Grid>
  )
}

export default PetSearch;