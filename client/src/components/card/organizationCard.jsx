import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
  Link
} from '@mui/material';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import PublicIcon from '@mui/icons-material/Public';
import { borders } from '@mui/system';


const OrganizationCard = props => {
  const { organization } = props;
  const [orgWebsite, setOrgWebsite] = useState([]);

    useEffect(() => {
    axios
      .get(`/organization?id=${organization.organization_id}`)
      .then(response => {
        setOrgWebsite(response.data[1]);
      })
      .catch(err => {
        console.log('error in retrieving other pets from this organization');
      });
  }, []);

  return (
    <Box sx={{ border: 0.5, borderRadius: 2 }}>
      <Grid container sx={{width:'100%', margin:'5px 10px'}}>
        <Grid item xs={12}>
          <Typography variant='h4'>
            {' '}
            {organization.organization_name}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='body1'>
            {organization.contact.address.address1}
          </Typography>
          <Typography>{organization.contact.address.address2}</Typography>
          <Typography variant='body1'>
            {organization.contact.address.city}
            {', '}
            {organization.contact.address.state}{' '}
            {organization.contact.address.postcode}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant='body1'>
            {organization.contact.email !== null ? (
              <Link
                href={`mailto:${organization.contact.email}`}
                target='_blank'
                  >
                    <EmailIcon /> {organization.contact.email}
                  </Link>
                ) : null}
          </Typography>
          <Typography variant='body1'>
            {organization.contact?.phone ? ((organization.contact.phone.length > 2) ?
              <>
                <PhoneIphoneIcon /> {organization.contact.phone}
              </>
              : null) : null}
          </Typography>
          <Typography variant='body1'>
            {orgWebsite !== null ? (
                  <a href={orgWebsite}>
                    {' '}
                    <PublicIcon /> {orgWebsite}
                  </a>
                ) : null}
              </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default OrganizationCard;
