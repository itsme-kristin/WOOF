import React, {useState} from 'react';
import FavoriteDogs from './favoriteDogs.jsx';
import FavoriteBreeds from './favoriteBreeds.jsx';
import SideBar from './sideBar.jsx';

import { useAuth } from '../../contexts/AuthContext.jsx';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const UserPage = () => {

  //context for the current user
  //
  //
  //saved dogs is an array (sorted newest to oldest)
  const { currentUser, userData } = useAuth();

  //    sidebar:
  //settings => edit button => turns typography into textfields => button turns into save button => updates userData in DB (http put) sidenote: initial values are prepopulated =>
  //successful update => button back to 'edit' / textfields => typography
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