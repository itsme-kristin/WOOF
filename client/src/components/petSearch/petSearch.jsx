import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SideBar from '../sidebar/sidebarPetSearch.jsx';
import DogCard from '../card/dogCard.jsx';
import Grid from '@mui/material/Grid';

// const dogArray = new Array(12).fill('dog');
let height = screen.height;

const dropDownFilters = {
  'Distance': ['',5,10,25,50],
  'Size': ['','small','medium','large','xlarge'],
  'Gender': ['','male', 'female', ''],
  'Age': ['','baby', 'young', 'adult', 'senior'],
  'Coat': ['','short', 'medium', 'long', 'wire', 'hairless'],
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

  const getDogs = () => {
    if (dogArray.length > 0) {
      return dogArray.map((dog, index)=>{
        let name = dog.name.slice(0, 15);
        let description = dog.description;
        if (description) {
          description = description.length > 15 ? description.slice(0,15) : description;
        }
        if (dog.photos.length > 0) {
          return ( <DogCard key={index} type={'heart'} name={name} image={dog.photos[0]['medium']} text={description} /> )
        }
        // else {
        //   return ( <DogCard key={index} type={'heart'} name={name} text={description} /> )
        // }
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

  useEffect(()=>{
    axios.get('/adopt')
      .then((data)=> {
        setDogArray(data.data.animals);
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
        margin: '0px',
        width:'1200px',
        overflow: 'hidden'
      }}
    >

      <Grid item style={{}}sx={{height: '100%', backgroundColor: '#C6AC8F'}}>
        <SideBar
          dropdowns={dropDownFilters}
          breeds={breeds}
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
          height: '100%',
          paddingTop: '20px',
        }}
      >
        {getDogs()}
      </Grid>

    </Grid>
  )
}

export default PetSearch;