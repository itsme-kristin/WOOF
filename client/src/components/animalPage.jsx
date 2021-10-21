import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AnimalPhotoCarousel from './carousel/animalPhotoCarousel.jsx';
import AnimalOtherPetsCarousel from './carousel/animalOtherPetsCarousel.jsx';
import {
  Box,
  Button,
  Card,
  CardContent,
  Link,
  Grid,
  Typography
} from '@mui/material';
import CheckIcon from '@mui/icons-material/Check';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import { useAuth } from '../contexts/AuthContext.jsx';

const style = {
  button: {
    margin: 0,
    width: '350px'
  }
};

const AnimalPage = props => {
  const animalInfo = {
    id: 53317583,
    organization_id: 'MT59',
    url: 'https://www.petfinder.com/dog/josie-jj-covington-la-53317583/mt/roundup/janeens-catahoula-leopard-dog-rescue-inc-mt59/?referrer_id=e7aeebdb-543c-448c-973a-89723cb8f73b',
    type: 'Dog',
    species: 'Dog',
    breeds: {
      primary: 'Catahoula Leopard Dog',
      secondary: null,
      mixed: false,
      unknown: false
    },
    colors: {
      primary: 'Golden',
      secondary: 'White / Cream',
      tertiary: null
    },
    age: 'Young',
    gender: 'Female',
    size: 'Large',
    coat: null,
    attributes: {
      spayed_neutered: true,
      house_trained: false,
      declawed: null,
      special_needs: false,
      shots_current: true
    },
    environment: {
      children: true,
      dogs: true,
      cats: null
    },
    tags: ['Friendly', 'Affectionate', 'Loyal', 'Playful', 'Smart', 'Funny'],
    name: 'JOSIE-JJ (COVINGTON, LA)',
    description:
      'If  this pretty pup tugs on your heart please go to our website www.jcldr.com and fill out an online application....',
    organization_animal_id: 'KL CLA',
    photos: [
      {
        small:
          'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/1/?bust=1634719365&width=100',
        medium:
          'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/1/?bust=1634719365&width=300',
        large:
          'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/1/?bust=1634719365&width=600',
        full: 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/1/?bust=1634719365'
      },
      {
        small:
          'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/2/?bust=1634719366&width=100',
        medium:
          'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/2/?bust=1634719366&width=300',
        large:
          'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/2/?bust=1634719366&width=600',
        full: 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/2/?bust=1634719366'
      },
      {
        small:
          'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/3/?bust=1634719367&width=100',
        medium:
          'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/3/?bust=1634719367&width=300',
        large:
          'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/3/?bust=1634719367&width=600',
        full: 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/3/?bust=1634719367'
      }
    ],
    primary_photo_cropped: {
      small:
        'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/1/?bust=1634719365&width=300',
      medium:
        'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/1/?bust=1634719365&width=450',
      large:
        'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/1/?bust=1634719365&width=600',
      full: 'https://dl5zpyw5k3jeb.cloudfront.net/photos/pets/53317583/1/?bust=1634719365'
    },
    videos: [],
    status: 'adoptable',
    status_changed_at: '2021-10-20T08:42:48+0000',
    published_at: '2021-10-20T08:42:48+0000',
    distance: null,
    contact: {
      email: 'jj4@midrivers.com',
      phone: '406 323 3519',
      address: {
        address1: null,
        address2: null,
        city: 'Roundup',
        state: 'MT',
        postcode: '59072',
        country: 'US'
      }
    },
    _links: {
      self: {
        href: '/v2/animals/53317583'
      },
      type: {
        href: '/v2/types/dog'
      },
      organization: {
        href: '/v2/organizations/mt59'
      }
    },
    organization_name: "Janeen's Catahoula Leopard Dog Rescue Inc"
  };

  const { currentUser, signout, userData } = useAuth();
  const [userDataState, setUserDataState] = userData;
  const [ activeButton, setActiveButton ] = useState(false);
  const [ otherPets, setOtherPets ] = useState([]);

  const handleButtonClick = (event) => {
      if (activeButton) {
        setActiveButton(false);
        axios.put('/deleteDog', {email: userDataState.email, id: animalInfo.id})
        .then(response => {
          console.info('Dog deleted');
        })
        .catch(err => {
          console.error(err);
        })
      } else {
        setActiveButton(true);
        axios.put('/saveDog', {email: userDataState.email, dogObj: animalInfo})
        .then(response => {
          console.info('Dog saved!');
        })
        .catch(err => {
          console.error(err);
        })
      }
    };

  useEffect(()=> {
    axios.get('/organization', { params: { "id": animalInfo.organization_id}})
    .then((response) => {
      setOtherPets(response.data[1]);
      console.log(response.data[1]);
    })
    .catch((err)=> {
      console.log('error in retrieving other pets from this organization');
    })
  },[]);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} align='center' marginTop='4px'>
          <Typography variant='h3'> {animalInfo.name}</Typography>
          <Typography variant='h5'> {animalInfo.breeds.primary}</Typography>
        </Grid>
        <Grid item xs={12}>
          <AnimalPhotoCarousel photos={animalInfo.photos} numItems={3} />
        </Grid>
        <Grid container item xs={8} spacing={2}>
          <Grid item xs={12}>
            <Typography variant='body1'>{animalInfo.description}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body2' component='ul'>
              <li>Age: {animalInfo.age} </li>
              <li>Gender: {animalInfo.gender} </li>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body2' component='ul'>
              <li>Size: {animalInfo.size} </li>
              <li>
                Coat:{' '}
                {animalInfo.coat !== null ? animalInfo.coat : 'not available'}{' '}
              </li>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body2' component='ul'>
              <li>
                {animalInfo.attributes.spayed_neutered === true ? (
                  <CheckIcon />
                ) : (
                  <DoNotDisturbIcon />
                )}{' '}
                Spayed/Neutered
              </li>
              <li>
                {animalInfo.attributes.house_trained === true ? (
                  <CheckIcon />
                ) : (
                  <DoNotDisturbIcon />
                )}{' '}
                House Trained
              </li>
              <li>
                {animalInfo.attributes.declawed === true ? (
                  <CheckIcon />
                ) : (
                  <DoNotDisturbIcon />
                )}{' '}
                Declawed
              </li>
              <li>
                {animalInfo.attributes.special_needs === true ? (
                  <CheckIcon />
                ) : (
                  <DoNotDisturbIcon />
                )}{' '}
                Special Needs
              </li>
              <li>
                {animalInfo.attributes.shots_current === true ? (
                  <CheckIcon />
                ) : (
                  <DoNotDisturbIcon />
                )}{' '}
                Shots Current
              </li>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body2' component='ul'>
              Good with:
              <li>
                {animalInfo.environment.children === true ? (
                  <CheckIcon />
                ) : (
                  <DoNotDisturbIcon />
                )}{' '}
                Children
              </li>
              <li>
                {animalInfo.environment.dogs === true ? (
                  <CheckIcon />
                ) : (
                  <DoNotDisturbIcon />
                )}{' '}
                Dogs
              </li>
              <li>
                {animalInfo.environment.cats === true ? (
                  <CheckIcon />
                ) : (
                  <DoNotDisturbIcon />
                )}{' '}
                Cats
              </li>
            </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={4} spacing={1}>
