import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext.jsx';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EmptyHeart from '@mui/icons-material/FavoriteBorder';
import FullHeart from '@mui/icons-material/Favorite';
import EmptyStar from '@mui/icons-material/StarBorder';
import FullStar from '@mui/icons-material/Star';
import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';
import { CardActionArea } from '@mui/material';

const height = { landscape: 200, portrait: 252 };
const width = { landscape: 252, portrait: 200 };

const noimgstyle = {
  width: '100%',
  height: '150px',
  backgroundColor: '#EAE0D5',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center'
};

const DogCard = props => {
  const image = props.image;
  const orientation = props.orientation || 'portrait';
  const text = props.text || '3 Mths | Labrador Retriever | 8 miles';
  const type = props.type || 'none';
  const name = props.name || 'Oliver';
  const dogObj = props.dogObj;
  const breedObj = props.breedObj;
  const { currentUser, signout, userData, dogOverview, breedOverview } =
    useAuth();
  const [userDataState, setUserDataState] = userData;
  const [dogOverviewState, setDogOverviewState] = dogOverview;
  const [breedOverviewState, setBreedOverviewState] = breedOverview;
  const [activeIcon, setActiveIcon] = useState(false);

  useEffect(() => {
    if (userDataState.email !== '') {
      if (orientation === 'portrait') {
        for (let i = 0; i < userDataState.savedDogs.length; i++) {
          if (userDataState.savedDogs[i].id === dogObj.id) {
            setActiveIcon(true);
          }
        }
      } else if (orientation === 'landscape') {
        for (let j = 0; j < userDataState.savedBreeds.length; j++) {
          if (userDataState.savedBreeds[j].id === breedObj.id) {
            setActiveIcon(true);
          }
        }
      }
    }
  }, [userDataState]);

  const handleIconClick = event => {
    if (orientation === 'portrait') {
      // console.log(dogObj)
      if (activeIcon) {
        setActiveIcon(false);
        axios
          .put('/deleteDog', { email: userDataState.email, id: dogObj.id })
          .then(response => {
            console.info('Dog deleted');
            //remove from the userData array
            const oldState = userDataState;
            for (let i = 0; i < oldState.savedDogs.length; i++) {
              let currentDog = oldState.savedDogs[i];
              if (currentDog.id === dogObj.id) {
                oldState.savedDogs.splice(i, 1);
                break;
              }
            }
            console.log(oldState, 'dog');
            setUserDataState(oldState);
          })
          .catch(err => {
            console.error(err);
          });
      } else {
        setActiveIcon(true);
        axios
          .put('/saveDog', { email: userDataState.email, dogObj: dogObj })
          .then(response => {
            console.info('Dog saved!');
            //add to the userData array\
            const oldState = userDataState;
            oldState.savedDogs.unshift(dogObj);
            console.log(oldState, 'dog');
            setUserDataState(oldState);
          })
          .catch(err => {
            console.error(err);
          });
      }
    } else {
      if (activeIcon) {
        // console.log(breedObj)
        setActiveIcon(false);
        axios
          .put('/deleteBreed', { email: userDataState.email, id: breedObj.id })
          .then(response => {
            console.info('Breed deleted');
            const oldState = userDataState;
            for (let i = 0; i < oldState.savedBreeds.length; i++) {
              let currentBreed = oldState.savedBreeds[i];
              if (currentBreed.id === breedObj.id) {
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
        console.log(breedObj)
        setActiveIcon(true);
        axios
          .put('/saveBreed', { email: userDataState.email, breedObj: breedObj })
          .then(response => {
            console.info('Breed saved!');
            const oldState = userDataState;
            oldState.savedBreeds.unshift(breedObj);
            setUserDataState(oldState);
          })
          .catch(err => {
            console.error(err);
          });
      }
    }
  };

  const getIcon = () => {
    let icon = <div />;
    switch (type.toLowerCase()) {
      case 'heart':
        if (activeIcon) {
          icon = (
            <FullHeart
              sx={{
                color: 'error.light',
                padding: '4px',
                backgroundColor: '#ffffff90',
                borderRadius: '100%',
                width: '18px',
                height: '18px'
              }}
            />
          );
        } else {
          icon = (
            <EmptyHeart
              sx={{
                color: 'error.light',
                padding: '4px',
                backgroundColor: '#ffffff90',
                borderRadius: '100%',
                width: '18px',
                height: '18px'
              }}
            />
          );
        }
        break;
      case 'star':
        if (activeIcon) {
          icon = (
            <FullStar
              sx={{
                color: 'error.light',
                padding: '4px',
                backgroundColor: '#ffffff90',
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
                backgroundColor: '#ffffff90',
                borderRadius: '100%',
                width: '18px',
                height: '18px'
              }}
            />
          );
        }
        break;
      default:
        break;
    }
    return icon;
  };

  const getText = () => {
    const nameElement = (
      <Typography color='text.secondary' align='center'>
        {' '}
        {name}{' '}
      </Typography>
    );
    const textElement = (
      <Typography color='text.secondary' align='center'>
        {text}
      </Typography>
    );
    let fullElement;
    if (orientation === 'landscape') {
      fullElement = <Link to='/breed'>{nameElement}</Link>;
    } else {
      fullElement = (
        <Link to='/animal'>
          {nameElement}
          {textElement}
        </Link>
      );
    }
    return fullElement;
  };

  const handleClick = () => {
    if (orientation === 'portrait') {
      setDogOverviewState(dogObj);
    } else {
      setBreedOverviewState(breedObj);
    }
  };

  //heart, portrait = dog
  //star, landscape = breed
  const getImage = () => {
    if (orientation === 'portrait') {
      if (image) {
        return (
          <Link to='/animal'>
            <CardMedia
              onClick={handleClick}
              component='img'
              image={image}
              sx={{
                width: '100%',
                height: '150px',
                backgroundColor: 'linen'
              }}
            />
          </Link>
        );
      } else {
        return (
          <Link to='/animal'>
            <CardMedia component="div" alt='no image' sx={noimgstyle} onClick={handleClick}>
              No Image Provided
            </CardMedia>
          </Link>
        );
      }
    } else {
      if (image) {
        return (
          <Link to='/breed'>
            <CardMedia
              onClick={handleClick}
              component='img'
              image={image}
              sx={{
                width: '100%',
                height: '150px',
                backgroundColor: 'linen'
              }}
            />
          </Link>
        );
      } else {
        return (
          <Link to='/breed'>
            <CardMedia
              onClick={handleClick}
              component='img'
              // image={image}
              alt='no image'
              sx={{
                width: '100%',
                height: '150px',
                backgroundColor: 'linen'
              }}
            />
          </Link>
        );
      }
    }
  };

  return (
    <Card
      id='dogcard'
      sx={{
        position: 'relative',
        width: width[orientation],
        height: height[orientation]
      }}
    >

      <CardActionArea>
        <div
          style={{
            position: 'absolute',
            width: width[orientation]
          }}
        >
          <CardActions
            onClick={handleIconClick}
            style={{ float: 'right' }}
            sx={{
              padding: '5px'
            }}
          >
            {getIcon()}
          </CardActions>
        </div>
        {getImage()}
        <CardContent
          sx={{
            px: '4px',
            py: '0px'
          }}
        >
          <Grid
            container
            direction='column'
            justifyContent='center'
            alignItems='center'
            height={height[orientation] - 150}
            onClick={handleClick}
          >
            {getText()}
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default DogCard;
