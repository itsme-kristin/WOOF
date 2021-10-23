import React from 'react';
import Carousel from 'react-grid-carousel';

import { Grid, Paper } from '@mui/material';

const AnimalPhotoCarousel = (props) => {
  const { photos, numItems } = props;

  const animalPhotos = () => photos.map((elem, i) => {
    const style = {
      image: {
        width: '350px',
        height: '300px',
        margin: '10px',
        borderRadius: '10px',
        backgroundImage: `url(${elem.large})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      },
    };

    return (
      <Carousel.Item key={i}>
        <Paper sx={style.image} elevation={3}/>
      </Carousel.Item>
    );
  })


  return (
    <Grid container justifyContent="center" alignItems="center">
      <Grid item sx={{ width: '1160px', marginBottom: '10px' }}>
        <Carousel cols={3} rows={1} gap={3} showDots loop>
          {animalPhotos()}
        </Carousel>
      </Grid>
    </Grid>
  )
}

export default AnimalPhotoCarousel;