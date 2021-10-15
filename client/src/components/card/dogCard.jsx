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

const height = {landscape: 200, portrait: 250};
const width = {landscape: 250, portrait: 200};

const DogCard = (props) => {
  const image = props.image || './oliver.jpg';
  const orientation = props.orientation || 'landscape';
  const text = props.text || 'Oliver | 3 Mths | Labrador Retriever';
  const favorable = props.favorite? true: true;
  const [ activeIcon, setActiveIcon ] = useState(false);


  const handleClick = (event) => {
    setActiveIcon(!activeIcon);
  }

  const getIcon = () => {
    let icon = <div />
    if (favorable) {
      icon = activeIcon ? <FullHeart /> : <EmptyHeart />;
    }
    return ( icon );
  }

  return (
    <Card
      id='dogcard'
      sx={{
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
        <CardActions onClick={handleClick} style={{ float: 'right'}}>
          <Button size="small"> { getIcon() } </Button>
        </CardActions>
      </div>
      <CardMedia
        component="img"
        image="https://cdn.discordapp.com/attachments/872115659880935469/884206309858238536/image0.jpg"
        alt="Oliver the dog"
        sx={{
          width: '100%',
          height: '150px',
          backgroundColor: 'linen'
        }}
      />
      <CardContent>
        <Typography variant="subtitle2" color="text.secondary" textAlign='center'
        component="h2"
        sx={{ padding: '0px',

        }}
        >
          {text}
        </Typography>
      </CardContent>
    </Card>
  );
}


export default DogCard;