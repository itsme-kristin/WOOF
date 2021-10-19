import React from 'react';

import UserMenu from './userMenu.jsx';

import Typography from '@mui/material/Typography'
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const SideBar = () => {

  return (
    <Grid container spacing={2} direction='column'>
      <Grid item id='userInfo' sm={2}>
        <Typography variant='h3'>SideBar</Typography>
        <Typography>contact info</Typography>
        <Typography>address</Typography>
        {/* <Typography>{currentUser.email}</Typography> */}
        <UserMenu />
      </Grid>
    </Grid>
  )
}

export default SideBar;