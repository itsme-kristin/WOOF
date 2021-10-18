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
  const { organization } = props;
  const [orgInfo, setOrgInfo] = useState([]);

  const getOrgInfo = () => {
    // GET request to server for org info;
  }

  useEffect(() => {
    getOrgInfo
  }, [orgInfo])

  return (
    <Box sx={{backgroundColor:'pink'}}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h2"> Organization Title </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1"> Address Info</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1"> Contact - EMAIL </Typography>
          <Typography variant="body1"> Contact - Phone Number </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default OrganizationCard;
