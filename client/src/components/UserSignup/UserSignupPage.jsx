import React from 'react';

import { Typography, TextField, Grid } from '@mui/material/';


const tempStyle = {
  border: '3px solid black',
}

const UserSignup = () => {
  return (
    <div>
      <br />
      <Grid container spacing={3} alignItems='center' justifyContent='center' direction='column' style={tempStyle}>
        <Grid item>
          <Typography variant='h3'>Sign Up Page</Typography>
        </Grid>
        <Grid item>
          <TextField id='usernameField' label='Username' variant='outlined' required/>
        </Grid>
        <Grid item>
          <TextField id='passwordField' label='Password' variant='outlined' required/>
        </Grid>
        <Grid item>
          <TextField id='emailField' label='Email' variant='outlined' required/>
        </Grid>
        <Grid item>
          <Typography variant='subtitle1'>Address Field</Typography>
          <TextField id='addressField' label='Address' variant='outlined' required/>
        </Grid>
      </Grid>
    </div>
  )
}


export default UserSignup;