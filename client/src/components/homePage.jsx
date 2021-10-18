import React from 'react';
import { Link } from 'react-router-dom';
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
    marginTop: '20px',
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
  const image = 'https://i0.wp.com/images.ctfassets.net/440y9b545yd9/4xeV5wnpElbhV0aG2wTiQy/c8d921df3e81977dcdc5a03706502bc4/dog_pack_top10_850__1_.jpg';

  const style = {
    overlay: {
    width: "95%",
    maxWidth: '850px',
    height: "320px",
    borderRadius: '10px',
    backgroundImage: `linear-gradient(rgba(193,193,193,1),rgba(193,193,193,1)), url(${image})`,
    backgroundBlendMode: 'screen',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    marginTop: '10px',
    marginBottom: '20px',
  },

  title: {
    fontWeight: 'bold',
  },

  button: {
    width: '300px',
  },

  }

  return (
    <Grid container justifyContent="center">
      <Grid container direction="column" justifyContent="center" alignItems="center" sx={style.overlay} spacing={5}>
        <Grid item>
          <Typography variant="h6" sx={style.title}>
            Don't know what you want yet? Research breeds here!
          </Typography>
        </Grid>
        <Grid item >
          <Link to='/research'>
            <Button variant="contained" size="large" sx={style.button}>
              Get Started
            </Button>
          </Link>
        </Grid>
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
        <Grid item xs={12} >
          {researchBreeds()}
        </Grid>
      </Grid>
    </>
  )
}

export default HomePage;