<<<<<<< HEAD
          <Grid item xs={12} align="center">
          <Button variant="contained" sx={style.button} onClick={handleButtonClick}>
            Add {animalInfo.name} to your favorite animals list
          </Button>
        </Grid>
        <Grid item xs={12}>
          <Card sx={{height:"100%", padding:"10px"}}>
            <Typography variant="h5">{animalInfo.organization_name}</Typography>
            <br />
            <Typography variant="body1">
              {animalInfo.contact.address.address1}
            </Typography>
            <Typography>
              {animalInfo.contact.address.address2}
            </Typography>
            <Typography>
              {animalInfo.contact.address.city}{', '}{animalInfo.contact.address.state}{' '}{animalInfo.contact.address.postcode}
            </Typography>
            <br />
            <Typography variant="body1">
              {(<EmailIcon />)}{' '}{animalInfo.contact.email}
            </Typography>
            <Typography variant="body1">
              {(<PhoneIphoneIcon />)}{' '}{animalInfo.contact.phone}
            </Typography>
          </Card>
        </Grid>
=======
          <Grid item xs={12} align='center'>
            <Button variant='contained' sx={style.button}>
              Add {animalInfo.name} to your favorite animals list
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Card sx={{ height: '100%', padding: '10px' }}>
              <Typography variant='h5'>
                {animalInfo.organization_name}
              </Typography>
              <br />
              <Typography variant='body1'>
                {animalInfo.contact.address.address1}
              </Typography>
              <Typography>{animalInfo.contact.address.address2}</Typography>
              <Typography>
                {animalInfo.contact.address.city}
                {', '}
                {animalInfo.contact.address.state}{' '}
                {animalInfo.contact.address.postcode}
              </Typography>
              <br />
              <Typography variant='body1'>
                {<EmailIcon />}{' '}
                <Link href={`mailto:${animalInfo.contact.email}`}>
                  {animalInfo.contact.email}
                </Link>
              </Typography>
              <Typography variant='body1'>
                {<PhoneIphoneIcon />} {animalInfo.contact.phone}
              </Typography>
            </Card>
          </Grid>
>>>>>>> 05a561ea97e2c673be320fb4f403bf31b2bbbabd
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant='h4'>
            {' '}
            View other pets at {animalInfo.organization_name}{' '}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <AnimalOtherPetsCarousel otherPets={otherPets} numItems={5} />
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnimalPage;
