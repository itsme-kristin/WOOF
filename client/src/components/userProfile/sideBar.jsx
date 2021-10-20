import React from 'react';

import UserMenu from './userMenu.jsx';

import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import { useAuth } from '../../contexts/AuthContext.jsx';


const SideBar = () => {

  const { userData, currentUser } = useAuth();
  const [userDataState, setUserDataState] = userData;
  return (
    <Grid container spacing={2} direction='column'>
      <Grid item id='userInfo' sm={2}>
        <Typography variant='h3'>Name: {userDataState.name}</Typography>
        <Typography>Email: {userDataState.email}</Typography>
        <Typography>{console.log(userDataState)}</Typography>
        {/* <Typography>{currentUser.email}</Typography> */}
        <UserMenu />
      </Grid>
    </Grid>
  )
}

export default SideBar;