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
  import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import { borders } from '@mui/system';

const OrganizationCard = (props) => {
  //const { organization } = props;

  const organization = {
    "contact": {
            "email": "adopt@austinpetsalive.org",
            "phone": 555-555-5555,
            "address": {
                "address1": "1156 West Cesar Chavez",
                "address2": null,
                "city": "Austin",
                "state": "TX",
                "postcode": "78704",
                "country": "US"
            }
        },
        "organization_name": "Austin Pets Alive!"
    }

  return (
    <Box sx={{border:0.5, borderRadius: 2, padding:"5px 15px"}}>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="h4"> {organization.organization_name}</Typography>
        </Grid>
        <Grid item xs={6}>
                    <Typography variant="body1">
              {organization.contact.address.address1}
            </Typography>
            <Typography>
              {organization.contact.address.address2}
            </Typography>
          <Typography variant="body1">
                        {organization.contact.address.city}{', '}{organization.contact.address.state}{' '}{organization.contact.address.postcode}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body1"> {(<EmailIcon />)}{' '}{organization.contact.email} </Typography>
          <Typography variant="body1"> {(<PhoneIphoneIcon />)}{' '}{organization.contact.phone} </Typography>
        </Grid>
      </Grid>
    </Box>
  );
}

export default OrganizationCard;
