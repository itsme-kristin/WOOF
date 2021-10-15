import React from 'react';

import UserMenu from './userMenu.jsx';

import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';

const SideBar = () => {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={2}>
      <h1>Sidebar</h1>
      {/* <UserMenu /> */}
      </Grid>
    </Box>
  )
}

export default SideBar;