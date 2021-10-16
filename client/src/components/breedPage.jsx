import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Grid,
  Typography } from '@mui/material';
import OrganizationCard from './card/organizationCard.jsx';

const BreedPage = (props) => {
  const { breed } = props;

  // the breed info object
  const [breedInfo, setBreedInfo] = useState([]);

  const getBreedInfo = (breed) => {
    //make a GET request to server to grab name, image, organizations, temperament, etc.
  }

  useEffect(() => {
    getBreedInfo
  }, [breed])

  return (
    <Box sx={{width: 1100, backgroundColor: 'primary.dark'}}>
      <Grid container spacing={3}>
        <Grid item xs={4}>
          <img height="315" width="315" src="https://www.translationvalley.com/wp-content/uploads/2020/03/no-iamge-placeholder.jpg"></img>
        </Grid>
        <Grid item xs={6}>
         <Card sx={{height:"100%"}}>
           <Typography variant="h2">Labrador</Typography>
           <Typography variant="body1">a cute fun loving dog that will make for a great family dog</Typography>
         </Card>
        </Grid>
        <Grid item xs={2}>
          <Card sx={{height:"100%"}}>
            <CardContent>
              A list of temperament traits
              <ul>
                <li>fun</li>
                <li>adorable</li>
                <li>playful</li>
              </ul>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={8} sx={{height:"100%"}}>
          {/* map over the organizations array and populate this section with organizationCards */}
          <OrganizationCard />
          <OrganizationCard />
          <OrganizationCard />
        </Grid>
        <Grid height="315" width="315" item xs={4} sx={{height:"100%"}}>
          {/* Google Maps API integration, maps placeholder for now */}
          <img src="https://tinyimg.io/i/rir4bHt.png"></img>
        </Grid>
      </Grid>
    </Box>

  );

}
export default BreedPage;



