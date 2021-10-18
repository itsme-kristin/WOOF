import React from 'react';
import DogCard from './card/dogCard.jsx';

import {
  Button,
  Grid,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const searchBar = () => {

  const homeSearch = {
    border: '1 dotted grey',
    marginTop: '40px',
  }

  return (
    <Grid container justifyContent="center" spacing={1} sx={homeSearch}>
      <Grid item xs={3}>
        <TextField label="Enter your Zip Code" variant="outlined" fullWidth/>
      </Grid>
      <Grid item xs={2}>
        <Button variant="contained" size="large" endIcon={<SearchIcon />} sx={{ height: "56px"}}>
          Find a Dog
        </Button>
      </Grid>
    </Grid>
  );
}

const HomePage = () => {
  return (
    < >
      <Grid container direction="column" spacing={3}>
        <Grid item xs={12}>
          {searchBar()}
        </Grid>
        <Grid item xs={12}>
          <Typography  align="center" variant="h4">
            Top five dogs for adoption nearby
          </Typography>
        </Grid>
        <Grid item xs={12}>
            {listTop5()}
        </Grid>
        <Grid item xs={12}>
          Overlay
        </Grid>
      </Grid>
    </>
  )
}

export default HomePage;