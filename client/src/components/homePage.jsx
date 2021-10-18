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

  const dogButton = {
    height: "56px",
    width: "164px",
  }

  return (
    <Grid container justifyContent="center" spacing={1} sx={homeSearch}>
      <Grid item xs={3}>
        <TextField label="Enter your Zip Code" variant="outlined" fullWidth/>
      </Grid>
      <Grid item xs={2}>
        <Button variant="contained" size="large" endIcon={<SearchIcon />} sx={dogButton}>
          Find a Dog
        </Button>
      </Grid>
    </Grid>
  );
}

const listTop5 = () => {
  // axios call to pull top 5 in location and then list from data
  const fakelist = [];
  for (var i = 0; i < 5; i++) {
    fakelist.push(
      <Grid item key={i}>
        <DogCard />
      </Grid>
    );
  }
  return (
    <Grid container justifyContent="center" spacing={3}>
      {fakelist}
    </Grid>
  );
}

const researchBreeds = () => {
  const image='https://i0.wp.com/images.ctfassets.net/440y9b545yd9/4xeV5wnpElbhV0aG2wTiQy/c8d921df3e81977dcdc5a03706502bc4/dog_pack_top10_850__1_.jpg'


  const overlay = {
    width: "95%",
    height: "320px",
    borderRadius: '10px',
    backgroundImage: `url(${image}), linear-gradient(rgba(196,196,196,0.7),rgba(196,196,196,196.7))`,
    backgroundBlendMode: 'overlay',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    marginBottom: '20px',
  }

  return (
    <Grid container justifyContent="center">
      <Grid item sx={overlay}>
        Research Breeds
      </Grid>
    </Grid>
  )
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
          {researchBreeds()}
        </Grid>
      </Grid>
    </>
  )
}

export default HomePage;