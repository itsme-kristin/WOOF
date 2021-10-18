import React from 'react';

import {
  Grid,
  Typography,
} from '@mui/material';


const Footer = () => {
  return (
    < >
      <Grid container alignItems="center" className="footer">
        <Grid item xs={12}>
          <Typography align="center">
            <a href="https://github.com/hratx-blue-ocean/WOOF" target="_blank" rel="noreferrer">
              Team Dogg House
            </a>
          </Typography>
        </Grid>
      </Grid>
    </>
  )
}
//check out material ui's avatar component mixed with the menu component

export default Footer;