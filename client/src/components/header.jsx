import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

import {
  Button,
  Typography,
  Grid,
} from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import PersonIcon from '@mui/icons-material/Person';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import SearchIcon from '@mui/icons-material/Search';

const logo = {
  fontSize: '55px',
  color: 'white',
  transform: 'rotate(-30deg)',
  borderRadius: '50px',
  margin: '5px 0 0 5px',
  padding: '5px',
  border: '5px solid white',
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
        <Grid container spacing={1} alignItems="center" className="header">
          <Grid item xs={1}>
            <Link to ='/'>
              <PetsIcon sx={logo}/>
            </Link>
          </Grid>
          <Grid item xs={7} alignSelf="flex-end">
            <Link to ='/'>
              <Typography class="title">
                Woof
              </Typography>
            </Link>
          </Grid>
          <Grid item xs={4} className="nav">
            <Link to ='/search'>
              <Button
              variant="text"
              color='inherit'
              startIcon={<SearchIcon sx={icon}/>}>
                Search
              </Button>
            </Link>
              <Button
              variant="text"
              color='inherit'
              startIcon={<RoomServiceIcon sx={icon}/>}>
                Services
              </Button>
            <Link to ='/research'>
              <Button
              variant="text"
              color='inherit'
              startIcon={<PetsIcon sx={icon}/>}>
                Breeds
              </Button>
            </Link>
            <Link to='/user'>
              <Button
              variant="text"
              color='inherit'
              startIcon={<PersonIcon sx={icon}/>}>
                {/* Conditional Value */}
                Login
              </Button>
              </Link>
          </Grid>
        </Grid>
    </nav>
  )
}
//check out material ui's avatar component mixed with the menu component

export default Header;