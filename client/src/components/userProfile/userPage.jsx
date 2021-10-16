import React, {useState} from 'react';
import FavoriteDogs from './favoriteDogs.jsx';
import FavoriteBreeds from './favoriteBreeds.jsx';
import SideBar from './sideBar.jsx';

import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const UserPage = () => {
  return (
    <Container className='innerContainer'>
      <Grid container spacing={2}>
        <Grid item>
          <SideBar />
        </Grid>
        <Grid container>
          <Grid item>
            <FavoriteBreeds />
          </Grid>
          <Grid item>
            <FavoriteDogs />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}


export default UserPage;