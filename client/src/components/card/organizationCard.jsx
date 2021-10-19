import React, { useState, useEffect } from 'react';
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
  //const { organization } = props;

  const organization = {
    phone: "555-555-5555",
    email: "dogghouse@gmail.com",
    address: "123 Sesame Street, Austin, TX 78754",
    name: "Elmo's House"
  }

  return (
    <Box>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h3"> {organziation.name} </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1">
            {organization.address}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1"> {(<EmailIcon />)}{' '}{organization.email} </Typography>
          <Typography variant="body1"> {(<PhoneIphoneIcon />)}{' '}{organization.phone}</Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default OrganizationCard;
