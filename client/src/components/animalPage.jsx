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
import PublicIcon from '@mui/icons-material/Public';
import { useAuth } from '../contexts/AuthContext.jsx';

const style = {
  button: {
    margin: 0,
    width: '350px'
  }
};

const AnimalPage = (props) => {
  const { currentUser, signout, userData, dogOverview } = useAuth();
  const [userDataState, setUserDataState] = userData;
  const [dogOverviewState, setDogOverviewState] = dogOverview;
  const [ activeButton, setActiveButton ] = useState(false);
  const [ orgName, setOrgName ] = useState([]);
  const [ orgWebsite, setOrgWebsite ] = useState([]);
  const [ otherPets, setOtherPets ] = useState([]);

  const handleButtonClick = (event) => {
    if (activeButton) {
      setActiveButton(false);
      axios.put('/deleteDog', {email: userDataState.email, id: dogOverviewState.id})
      .then(response => {
        console.info('Dog deleted');
      })
      .catch(err => {
        console.error(err);
      })
    } else {
      setActiveButton(true);
      axios.put('/saveDog', {email: userDataState.email, dogObj: dogOverviewState})
      .then(response => {
        console.info('Dog saved!');
      })
      .catch(err => {
        console.error(err);
      })
    }
  };

  useEffect(()=> {
    axios.get(`/organization?id=${dogOverviewState.organization_id}`)
    .then((response) => {
      setOrgName(response.data[0]);
      setOrgWebsite(response.data[1]);
      setOtherPets(response.data[2]);
    })
    .catch((err)=> {
      console.log('error in retrieving other pets from this organization');
    })
  }, []);

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} align='center' marginTop='4px'>
          <Typography variant='h3'> {dogOverviewState.name}</Typography>
          <Typography variant='h5'> {dogOverviewState.breeds.primary}</Typography>
        </Grid>
        <Grid item xs={12} sx={{ backgroundColor: '#C6AC8F' }}>
          <AnimalPhotoCarousel photos={dogOverviewState.photos} numItems={3} />
        </Grid>
        <Grid container item xs={8} spacing={2}>
          <Grid item xs={12} sx={{ marginLeft: '15px'}}>
            <Typography variant='body1'>{dogOverviewState.description}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body2' component='ul'>
              <li>Age: {dogOverviewState.age} </li>
              <li>Gender: {dogOverviewState.gender} </li>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body2' component='ul'>
              <li>Size: {dogOverviewState.size} </li>
              <li>
                Coat:{' '}
                {dogOverviewState.coat !== null ? dogOverviewState.coat : 'not available'}{' '}
              </li>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body2' component='ul'>
              <li>
                {dogOverviewState.attributes.spayed_neutered === true ? (
                  <CheckIcon />
                ) : (
                  <DoNotDisturbIcon />
                )}{' '}
                Spayed/Neutered
              </li>
              <li>
                {dogOverviewState.attributes.house_trained === true ? (
                  <CheckIcon />
                ) : (
                  <DoNotDisturbIcon />
                )}{' '}
                House Trained
              </li>
              <li>
                {dogOverviewState.attributes.declawed === true ? (
                  <CheckIcon />
                ) : (
                  <DoNotDisturbIcon />
                )}{' '}
                Declawed
              </li>
              <li>
                {dogOverviewState.attributes.special_needs === true ? (
                  <CheckIcon />
                ) : (
                  <DoNotDisturbIcon />
                )}{' '}
                Special Needs
              </li>
              <li>
                {dogOverviewState.attributes.shots_current === true ? (
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
                {dogOverviewState.environment.children === true ? (
                  <CheckIcon />
                ) : (
                  <DoNotDisturbIcon />
                )}{' '}
                Children
              </li>
              <li>
                {dogOverviewState.environment.dogs === true ? (
                  <CheckIcon />
                ) : (
                  <DoNotDisturbIcon />
                )}{' '}
                Dogs
              </li>
              <li>
                {dogOverviewState.environment.cats === true ? (
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
          <Grid item xs={12} align="center">
          <Button variant="contained" sx={style.button} onClick={handleButtonClick}>
            Add {dogOverviewState.name} to your favorite animals list
          </Button>
        </Grid>
        <Grid item xs={12} sx={{marginRight: '15px'}}>
          <Card sx={{height:"100%", padding:"10px"}}>
            <Typography variant="h5">{orgName}</Typography>
            <br />
            <Typography variant="body1">
              {dogOverviewState.contact.address.address1}
            </Typography>
            <Typography>
              {dogOverviewState.contact.address.address2}
            </Typography>
            <Typography>
              {dogOverviewState.contact.address.city}{', '}{dogOverviewState.contact.address.state}{' '}{dogOverviewState.contact.address.postcode}
            </Typography>
            <br />
            <Typography variant="body1">
              {dogOverviewState.contact.email !== null ? (<Link href={`mailto:${dogOverviewState.contact.email}`}><EmailIcon />
                {' '}{dogOverviewState.contact.email}
              </Link>) : null}
            </Typography>
            <Typography variant="body1">
              {dogOverviewState.contact.phone !== null ? (<><PhoneIphoneIcon />{' '}{dogOverviewState.contact.phone}</>) : null}
            </Typography>
            <Typography variant="body1">
              {orgWebsite !== null ? (<a href={orgWebsite}> <PublicIcon />{' '}{orgWebsite}</a>) : null}
            </Typography>
          </Card>
        </Grid>
        </Grid>
        <Grid item xs={12} align='center'>
          <Typography variant='h4'>
            {' '}
            View other pets at {dogOverviewState.organization_name}{' '}
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
