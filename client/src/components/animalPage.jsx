import React from 'react';
import AnimalPhotoCarousel from './carousel/animalPhotoCarousel.jsx';
import AnimalOtherPetsCarousel from './carousel/animalOtherPetsCarousel.jsx';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography } from '@mui/material';
  import CheckIcon from '@mui/icons-material/Check';
  import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
  import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
  import EmailIcon from '@mui/icons-material/Email';

const AnimalPage = (props) => {
  const animalInfo = {
    "organization_id": "MA393",
    "age": "Senior",
    "gender": "Male",
    "size": "Medium",
    "coat": "short",
    "attributes": {
      "spayed_neutered": true,
      "house_trained": true,
      "declawed": false,
      "special_needs": false,
      "shots_current": true
    },
    "environment": {
      "children": false,
      "dogs": false,
      "cats": false
    },
    "name": "Tofu",
    "description": "Say hello to Tofu!!! Say hello to Tofu!!!Say hello to Tofu!!! Say hello to Tofu!!! Say hello to Tofu!!! Say hello to Tofu!!! Say hello to Tofu!!! Say hello to Tofu!!! Say hello to Tofu!!! Say hello to Tofu!!! Say hello to Tofu!!! Say hello to Tofu!!! Say hello to Tofu!!! Say hello to Tofu!!!",
    "photos": [{
      "small": 'https://www.translationvalley.com/wp-content/uploads/2020/03/no-iamge-placeholder.jpg',
      "medium": 'https://www.translationvalley.com/wp-content/uploads/2020/03/no-iamge-placeholder.jpg',
      "large": 'https://www.translationvalley.com/wp-content/uploads/2020/03/no-iamge-placeholder.jpg',
      "full": 'https://www.translationvalley.com/wp-content/uploads/2020/03/no-iamge-placeholder.jpg'
    },{
      "small": 'https://www.translationvalley.com/wp-content/uploads/2020/03/no-iamge-placeholder.jpg',
      "medium": 'https://www.translationvalley.com/wp-content/uploads/2020/03/no-iamge-placeholder.jpg',
      "large": 'https://www.translationvalley.com/wp-content/uploads/2020/03/no-iamge-placeholder.jpg',
      "full": 'https://www.translationvalley.com/wp-content/uploads/2020/03/no-iamge-placeholder.jpg'
    },{
      "small": 'https://www.translationvalley.com/wp-content/uploads/2020/03/no-iamge-placeholder.jpg',
      "medium": 'https://www.translationvalley.com/wp-content/uploads/2020/03/no-iamge-placeholder.jpg',
      "large": 'https://www.translationvalley.com/wp-content/uploads/2020/03/no-iamge-placeholder.jpg',
      "full": 'https://www.translationvalley.com/wp-content/uploads/2020/03/no-iamge-placeholder.jpg'
    }],
    "contact": {
      "email": "brian@gmail.com",
      "phone": "555-555-5555",
      "address": {
        "address1": "ADDRESS 1",
        "address2": null,
        "city": "Austin",
        "state": "TX",
        "postcode": "78754"
      }
    }
  }

  return (
    <Box>
      <Grid container spacing={3}>
        <Grid item xs={12} align="center" marginTop="4px">
          <Typography variant="h2"> {animalInfo.name}</Typography>
        </Grid>
        <Grid item xs={12}>
          <AnimalPhotoCarousel photos={animalInfo.photos} numItems={3} />
        </Grid>
        <Grid container item xs={8} spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1">
              {animalInfo.description}
            </Typography>
          </Grid>
          <Grid item xs={6}>
          <Typography variant="body2" component="ul" >
            <li>
              Age: {animalInfo.age}{' '}
            </li>
            <li>
              Gender: {animalInfo.gender}{' '}
            </li>
          </Typography>
          </Grid>
          <Grid item xs={6}>
          <Typography variant="body2" component="ul" >
            <li>
              Size: {animalInfo.size}{' '}
            </li>
            <li>
              Coat: {animalInfo.coat !== null ? animalInfo.coat : 'not available'}{' '}
            </li>
          </Typography>
          </Grid>
          <Grid item xs={6}>
          <Typography variant="body2" component="ul" >
              <li>
             {(animalInfo.attributes.spayed_neutered === true) ? (<CheckIcon />) : (<DoNotDisturbIcon />)}{' '}Spayed/Neutered
             </li>
              <li>
             {(animalInfo.attributes.house_trained === true) ? (<CheckIcon />) : (<DoNotDisturbIcon />)}{' '}House Trained
             </li>
              <li>
             {animalInfo.attributes.declawed === true ? (<CheckIcon />) : (<DoNotDisturbIcon />)}{' '}Declawed
             </li>
              <li>
             {animalInfo.attributes.special_needs === true ? (<CheckIcon />) : (<DoNotDisturbIcon />)}{' '}Special Needs
             </li>
              <li>
             {animalInfo.attributes.shots_current === true ? (<CheckIcon />) : (<DoNotDisturbIcon />)}{' '}Shots Current
             </li>
           </Typography>
          </Grid>
          <Grid item xs={6}>
           <Typography variant="body2" component="ul" >
           Good with:
              <li>
             {animalInfo.environment.children === true ? (<CheckIcon />) : (<DoNotDisturbIcon />)}{' '}Children
             </li>
              <li>
             {animalInfo.environment.dogs === true ? (<CheckIcon />) : (<DoNotDisturbIcon />)}{' '}Dogs
             </li>
              <li>
             {animalInfo.environment.cats === true ? (<CheckIcon />) : (<DoNotDisturbIcon />)}{' '}Cats
             </li>
             </Typography>
          </Grid>
        </Grid>
        <Grid item container xs={4} spacing={1}>
          <Card sx={{height:"100%"}}>
            <Typography variant="h4">Organization Name???</Typography>
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
        <Grid item xs={12} align="center">
          <Typography variant="h2"> OTHER PETS FROM "LOCATION" </Typography>
        </Grid>
        <Grid item xs={12}>
          <AnimalOtherPetsCarousel orgId={animalInfo.organization_id} numItems={4} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default AnimalPage;