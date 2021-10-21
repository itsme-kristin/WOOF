import React, { useState } from 'react';

import UserMenu from './userMenu.jsx';
import { useAuth } from '../../contexts/AuthContext.jsx';

import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Typography,
  TextField,
  Select,
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
    listItem: {
      margin: '10px 0',
    },
    buttons: {
      textAlign: 'right',
    },
  },
};


const SideBar = () => {
  const { userData, currentUser } = useAuth();
  const [editMode, setEditMode] = useState(false);
  const [userDataState, setUserDataState] = userData;

  const toggleEdit = () => {
    if (editMode) {
      // get the state of the form fields
      // put the updated data to the server
      // update the userDataState
    }
    setEditMode(!editMode);
  };

  const statesArray = [
    (<MenuItem value="AL">Alabama</MenuItem>),
    (<MenuItem value="AK">Alaska</MenuItem>),
    (<MenuItem value="AS">American Samoa</MenuItem>),
    (<MenuItem value="AZ">Arizona</MenuItem>),
    (<MenuItem value="AR">Arkansas</MenuItem>),
    (<MenuItem value="CA">California</MenuItem>),
    (<MenuItem value="CO">Colorado</MenuItem>),
    (<MenuItem value="CT">Connecticut</MenuItem>),
    (<MenuItem value="DE">Delaware</MenuItem>),
    (<MenuItem value="DC">Dist of Columbia</MenuItem>),
    (<MenuItem value="FL">Florida</MenuItem>),
    (<MenuItem value="GA">Georgia</MenuItem>),
    (<MenuItem value="GU">Guam</MenuItem>),
    (<MenuItem value="HI">Hawaii</MenuItem>),
    (<MenuItem value="ID">Idaho</MenuItem>),
    (<MenuItem value="IL">Illinois</MenuItem>),
    (<MenuItem value="IN">Indiana</MenuItem>),
    (<MenuItem value="IA">Iowa</MenuItem>),
    (<MenuItem value="KS">Kansas</MenuItem>),
    (<MenuItem value="KY">Kentucky</MenuItem>),
    (<MenuItem value="LA">Louisiana</MenuItem>),
    (<MenuItem value="ME">Maine</MenuItem>),
    (<MenuItem value="MD">Maryland</MenuItem>),
    (<MenuItem value="MA">Massachusetts</MenuItem>),
    (<MenuItem value="MI">Michigan</MenuItem>),
    (<MenuItem value="MN">Minnesota</MenuItem>),
    (<MenuItem value="UM">Minor Outlying Islands</MenuItem>),
    (<MenuItem value="MS">Mississippi</MenuItem>),
    (<MenuItem value="MO">Missouri</MenuItem>),
    (<MenuItem value="MT">Montana</MenuItem>),
    (<MenuItem value="NE">Nebraska</MenuItem>),
    (<MenuItem value="NV">Nevada</MenuItem>),
    (<MenuItem value="NH">New Hampshire</MenuItem>),
    (<MenuItem value="NJ">New Jersey</MenuItem>),
    (<MenuItem value="NM">New Mexico</MenuItem>),
    (<MenuItem value="NY">New York</MenuItem>),
    (<MenuItem value="NC">North Carolina</MenuItem>),
    (<MenuItem value="ND">North Dakota</MenuItem>),
    (<MenuItem value="MP">Northern Mariana Islands</MenuItem>),
    (<MenuItem value="OH">Ohio</MenuItem>),
    (<MenuItem value="OK">Oklahoma</MenuItem>),
    (<MenuItem value="OR">Oregon</MenuItem>),
    (<MenuItem value="PA">Pennsylvania</MenuItem>),
    (<MenuItem value="PR">Puerto Rico</MenuItem>),
    (<MenuItem value="RI">Rhode Island</MenuItem>),
    (<MenuItem value="SC">South Carolina</MenuItem>),
    (<MenuItem value="SD">South Dakota</MenuItem>),
    (<MenuItem value="TN">Tennessee</MenuItem>),
    (<MenuItem value="TX">Texas</MenuItem>),
    (<MenuItem value="UT">Utah</MenuItem>),
    (<MenuItem value="VT">Vermont</MenuItem>),
    (<MenuItem value="VA">Virginia</MenuItem>),
    (<MenuItem value="VI">U.S. Virgin Islands</MenuItem>),
    (<MenuItem value="WA">Washington</MenuItem>),
    (<MenuItem value="WV">West Virginia</MenuItem>),
    (<MenuItem value="WI">Wisconsin</MenuItem>),
    (<MenuItem value="WY">Wyoming</MenuItem>)
  ]

  const editForm = () => (
    < >
      <Box id="account-form" component="form">
        <Typography sx={style.form.title}>
          Location:
        </Typography>
        <Typography sx={style.form.list} component='ul' gutterBottom>
          <li style={style.form.listItem}>
            <TextField label="Name:" id="name" size='small' defaultValue={userDataState.name} fullWidth />
          </li>
          <li style={style.form.listItem}>
            <TextField label="Street:" id="street" size='small' defaultValue={userDataState.street_address} fullWidth />
          </li>
          <li style={style.form.listItem}>
            <TextField label="City:" id="city" size="small" defaultValue={userDataState.city} fullWidth />
          </li>
          <li style={style.form.listItem}>
            <FormControl fullWidth>
              <InputLabel id="state-label-form" shrink>State:</InputLabel>
              <Select labelId="state-label-form" label="State:" id="state" size="small" value={userDataState.state}>
                {statesArray}
              </Select>
            </FormControl>
          </li>
          <li style={style.form.listItem}>
            <TextField label="Postal Code:" id="zip" size="small" defaultValue={userDataState.zip} fullWidth />
          </li>
        </Typography>
        <Typography sx={style.form.title}>
          Login Information:
        </Typography>
        <Typography sx={style.form.list} component='ul' gutterBottom>
          <li style={style.form.listItem}>
            <Typography variant={style.form.label} component="div">E-Mail:</Typography>
            {userDataState.email}
          </li>
        </Typography>
      </Box>
    </>
  )

  const readForm = () => (
    < >
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
        </Typography>
      </Box>
    </>
  )

  return (
    <Grid container spacing={2} direction='column'>
      <Grid item>
        <Typography variant="h6" align="center">
          Account
        </Typography>
      </Grid>
      <Grid item id='userInfo' sm={2}>
       {editMode ? editForm() : readForm()}
        <Box id="account-form-buttons" component="div" sx={style.form.buttons}>
          <Button variant="contained" onClick={toggleEdit}>
            {editMode ? 'Save' : 'Edit'}
          </Button>
        </Box>
      </Grid>
    </Grid>
  )
}

export default SideBar;