import React, {useState, useEffect} from 'react';
import axios from 'axios';
import ResearchSidebar from '../sidebar/sidebarResearch.jsx';
import DogCard from '../card/dogCard.jsx';
import Grid from '@mui/material/Grid';

let height = screen.height;

const dropDownFilters = {
  'Breed Group': ['Toy', 'Terrier', 'Hound', 'Mixed', 'Working', 'Non-Sporting', 'Sporting', 'Herding'],
  'Weight': ['small','medium','large'],
  'Tempurment': ['Playful', 'Loyal', 'Independent', 'Intelligent', 'Happy', 'Friendly', 'Devoted', 'Reserved', 'Gentle', 'Confident', 'Loving', 'Alert', 'Fearless', 'Spirited', 'Agile', 'Active', 'Courageous', 'Kind', 'Reliable', 'Trustworthy', 'Powerful', 'Sensitive', 'Watchful', 'Inquisitive', 'Cheerful', 'Tolerant'],
}


const PetRearch = () => {
  const [dogArray, setDogArray] = useState( [] );
  const [breeds, setBreeds] = useState ([]);

  const getBreeds = () => {
    if (dogArray.length > 0) {
      return dogArray.map((dog, index)=>{
        if (dog) {
          let description = dog.description;
          if (description) {
            description = description.length > 15 ? description.slice(0,15) : description;
          }
          return ( <DogCard key={index} orientation={'landscape'} type={'star'} name={dog.name} image={dog.image.url} /> )
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

  useEffect(()=>{
    axios.get('/breed-details')
      .then((data)=> {
        setDogArray(data.data);
        compileBreeds(data.data);
      })
      .catch((error)=> {
        console.log(error);
      })
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
          paddingTop: '20px',
          overflow: 'scroll',
          width: '900px',
          height: '100%',
        }}
      >
        {getBreeds()}
      </Grid>


      <Grid item style={{}}sx={{height: '100%', backgroundColor: '#C6AC8F', overflow:'scroll'}}>
        <ResearchSidebar
          buttonText='compare'
          dropdowns={dropDownFilters}
          breeds={breeds}
        />
      </Grid>

    </Grid>
  )
}

export default PetRearch;