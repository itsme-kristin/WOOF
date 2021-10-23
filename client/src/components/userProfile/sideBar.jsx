import React, { useState, useRef } from 'react';
import axios from 'axios';

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
    editList: {
      listStyleType: 'none',
      paddingLeft: 0,
    },
    readList: {
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

  let formData = { ...userDataState }

  const toggleEdit = () => {
    if (!editMode) {
      formData = { ...userDataState };
      setEditMode(!editMode);
    }
    if (editMode) {
      // put the updated data to the server
      axios.put('/userData', formData)
      // update the current user state
      .then(() => setUserDataState(formData))
      // confirm the user data was updated
      .then(() => console.log('User data has been updated!'))
      // toggle the edit/save button
      .then(() => setEditMode(!editMode))
      // log if an error occurred
      .catch(() => console.log('User data failed to update'));
    }
  };

  const statesArray = [
    (<MenuItem key="al" value="AL">Alabama</MenuItem>),
    (<MenuItem key="ak" value="AK">Alaska</MenuItem>),
    (<MenuItem key="as" value="AS">American Samoa</MenuItem>),
    (<MenuItem key="az" value="AZ">Arizona</MenuItem>),
    (<MenuItem key="ar" value="AR">Arkansas</MenuItem>),
    (<MenuItem key="ca" value="CA">California</MenuItem>),
    (<MenuItem key="co" value="CO">Colorado</MenuItem>),
    (<MenuItem key="ct" value="CT">Connecticut</MenuItem>),
    (<MenuItem key="de" value="DE">Delaware</MenuItem>),
    (<MenuItem key="dc" value="DC">Dist of Columbia</MenuItem>),
    (<MenuItem key="fl" value="FL">Florida</MenuItem>),
    (<MenuItem key="ga" value="GA">Georgia</MenuItem>),
    (<MenuItem key="gu" value="GU">Guam</MenuItem>),
    (<MenuItem key="hi" value="HI">Hawaii</MenuItem>),
    (<MenuItem key="id" value="ID">Idaho</MenuItem>),
    (<MenuItem key="il" value="IL">Illinois</MenuItem>),
    (<MenuItem key="in" value="IN">Indiana</MenuItem>),
    (<MenuItem key="ia" value="IA">Iowa</MenuItem>),
    (<MenuItem key="ks" value="KS">Kansas</MenuItem>),
    (<MenuItem key="ky" value="KY">Kentucky</MenuItem>),
    (<MenuItem key="la" value="LA">Louisiana</MenuItem>),
    (<MenuItem key="me" value="ME">Maine</MenuItem>),
    (<MenuItem key="md" value="MD">Maryland</MenuItem>),
    (<MenuItem key="ma" value="MA">Massachusetts</MenuItem>),
    (<MenuItem key="mi" value="MI">Michigan</MenuItem>),
    (<MenuItem key="mn" value="MN">Minnesota</MenuItem>),
    (<MenuItem key="um" value="UM">Minor Outlying Islands</MenuItem>),
    (<MenuItem key="ms" value="MS">Mississippi</MenuItem>),
    (<MenuItem key="mo" value="MO">Missouri</MenuItem>),
    (<MenuItem key="mt" value="MT">Montana</MenuItem>),
    (<MenuItem key="ne" value="NE">Nebraska</MenuItem>),
    (<MenuItem key="nv" value="NV">Nevada</MenuItem>),
    (<MenuItem key="nh" value="NH">New Hampshire</MenuItem>),
    (<MenuItem key="nj" value="NJ">New Jersey</MenuItem>),
    (<MenuItem key="nm" value="NM">New Mexico</MenuItem>),
    (<MenuItem key="ny" value="NY">New York</MenuItem>),
    (<MenuItem key="nc" value="NC">North Carolina</MenuItem>),
    (<MenuItem key="nd" value="ND">North Dakota</MenuItem>),
    (<MenuItem key="mp" value="MP">Northern Mariana Islands</MenuItem>),
    (<MenuItem key="oh" value="OH">Ohio</MenuItem>),
    (<MenuItem key="ok" value="OK">Oklahoma</MenuItem>),
    (<MenuItem key="or" value="OR">Oregon</MenuItem>),
    (<MenuItem key="pa" value="PA">Pennsylvania</MenuItem>),
    (<MenuItem key="pr" value="PR">Puerto Rico</MenuItem>),
    (<MenuItem key="ri" value="RI">Rhode Island</MenuItem>),
    (<MenuItem key="sc" value="SC">South Carolina</MenuItem>),
    (<MenuItem key="sd" value="SD">South Dakota</MenuItem>),
    (<MenuItem key="tn" value="TN">Tennessee</MenuItem>),
    (<MenuItem key="tx" value="TX">Texas</MenuItem>),
    (<MenuItem key="ut" value="UT">Utah</MenuItem>),
    (<MenuItem key="vt" value="VT">Vermont</MenuItem>),
    (<MenuItem key="va" value="VA">Virginia</MenuItem>),
    (<MenuItem key="vi" value="VI">U.S. Virgin Islands</MenuItem>),
    (<MenuItem key="wa" value="WA">Washington</MenuItem>),
    (<MenuItem key="wv" value="WV">West Virginia</MenuItem>),
    (<MenuItem key="wi" value="WI">Wisconsin</MenuItem>),
    (<MenuItem key="wy" value="WY">Wyoming</MenuItem>)
  ]

const updateField = (e) => {
  formData[e.target.id] = e.target.value;
}

  const editForm = () => (
    < >
      <Box id="account-form" component="form">
        <Typography sx={style.form.title}>
          Location:
        </Typography>
        <Typography sx={style.form.editList} component='ul' gutterBottom>
          <li style={style.form.listItem}>
            <TextField label="Name:" id="name" size='small' defaultValue={formData.name} onChange={updateField} fullWidth />
          </li>
          <li style={style.form.listItem}>
            <TextField label="Street:" id="street_address" size='small' defaultValue={formData.street_address} onChange={updateField} fullWidth />
          </li>
          <li style={style.form.listItem}>
            <TextField label="City:" id="city" size="small" defaultValue={formData.city} onChange={updateField} fullWidth />
          </li>
          <li style={style.form.listItem}>
            <FormControl fullWidth>
              <InputLabel id="state-label-form" shrink>State:</InputLabel>
              <Select labelId="state-label-form" label="State:" id="state" size="small" value={formData.state} onChange={updateField} >
                {statesArray}
              </Select>
            </FormControl>
          </li>
          <li style={style.form.listItem}>
            <TextField label="Postal Code:" id="zip" size="small" defaultValue={formData.zip} onChange={updateField} fullWidth />
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
        <Typography sx={style.form.readList} component='ul' gutterBottom>
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