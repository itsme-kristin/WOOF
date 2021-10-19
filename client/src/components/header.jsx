import React from 'react';
import { Link } from 'react-router-dom';
import '../styles.css';

import { useAuth } from '../contexts/AuthContext.jsx';
import { Button, Typography, Grid } from '@mui/material';
import PetsIcon from '@mui/icons-material/Pets';
import PersonIcon from '@mui/icons-material/Person';
import RoomServiceIcon from '@mui/icons-material/RoomService';
import FavoriteIcon from '@mui/icons-material/Favorite';
import LogoutIcon from '@mui/icons-material/Logout';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddIcon from '@mui/icons-material/PersonAdd';

const logo = {
  fontSize: '55px',
  color: '#EAE0D5',
  transform: 'rotate(-30deg)',
  borderRadius: '50px',
  margin: '5px 5px 0 5px',
  padding: '5px',
  border: '5px solid #EAE0D5'
};

const title = {
  fontFamily: '"Alex Brush", cursive',
  fontSize: '60px'
};

const icon = {
  fontSize: '12px',
  color: '#22333B',
  backgroundColor: '#EAE0D5',
  borderRadius: '10px',
  padding: '2px'
};

const Header = () => {
  const { currentUser, signout } = useAuth();

  //header useEffect (when header checks auth (currentUser))
  //get request to DB for user Data => set User data

  return (
    <>
      <Grid container alignItems='center' className='header'>
        <Grid item xs={3} sx={{ minWidth: '220px' }}>
          <Grid container>
            <Grid item>
              <Link to='/'>
                <PetsIcon sx={logo} />
              </Link>
            </Grid>
            <Grid item>
              <Link to='/'>
                <Typography sx={title}>Woof</Typography>
              </Link>
            </Grid>
          </Grid>
        </Grid>
        <Grid item xs={9}>
          <Grid container justifyContent='flex-end'>
            <Grid item xs={12} sm='auto'>
              <Link to='/search'>
                <Button
                  variant='text'
                  color='inherit'
                  startIcon={<FavoriteIcon sx={icon} />}
                >
                  Adopt
                </Button>
              </Link>
            </Grid>
            {/* <Grid item xs={12} sm='auto'>
                <Button
                variant="text"
                color='inherit'
                startIcon={<RoomServiceIcon sx={icon}/>}>
                  Services
                </Button>
              </Grid> */}
            <Grid item xs={12} sm='auto'>
              <Link to='/research'>
                <Button
                  variant='text'
                  color='inherit'
                  startIcon={<PetsIcon sx={icon} />}
                >
                  Breeds
                </Button>
              </Link>
            </Grid>
            {currentUser ? (
              <>
                <Grid item xs={12} sm='auto'>
                  <Link to='/user'>
                    <Button
                      variant='text'
                      color='inherit'
                      startIcon={<PersonIcon sx={icon} />}
                    >
                      My profile
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs={12} sm='auto'>
                  <Link to='/'>
                    <Button
                      variant='text'
                      color='inherit'
                      startIcon={<LogoutIcon sx={icon} />}
                      onClick={() => signout()}
                    >
                      Logout
                    </Button>
                  </Link>
                </Grid>
              </>
            ) : (
              <>
                <Grid item xs={12} sm='auto'>
                  <Link to='/signup'>
                    <Button
                      variant='text'
                      color='inherit'
                      startIcon={<PersonAddIcon sx={icon} />}
                    >
                      Sign Up
                    </Button>
                  </Link>
                </Grid>
                <Grid item xs={12} sm='auto'>
                  <Link to='/signin'>
                    <Button
                      variant='text'
                      color='inherit'
                      startIcon={<LoginIcon sx={icon} />}
                    >
                      Sign In
                    </Button>
                  </Link>
                </Grid>
              </>
            )}
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};
//check out material ui's avatar component mixed with the menu component

export default Header;
