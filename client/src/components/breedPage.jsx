import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography } from '@mui/material';
  import OrganizationCard from './card/organizationCard.jsx';

const BreedPage = (props) => {
  //const { breed } = props;

  // the breed info object
  const breedInfo = {
    "height": {
        "imperial": "9 - 11.5",
        "metric": "23 - 29"
    },
    "image": {
        "height": 1199,
        "id": "BJa4kxc4X",
        "url": "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
        "width": 1600
    },
    "weight": "small",
    "_id": "6169acbe99bd0491f8a6c7a4",
    "bred_for": "Small rodent hunting, lapdog",
    "breed_group": "Toy",
    "country_code": "",
    "id": 1,
    "life_span": "10 - 12 years",
    "name": "Affenpinscher",
    "origin": "Germany, France",
    "reference_image_id": "BJa4kxc4X",
    "temperament": "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
    "__v": 0
  };

  const temperament = breedInfo.temperament.split(', ');

  return (
    <Box sx={{marginTop:"10px"}}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <img height="315" width="315" src={breedInfo.image.url}></img>
        </Grid>
        <Grid item container xs={5}>
          <Grid item xs={12}>
            <Typography variant="h3">{breedInfo.name}</Typography>
            <Typography variant="h5">Breed origin: {breedInfo.origin}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"> there is no description in Dog API? there is no description in Dog API? there is no description in Dog API? there is no description in Dog API? </Typography>
          </Grid>
          <Grid item xs={6}>
          <Typography variant="body2" component="ul" >
            <li>
              Height: {breedInfo.height.imperial}{' '}lbs
            </li>
            <li>
              Weight: {breedInfo.weight}{' '}
            </li>
            <li>
              Life Span: {breedInfo.life_span}{' '}
            </li>
          </Typography>
          </Grid>
          <Grid item xs={6}>
          <Typography variant="body2" component="ul" >
            <li>
              Breed Group: {breedInfo.breed_group}{' '}
            </li>
            <li>
              Bred For: {breedInfo.bred_for}{' '}
            </li>
          </Typography>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{height:"100%", backgroundColor:'#C6AC8F'}}>
            <Typography variant="h5"> Breed Temperament </Typography>
            <Typography variant="body2" component="ul" >
                {temperament.map((elem, i) => {
                  return (<li key={i}>{elem}</li>)
                })}
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={8} sx={{height:"100%"}}>
          {/* map over the organizations array and populate this section with organizationCards */}
          <OrganizationCard />
          <OrganizationCard />
          <OrganizationCard />
        </Grid>
        <Grid height="315" width="315" item xs={4} sx={{height:"100%"}}>
          {/* Google Maps API integration, maps placeholder for now */}
          <img src="https://tinyimg.io/i/rir4bHt.png"></img>
        </Grid>
      </Grid>
    </Box>
  );
}
export default BreedPage;