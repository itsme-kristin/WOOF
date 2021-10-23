import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography
} from '@mui/material';
import OrganizationCard from './card/organizationCard.jsx';
import EmptyStar from '@mui/icons-material/StarBorder';
import FullStar from '@mui/icons-material/Star';
import PetMap from './petmap/petMap.jsx';
import { useAuth } from '../contexts/AuthContext.jsx';

const BreedPage = props => {
  const { currentUser, signout, userData, breedOverview } = useAuth();
  const [userDataState, setUserDataState] = userData;
  const [breedOverviewState, setbreedOverviewState] = breedOverview;
  const [activeIcon, setActiveIcon] = useState(false);
  const [organizations, setOrganizations] = useState([]);
  const [description, setDescription] = useState([]);

  useEffect(() => {
    if (userDataState.email !== '') {
      for (let i = 0; i < userDataState.savedBreeds.length; i++) {
        if (userDataState.savedBreeds[i].id === breedOverviewState.id) {
          setActiveIcon(true);
          break;
        }
      }
    }
  }, [userDataState]);

  useEffect(() => {
    axios
      .get(`/breed-name?name=${breedOverviewState.name}`)
      .then(response => {
        setDescription(response.data[1][0].description);
      })
      .catch(err => {
        console.log('error in retrieving breed description');
      });
  }, []);

  useEffect(() => {
    axios
      .get('/adopt', { params: { breed: breedOverviewState.name, limit: 3 } })
      .then(response => {
        setOrganizations(response.data);
      })
      .catch(err => {
        console.log('error in retrieving organizations');
      });
  }, []);

  const temperament = (breedOverviewState?.temperament ? breedOverviewState.temperament.split(', ') : ['']);

  const getIcon = () => {
    let icon = <div />;
    if (activeIcon) {
      icon = (
        <FullStar
          sx={{
            color: 'error.light',
            padding: '4px',
            backgroundColor: '#ffffff70',
            borderRadius: '100%',
            width: '18px',
            height: '18px'
          }}
        />
      );
    } else {
      icon = (
        <EmptyStar
          sx={{
            color: 'error.light',
            padding: '4px',
            backgroundColor: '#ffffff70',
            borderRadius: '100%',
            width: '18px',
            height: '18px'
          }}
        />
      );
    }
    return icon;
  };

  const handleIconClick = event => {
    if (activeIcon) {
      setActiveIcon(false);
      axios
        .put('/deleteBreed', {
          email: userDataState.email,
          id: breedOverviewState.id
        })
        .then(response => {
          console.info('Breed deleted');
          const oldState = userDataState;
          for (let i = 0; i < oldState.savedBreeds.length; i++) {
            let currentBreed = oldState.savedBreeds[i];
            if (currentBreed.id === breedOverviewState.id) {
              oldState.savedBreeds.splice(i, 1);
              break;
            }
          }
          setUserDataState(oldState);
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      setActiveIcon(true);
      axios
        .put('/saveBreed', {
          email: userDataState.email,
          breedObj: breedOverviewState
        })
        .then(response => {
          console.info('Breed saved!');
          const oldState = userDataState;
          oldState.savedBreeds.unshift(breedOverviewState);
          setUserDataState(oldState);
        })
        .catch(err => {
          console.error(err);
        });
    }
  };

  return (
    <Box>
      <Grid container spacing={3} sx={{marginTop:'4px'}}>
        <Grid item xs={4} sx={{ marginLeft: '15px'}}>
          <Card>
            <CardMedia
              image={(breedOverviewState.image?.url ? breedOverviewState.image.url : undefined)}
              alt='Oliver the dog'
              sx={{
                width: '100%',
                height: '350px',
                backgroundColor: 'linen'
              }}
            >
              <Grid item container justifyContent='flex-end'>
                <CardActions
                  onClick={handleIconClick}
                  sx={{
                    padding: '5px',
                    zIndex: 1
                  }}
                >
                  {getIcon()}
                </CardActions>
              </Grid>
            </CardMedia>
          </Card>
        </Grid>
        <Grid item container xs={7}>
          <Grid item xs={12}>
            <Typography variant='h3'>{breedOverviewState.name}</Typography>
            <Typography variant='h5'>
              Breed origin: {breedOverviewState?.origin ? breedOverviewState.origin : 'N/A' }
            </Typography>
            <Typography variant='body1'>
              Description: {(description.length !== 0) ? description : 'N/A'}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body2' component='ul'>
              <li>Height: {breedOverviewState.height.imperial} lbs</li>
              <li>Weight: {breedOverviewState.weight} </li>
              <li>Life Span: {breedOverviewState.life_span} </li>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant='body2' component='ul'>
              <li>Breed Group: {breedOverviewState.breed_group} </li>
              <li>Bred For: {breedOverviewState.bred_for} </li>
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={4} sx={{marginLeft: ' 15px'}}>
          <Card sx={{ height: '100%', backgroundColor: '#C6AC8F', padding:'5px'}}>
            <Typography variant='h5' sx={{alignItems:'center'}}> Breed Temperament </Typography>
            <Typography variant='body1' component='ul' sx={{marginTop:'10px'}}>
              {temperament.map((elem, i) => {
                return <li key={i}>{elem}</li>;
              })}
            </Typography>
          </Card>
        </Grid>
        <Grid item container spacing={1} xs={7} sx={{ height: '100%' }}>
          {organizations.map((elem, i) => {
            return (
              <Grid item key={i}>
                <OrganizationCard organization={elem} />
              </Grid>
            );
          })}
        </Grid>
        <Grid item xs={12} align='center' sx={{ height: '100%'}}>
          <Box
            id='googleMap'
            sx={{
              width: 500,
              backgroundColor: 'white',
              '&:hover': {
                backgroundColor: 'primary.main',
                opacity: [0.9, 0.8, 0.7]
              }
            }}
          >
            <PetMap />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};
export default BreedPage;
