import React from 'react';
import AnimalPhotoCarousel from './carousel/animalPhotoCarousel.jsx';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography } from '@mui/material';


const AnimalPage = () => {
  const dummyPhotos = ["https://www.translationvalley.com/wp-content/uploads/2020/03/no-iamge-placeholder.jpg","https://www.translationvalley.com/wp-content/uploads/2020/03/no-iamge-placeholder.jpg","https://www.translationvalley.com/wp-content/uploads/2020/03/no-iamge-placeholder.jpg", "https://www.translationvalley.com/wp-content/uploads/2020/03/no-iamge-placeholder.jpg","https://www.translationvalley.com/wp-content/uploads/2020/03/no-iamge-placeholder.jpg","https://www.translationvalley.com/wp-content/uploads/2020/03/no-iamge-placeholder.jpg" ];
  return (
<Box sx={{width: 1100, backgroundColor: 'primary.dark'}}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Typography variant="h2"> ANIMAL NAME HERE</Typography>
        </Grid>
        <Grid item xs={12}>
          <AnimalPhotoCarousel photos={dummyPhotos} numItems={1} />
        </Grid>
        <Grid item xs={6}>
         <Card sx={{height:"100%"}}>
           <Typography variant="body1">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur sit amet turpis hendrerit, bibendum quam et, accumsan sapien. Nullam neque diam, faucibus at consequat et, condimentum a neque. Nulla convallis et erat sed aliquam. Integer laoreet gravida metus, isn’t he just adorable?

Bred For: Guarding
Breed Group: Mixed
Height: 18-24 inches
Weight: 55 - 90 lbs
Life Span: 12-13 years</Typography>
         </Card>
        </Grid>
        <Grid item xs={6}>
          <Card sx={{height:"100%"}}>
            <Typography variant="h3">Organization Name</Typography>
            <Typography variant="body1">
              Organization Address and Organization Contact Info
            </Typography>
          </Card>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h2"> OTHER PETS FROM "LOCATION" </Typography>
        </Grid>
        <Grid item xs={12}>
          <AnimalPhotoCarousel photos={dummyPhotos} numItems={4} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default AnimalPage;