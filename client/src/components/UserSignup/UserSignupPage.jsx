import React, { useState, useRef } from 'react';

import { useAuth } from '../../contexts/AuthContext.jsx';
import { Typography,
  TextField,
  Grid,
  Button,
  Card } from '@mui/material/';


const UserSignup = () => {
  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfRef = useRef()
  const addressRef = useRef()
  const { signup } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();


    if (passwordRef.current.value === passwordConfRef.current.value) {
      signup(emailRef.current.value, passwordRef.current.value)
        .then(userCredential => {
          const user = userCredential.user;
        })
        .catch(error => {
          console.error(error);
        })
    } else {
      //error with matching passwords
      console.log('passwords dont match')
    }
  }


  return (
    <div>
      <br />
      <Grid container spacing={3} alignItems='center' justifyContent='center' direction='column'>
        <Grid item>
          <Typography variant='h3'>Sign Up</Typography>
        </Grid>
        <br />
        <form id='signupForm'>
          <Grid item>
            <TextField
              id='usernameField'
              label='Username'
              variant='outlined'
              inputRef={usernameRef}
              required/>
          </Grid>
          <br />
          <Grid item>
            <TextField
              id='passwordField'
              label='Password'
              variant='outlined'
              inputRef={passwordRef}
              required/>
          </Grid>
          <br />
          <Grid item>
            <TextField
              id='passwordConfField'
              label='Password Confirmation'
              variant='outlined'
              inputRef={passwordConfRef}
              required/>
          </Grid>
          <br />
          <Grid item>
            <TextField
              id='emailField'
              label='Email'
              variant='outlined'
              inputRef={emailRef}
              required/>
          </Grid>
          <br />
          <Grid item>
            {/* <Typography variant='subtitle1'>Address Field</Typography> */}
            <TextField
              id='addressField'
              label='Address'
              variant='outlined'
              inputRef={addressRef}
              required/>
          </Grid>
          <Button onClick={handleSubmit}>Submit</Button>
        </form>
      </Grid>
      <Typography variant='body1'>Already have an account? Login
        {/* <Link>
        </Link> */}
      </Typography>
    </div>
  )
}


export default UserSignup;