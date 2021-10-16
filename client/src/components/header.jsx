import React from 'react';

import {
  Box,
  Typography,
  Grid,
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';

const logo = {
  fontSize: '55px',
  color: 'white',
  transform: 'rotate(-30deg)',
  paddingLeft: '2px',
}

const Header = () => {
  return (
    <nav>
        <Grid container spacing={1} alignItems="center" className="header">
          <Grid item xs={1} class="logo">
            <PetsIcon sx={logo}/>
          </Grid>
          <Grid item xs={6} alignSelf="flex-end">
            <Typography class="title">
              Woof
            </Typography>
          </Grid>
          <Grid item xs={4} className="nav">
            <ul>
              <li>Services</li>
              <li>Breeds</li>
              {/* Conditional Rendering */}
              <li>Login</li>
            </ul>
          </Grid>
        </Grid>
    </nav>
  )
}


export default Header;