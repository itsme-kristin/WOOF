import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ResearchSidebar from '../sidebar/sidebarResearch.jsx';
import DogCard from '../card/dogCard.jsx';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

let height = screen.height;

const dropDownFilters = {
  'Breed Group': ['None','Toy', 'Terrier', 'Hound', 'Mixed', 'Working', 'Non-Sporting', 'Sporting', 'Herding'],
  'Weight': ['None','small','medium','large'],
  'Tempurment': ['None','Playful', 'Loyal', 'Independent', 'Intelligent', 'Happy', 'Friendly', 'Devoted', 'Reserved', 'Gentle', 'Confident', 'Loving', 'Alert', 'Fearless', 'Spirited', 'Agile', 'Active', 'Courageous', 'Kind', 'Reliable', 'Trustworthy', 'Powerful', 'Sensitive', 'Watchful', 'Inquisitive', 'Cheerful', 'Tolerant'],
}


const PetRearch = () => {
  const [dogArray, setDogArray] = useState( [] );
  const [breeds, setBreeds] = useState ([]);

  const renderBreeds = () => {
    if (dogArray.length > 0) {
      return dogArray.map((dog, index)=>{
        if (dog) {
          let description = dog.description;
          if (description) {
            description = description.length > 15 ? description.slice(0,15) : description;
            console.log(description);
          }
          return (
            <div style={{marginBottom: '20px'}}>
              <DogCard
                key={index}
                orientation={'landscape'}
                type={'star'}
                name={dog.name}
                image={dog.image.url}
                breedObj={dog}
              />
            </div>
          )
        }
      });
    }
  }

  const compileBreeds = (breedArr) => {
    // console.log(breedArr)s;
    let breedNames = [];
    breedArr.map((breed)=>{
      breedNames.push(breed.name)
    })
    setBreeds(breedNames);
  }


  const getBreeds = () => {
    axios.get('/breed-details')
    .then((data)=> {
      setDogArray(data.data);
      compileBreeds(data.data);
    })
    .catch((error)=> {
      console.log(error);
    })
  }

  useEffect(()=>{
    getBreeds();
  }, []);

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
        width:'100%',
      }}
    >
      <Grid
        container
        direction="row"
        justifyContent="space-around"
        alignItems="center"
        sx={{
          paddingTop: '20px',
          overflow: 'hidden',
          width: '77%',
          height: '100%',
        }}
      >

        <Grid sx={{width: '100%', justifyContent: 'center', alignItems:"center", height: '50px'}}>
          <Typography variant="subtitle1" gutterBottom component="div" sx={{width:'100px', margin: '0 auto'}}>
            Dog Breeds
          </Typography>
        </Grid>

        <Grid
          container
          direction="row"
          justifyContent="space-around"
          alignItems="center"
          sx={{
            overflow: 'scroll',
            width: '100%',
            height: '100%',
            pt: '20px',
            pb: '50px',
          }}
        >
        {renderBreeds()}
        </Grid>
      </Grid>


      <Grid item style={{}}sx={{ height: '100%', width:'23%', backgroundColor: '#C6AC8F', overflowX: 'hidden', overflowY: 'scroll'}}>
        <ResearchSidebar
          dropdowns={dropDownFilters}
          breeds={breeds}
        />
      </Grid>

    </Grid>
  )
}

export default PetRearch;