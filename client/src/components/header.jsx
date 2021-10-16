import React from 'react';
import { Link } from 'react-router-dom';

import {
  Button,
  Typography,
  Grid,
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import PersonIcon from '@mui/icons-material/Person';
import RoomServiceIcon from '@mui/icons-material/RoomService';

const logo = {
  fontSize: '55px',
  color: 'white',
  transform: 'rotate(-30deg)',
  paddingLeft: '2px',
};

const icon = {
  fontSize: '12px',
  color: '#22333B',
  backgroundColor: '#EAE0D5',
  borderRadius: '10px',
  padding: '2px',
};

const Header = () => {
  return (
    <nav>
<<<<<<< HEAD
      <h1>Logo</h1>
      <ul>
        <Link to='/'>
          <li>Home</li>
        </Link>
        <Link to='/research'>
          <li>Research Breeds</li>
        </Link>
        <Link to='/search'>
          <li>Search for pets</li>
        </Link>
        <Link to='/user'>
          <li>My Profile</li>
        </Link>
      </ul>
=======
        <Grid container spacing={1} alignItems="center" className="header">
          <Grid item xs={1} class="logo">
            <PetsIcon sx={logo}/>
          </Grid>
          <Grid item xs={8} alignSelf="flex-end">
            <Typography class="title">
              Woof
            </Typography>
          </Grid>
          <Grid item xs={3} className="nav">
            <Button
            variant="text"
            color='inherit'
            startIcon={<RoomServiceIcon sx={icon}/>}>
              Services
            </Button>
            <Button
            variant="text"
            color='inherit'
            startIcon={<PetsIcon sx={icon}/>}>
              Breeds
            </Button>
            <Button
              variant="text"
              color='inherit'
              startIcon={<PersonIcon sx={icon}/>}>
                {/* Conditional Value */}
                Login
              </Button>
          </Grid>
        </Grid>
>>>>>>> main
    </nav>
  )
}
//check out material ui's avatar component mixed with the menu component

export default Header;