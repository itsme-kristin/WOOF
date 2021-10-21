import React, {useState} from 'react';
import FavoriteDogs from './favoriteDogs.jsx';
import FavoriteBreeds from './favoriteBreeds.jsx';
import SideBar from './sideBar.jsx';

import { useAuth } from '../../contexts/AuthContext.jsx';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const style = {
  root: {
    height: '100%',
    margin: 0,
    padding: 0,
  },

  sideBar: {
    height: '100%',
    width: '300px',
    backgroundColor: '#C6AC8F',
    padding: '20px 10px',
  },

  content: {
    width: '100%',
    padding: '20px 10px',
  }
};


const UserPage = () => {

  //context for the current user
  //
  //
  //saved dogs is an array (sorted newest to oldest)
  const { currentUser, userData } = useAuth();
  const [userDataState, setUserDataState] = userData;
  //    sidebar:
  //settings => edit button => turns typography into textfields => button turns into save button => updates userData in DB (http put) sidenote: initial values are prepopulated =>
  //successful update => button back to 'edit' / textfields => typography
  return (
    < >
      <Grid container sx={style.root}>
        <Grid item xs='auto'>
          <Grid container justifyContent="center" sx={style.sideBar}>
            <SideBar />
          </Grid>
        </Grid>
        <Grid item xs={8}>
          <Grid container justifyContent="center" sx={style.content}>
            <Grid item xs={12}>
              <Typography variant="h5" align="center" sx={{ width: '100%' }}>
                User Profile
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <FavoriteBreeds />
            </Grid>
            <Grid item xs={12}>
              <FavoriteDogs />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}


export default UserPage;