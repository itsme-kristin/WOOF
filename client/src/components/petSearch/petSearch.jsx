import React, {useState, useEffect} from 'react';
import axios from 'axios';
import SideBar from '../sidebar/sidebarPetSearch.jsx';
import DogCard from '../card/dogCard.jsx';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useAuth } from '../../contexts/AuthContext.jsx';


const dropDownFilters = {
  'Distance': ['None',5,10,25,50],
  'Size': ['None','small','medium','large','xlarge'],
  'Gender': ['None','male', 'female'],
  'Age': ['None','baby', 'young', 'adult', 'senior'],
  'Coat': ['None','short', 'medium', 'long', 'wire', 'hairless'],
}

const traits = {
  "Good with children": "good_with_children",
  "Good with dogs": "good_with_dogs",
  "Good with cats": "good_with_cats",
  "House trained": "house_trained",
  "Special needs": "special_needs",
};

const PetSearch = () => {
  const [dogArray, setDogArray] = useState([]);
  const [breeds, setBreeds] = useState([]);
  const [active, setActive] = useState(false);
  const { zipSearch } = useAuth();
  const [ zipcode, setZipcode ] = zipSearch;
  const [ mapDistance, setMapDistance ] = useState(10);

  const renderDogs = () => {
    if (dogArray && dogArray.length > 0) {
      return dogArray.map((dog, index) => {
        let name = dog.name.slice(0, 15);
        let description = `${dog.age} ${dog.breeds.primary}`;
        if (description) {
          description =
            description.length > 15 ? description.slice(0, 15) : description;
        }
        if (dog.photos.length > 0) {
          return (

            <div style={{marginBottom: '20px'}} key={index}>
              <DogCard
                key={index}
                type={'heart'}
                dogObj={dog}
                name={name}
                image={dog.photos[0]['medium']}
                text={description}
              />
            </div>
          )
        } else {
          return (
            <div style={{marginBottom: '20px'}} key={index}>
              <DogCard
                key={index}
                type={'heart'}
                dogObj={dog}
                name={name}
                text={description}
              />
            </div>
          )
        }
      });
    } else {
      return (
        <Typography
          variant="subtitle1"
          gutterBottom
          component="div"
          sx={{width:'168px', margin: '0 auto'}}>
          No Matching Dogs
        </Typography>
      )
    }
  };

  const compileBreeds = (breedArr) => {
    let breedNames = [];
    breedArr.map((breed) => {
      breedNames.push(breed.name);
    });
    setBreeds(breedNames);
  };

  const getDogs = (filters) => {
    const config = {};
    setActive(false);
    if (filters) {
      if (filters.location) {
        if (filters.location.toString().length < 5) {
          filters.location = zipcode;
        } else {
          setZipcode(filters.location);
        }
      }
      if (filters.distance) {
        setMapDistance(filters.distance);
      }
      config.params = filters
    }

    axios.get('/adopt', config)
      .then((data)=> {
        setDogArray(data.data);
      })
      .then((data) => {
        setActive(true);
        return axios.get("/breed-details");
      })
      .then((data) => {
        compileBreeds(data.data);
      })
      .catch((error) => {
        console.log(error);
        setActive(true);
      })
  }

  useEffect(()=>{
    getDogs();
  }, []);

  return (
    <Grid
      id="petSearch"
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
          active={active}
          distance={mapDistance}
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
  );
};

export default PetSearch;
