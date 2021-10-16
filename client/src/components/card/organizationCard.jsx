import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography } from '@mui/material';

const OrganizationCard = (props) => {


  return (
    <Box sx={{backgroundColor:'pink'}}>
      <Grid container>
        <Grid item xs={12}>
          <div> the title </div>
        </Grid>
        <Grid item xs={6}>
          <div> the address </div>
        </Grid>
        <Grid item xs={6}>
          <div> the contact info </div>
        </Grid>
      </Grid>
    </Box>
  );
}

export default OrganizationCard;
