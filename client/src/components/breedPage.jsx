import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography } from '@mui/material';
  import OrganizationCard from './card/organizationCard.jsx';
  import EmptyStar from '@mui/icons-material/StarBorder';
  import FullStar from '@mui/icons-material/Star';
  import PetMap from './petmap/petMap.jsx';
  import { useAuth } from '../contexts/AuthContext.jsx';

const BreedPage = (props) => {
  //const { breedInfo } = props;

  // the breed info object
  const breedInfo =
  [
    [
        {
            "height": {
                "imperial": "9 - 11.5",
                "metric": "23 - 29"
            },
            "image": {
                "height": 1199,
                "id": "BJa4kxc4X",
                "url": "https://cdn2.thedogapi.com/images/BJa4kxc4X.jpg",
                "width": 1600
            },
            "weight": "small",
            "_id": "6169acbe99bd0491f8a6c7a4",
            "bred_for": "Small rodent hunting, lapdog",
            "breed_group": "Toy",
            "country_code": "",
            "id": 1,
            "life_span": "10 - 12 years",
            "name": "Affenpinscher",
            "origin": "Germany, France",
            "reference_image_id": "BJa4kxc4X",
            "temperament": "Stubborn, Curious, Playful, Adventurous, Active, Fun-loving",
            "__v": 0
        }
    ],
    [
        {
            "_id": "616af8ffac0f80f68ad2c499",
            "breedName": "affenpinscher",
            "description": "Canines in the Affenpinscher dog breed were originally created to be ratters in homes, stables, and shops. Bred down in size, they moved up in the world, becoming ladies’ companions. Today, they are happy, mischievous companion dogs.",
            "__v": 0
        }
    ]
]

  const temperament = breedInfo[0][0].temperament.split(', ');
  const { currentUser, signout, userData } = useAuth();
  const [userDataState, setUserDataState] = userData;
  const [ activeIcon, setActiveIcon ] = useState(false);
  const [ organizations, setOrganizations ] = useState([]);

  useEffect(()=> {
    axios.get('/adopt', { params: { "breed": breedInfo[0][0].name , "limit": 3 }})
    .then((response) => {
      setOrganizations(response.data);
    })
    .catch((err)=> {
      console.log('error in retrieving organizations');
    })
  },[]);

  const handleClick = (event) => {
    setActiveIcon(!activeIcon);
  }
  const getIcon = () => {
    let icon = <div />
      if (activeIcon) {
        icon = <FullStar sx={{color:'error.light', padding: '4px', backgroundColor: '#ffffff70', borderRadius: '100%', width: '18px', height: '18px'}}/>;
      }  else {
        icon = <EmptyStar sx={{color:'error.light', padding: '4px', backgroundColor: '#ffffff70', borderRadius: '100%', width: '18px', height: '18px'}}/>;
      }
    return ( icon );
  }

  const handleIconClick = (event) => {
    if (activeIcon) {
        setActiveIcon(false);
        axios.put('/deleteBreed', {email: userDataState.email, id: breedInfo[0][0].id})
        .then(response => {
          console.info('Breed deleted');
        })
        .catch(err => {
          console.error(err);
        })
      } else {
        setActiveIcon(true);
        axios.put('/saveBreed', {email: userDataState.email, breedObj: breedInfo[0][0]})
        .then(response => {
          console.info('Breed saved!');
        })
        .catch(err => {
          console.error(err);
        })
      }
  }

  return (
    <Box sx={{marginTop:"10px"}}>
      <Grid container spacing={2}>
        <Grid item xs={4}>
          <Card>
        <CardMedia
          image={breedInfo[0][0].image.url}
          alt="Oliver the dog"
          sx={{
            width: '100%',
            height: '350px',
            backgroundColor: 'linen'
          }}
        >
        <Grid item container justifyContent="flex-end">
          <CardActions
              onClick={handleIconClick}
              sx={{
                padding: '5px',
                zIndex:1
              }}
            >
              { getIcon() }
            </CardActions>
            </Grid>
        </CardMedia>
          </Card>
        </Grid>
        <Grid item container xs={5}>
          <Grid item xs={12}>
            <Typography variant="h3">{breedInfo[0][0].name}</Typography>
            <Typography variant="h5">Breed origin: {breedInfo[0][0].origin}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"> {breedInfo[1][0].description} </Typography>
          </Grid>
          <Grid item xs={6}>
          <Typography variant="body2" component="ul" >
            <li>
              Height: {breedInfo[0][0].height.imperial}{' '}lbs
            </li>
            <li>
              Weight: {breedInfo[0][0].weight}{' '}
            </li>
            <li>
              Life Span: {breedInfo[0][0].life_span}{' '}
            </li>
          </Typography>
          </Grid>
          <Grid item xs={6}>
          <Typography variant="body2" component="ul" >
            <li>
              Breed Group: {breedInfo[0][0].breed_group}{' '}
            </li>
            <li>
              Bred For: {breedInfo[0][0].bred_for}{' '}
            </li>
          </Typography>
          </Grid>
        </Grid>
        <Grid item xs={3}>
          <Card sx={{height:"100%", backgroundColor:'#C6AC8F'}}>
            <Typography variant="h5"> Breed Temperament </Typography>
            <Typography variant="body2" component="ul" >
                {temperament.map((elem, i) => {
                  return (<li key={i}>{elem}</li>)
                })}
            </Typography>
          </Card>
        </Grid>
        <Grid item container spacing={1} xs={8} sx={{height:"100%"}}>
          {/* map over the organizations array and populate this section with organizationCards */}
          {organizations.map((elem, i) => {
            return (
              <Grid item key={i}>
                <OrganizationCard organization={elem} />
              </Grid>
            )
          })}
        </Grid>
        <Grid height="315" width="315" item xs={4} sx={{height:"100%"}}>
        <Box
          id="googleMap"
          sx={{
            width: 315,
            height: 315,
            backgroundColor: 'white',
            '&:hover': {
              backgroundColor: 'primary.main',
              opacity: [0.9, 0.8, 0.7],
            },
          }}
        >
          <PetMap />
        </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
export default BreedPage;