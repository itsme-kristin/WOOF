import React, { useState } from 'react';
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
// import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';
// import Circle from '@mui/icons-material/Circle';
import { Link } from 'react-router-dom';

const height = {landscape: 200, portrait: 252};
const width = {landscape: 252, portrait: 200};

const DogCard = (props) => {
  const image = props.image;
  const orientation = props.orientation || 'portrait';
  const text = props.text || '3 Mths | Labrador Retriever | 8 miles';
  const type = props.type || 'none';
  const name = props.name || 'Oliver';
  const [ activeIcon, setActiveIcon ] = useState(false); //change initial state to a boolean of if the dog is found in the user's fav list

  const handleClick = (event) => {
    //TODO: IF TYPE = HEART (DOG)
        //TODO: cases if active => remove favorite (toggle to inactive)
        //if unactive => add favorite (toggle to active)
    //IF TYPE = STAR (BREED)
        //
    setActiveIcon(!activeIcon);
  }

  const getIcon = () => {
    let icon = <div />
    switch (type.toLowerCase()) {
      case 'heart':
        if (activeIcon){
          icon = <FullHeart sx={{color:'error.light', padding: '4px', backgroundColor: '#ffffff70', borderRadius: '100%', width: '18px', height: '18px'}}/>;
        } else {
          icon = <EmptyHeart sx={{color:'error.light', padding: '4px', backgroundColor: '#ffffff70', borderRadius: '100%', width: '18px', height: '18px'}}/>;
        }
        break;
      case 'star' :
        if (activeIcon){
          icon = <FullStar sx={{color:'error.light', padding: '4px', backgroundColor: '#ffffff70', borderRadius: '100%', width: '18px', height: '18px'}}/>;
        }  else {
          icon = <EmptyStar sx={{color:'error.light', padding: '4px', backgroundColor: '#ffffff70', borderRadius: '100%', width: '18px', height: '18px'}}/>;
        }
        break;
      default:
        break;
    }
    return ( icon );
  }

  const getText =() => {
    const nameElement = <Typography color="text.secondary" align='center'> {name} </Typography> ;
    const textElement = <Typography color="text.secondary" align='center'>{text}</Typography> ;
    let fullElement;
    if (orientation === 'landscape') {
      fullElement = (
        <Link to='/breed'>
          {nameElement}
        </Link>
      )
    } else {
      fullElement = (
        <Link to='/animal'>
          {nameElement}
          {textElement}
        </Link>
      )
    }
    return(fullElement)
  }

//heart, portrait = dog
//star, landscape = breed
  const getImage = () => {
    if (orientation === 'portrait') {
      if (image) {
        return (
          <Link to='/animal'>
            <CardMedia
              component="img"
              image={image}
              sx={{
                width: '100%',
                height: '150px',
                backgroundColor: 'linen'
              }}
            />
          </Link>
        )
      } else {
        return (
          <Link to='/animal'>
            <CardMedia
              component="img"
              // image={image}
              alt='no image'
              sx={{
                width: '100%',
                height: '150px',
                backgroundColor: 'linen'
              }}
            />
          </Link>
        )
      }
    } else {
      if (image) {
        return (
          <Link to='/breed'>
            <CardMedia
              component="img"
              image={image}
              sx={{
                width: '100%',
                height: '150px',
                backgroundColor: 'linen'
              }}
            />
          </Link>
        )
      } else {
        return (
          <Link to='/breed'>
            <CardMedia
              component="img"
              // image={image}
              alt='no image'
              sx={{
                width: '100%',
                height: '150px',
                backgroundColor: 'linen'
              }}
            />
          </Link>
        )
      }

    }
  }

  return (
    <Card
      id='dogcard'
      sx={{
        position: 'relative',
        width: width[orientation],
        height: height[orientation]
      }}
      >
      <div
        style={{
          position: 'absolute',
          width: width[orientation]
        }}
      >
        <CardActions
          onClick={handleClick}
          style={{ float: 'right'}}
          sx={{
            padding: '5px',
          }}
        >
          { getIcon() }
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
          direction="column"
          justifyContent="center"
          alignItems="center"
          height={height[orientation] - 150}
        >
          {getText()}
        </Grid>
      </CardContent>
    </Card>
  );
}

export default DogCard;