import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SideBar from '../sidebar/sidebarPetSearch.jsx';
import DogCard from '../card/dogCard.jsx';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

// const dogArray = new Array(12).fill('dog');
let height = screen.height;

const dropDownFilters = {
  'Distance': ['None',5,10,25,50],
  'Size': ['None','small','medium','large','xlarge'],
  'Gender': ['None','male', 'female'],
  'Age': ['None','baby', 'young', 'adult', 'senior'],
  'Coat': ['None','short', 'medium', 'long', 'wire', 'hairless'],
}

const traits = {
  'Good with children': 'good_with_children' ,
  'Good with dogs': 'good_with_dogs' ,
  'Good with cats': 'good_with_cats' ,
  'House trained': 'house_trained' ,
  'Special needs': 'special_needs'
}

const PetSearch = () => {
  const [dogArray, setDogArray] = useState( [] );
  const [breeds, setBreeds] = useState ([]);

  const renderDogs = () => {
    if (dogArray && dogArray.length > 0) {
      return dogArray.map((dog, index)=>{
        // console.log('dog: ', dog);
        let name = dog.name.slice(0, 15);
        let description = `${dog.age} ${dog.breeds.primary}`;
        if (description) {
          description = description.length > 15 ? description.slice(0,15) : description;
        }
        if (dog.photos.length > 0) {
          return (

            <div style={{marginBottom: '20px'}}>
              <DogCard
                key={index}
                type={'heart'}
                name={name}
                image={dog.photos[0]['medium']}
                text={description}
              />
            </div>
          )
        } else {
          return (
            <div style={{marginBottom: '20px'}}>
              <DogCard
                key={index}
                type={'heart'}
                name={name}
                text={description}
              />
            </div>
          )
        }
      });
    }
  }

  const compileBreeds = (breedArr) => {
    // console.log(breedArr);
    let breedNames = [];
    breedArr.map((breed)=>{
      breedNames.push(breed.name)
    })
    setBreeds(breedNames);
  }

  const getDogs = (filters) => {
    axios.get('/adopt')
      .then((data)=> {
        // console.log(data.data);
        setDogArray(data.data);
      })
      .then((data)=>{
        return axios.get('/breed-details')
      })
      .then((data)=> {
        compileBreeds(data.data);
      })
      .catch((error)=> {
        console.log(error);
      })
  }

  useEffect(()=>{
    getDogs();
  }, []);

  return (
    <Grid
      id='petSearch'
      container
      direction="row"
      justifyContent="flex-start"
      alignItems="center"
      sx={{
        height: '100%',
        width:'1200px',
      }}
    >

      <Grid
        item
        sx={{
          height: '100%',
          backgroundColor: '#C6AC8F',
          overflow: 'scroll',
          paddingBottom: '50px',
          width: '23%',
        }}
      >
        <SideBar
          dropdowns={dropDownFilters}
          breeds={breeds}
          checkboxs={traits}
          getDogs={getDogs}
        />
      </Grid>


      <Grid
        container
        direction="row"
        justifyContent="center"
        alignItems="center"
        sx={{
          overflow: 'hidden',
          width: '77%',
          height: '100%',
          paddingTop: '20px',
        }}
      >
        <Grid sx={{width: '100%', justifyContent: 'center', alignItems:"center", height: '50px'}}>
          <Typography variant="subtitle1" gutterBottom component="div" sx={{width:'100px', margin: '0 auto'}}>
            Adopt A Pet
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
          {renderDogs()}
        </Grid>
      </Grid>

    </Grid>
  )
}

export default PetSearch;