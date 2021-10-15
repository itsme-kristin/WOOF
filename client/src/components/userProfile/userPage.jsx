import React, {useState} from 'react';
import FavoriteDogs from './favoriteDogs.jsx';
import FavoriteBreeds from './favoriteBreeds.jsx';
import SideBar from './sideBar.jsx';

import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const UserPage = () => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (e) => {
    setAnchorEl(e.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  }



  return (
    <Container className='innerContainer'>
      <SideBar />
      <FavoriteBreeds />
      <FavoriteDogs />
    </Container>
  )
}


export default UserPage;