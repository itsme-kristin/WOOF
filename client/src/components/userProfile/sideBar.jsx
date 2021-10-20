import React, { useState } from 'react';

import UserMenu from './userMenu.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';

import {
  Box,
  Button,
  Typography,
  Grid,
 } from '@mui/material';

const style = {
  form: {
    title: {
      fontWeight: 600,
    },
    label: 'caption',
    list: {
      listStyleType: 'none',
      paddingLeft: '10px',
    },
    buttons: {
      textAlign: 'right',
    },
  },
};


const SideBar = () => {
  const [editMode, setEditMode] = useState(false);

  const { userData, currentUser } = useAuth();
  const [userDataState, setUserDataState] = userData;
  // {console.log(userDataState)}
  // {console.log(currentUser)}

  const toggleEdit = () => {
    setEditMode(!editMode);
  };

  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <Typography variant="h6" align="center">
          Account
        </Typography>
      </Grid>
      <Grid item id='userInfo' sm={2}>
        <Box id="account-form" component="form">
          <Typography sx={style.form.title}>
            Location:
          </Typography>
          <Typography sx={style.form.list} component='ul' gutterBottom>
            <li>
              <Typography variant={style.form.label} component="div">Name:</Typography>
              {userDataState.name}
            </li>
            <li>
              <Typography variant={style.form.label} component="div">Street:</Typography>
              {userDataState.street_address}
            </li>
            <li>
              <Typography variant={style.form.label} component="div">City:</Typography>
              {userDataState.city}
            </li>
            <li>
              <Typography variant={style.form.label} component="div">State:</Typography>
              {userDataState.state}
            </li>
            <li>
              <Typography variant={style.form.label} component="div">PostalCode:</Typography>
              {userDataState.zip}
            </li>
          </Typography>
          <Typography sx={style.form.title}>
            Login Information:
          </Typography>
          <Typography sx={style.form.list} component='ul' gutterBottom>
            <li>
              <Typography variant={style.form.label} component="div">E-Mail:</Typography>
              {userDataState.email}
            </li>
            <li>
              <Typography variant={style.form.label} component="div">Password:</Typography>
              {userDataState.password}
            </li>
          </Typography>
          <Box id="account-form-buttons" component="div" sx={style.form.buttons}>
            <Button variant="contained" onClick={toggleEdit}>
              {editMode ? 'Save'
                        : 'Edit'}
            </Button>
          </Box>
        </Box>
      </Grid>
    </Grid>
  )
}

export default SideBar;