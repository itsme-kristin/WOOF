import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { Typography, TextField, Grid, Button, Card } from '@mui/material/';

const UserSignIn = ({ history }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signin, userData } = useAuth();
  const [userDataState, setUserDataState] = userData
  const handleSubmit = e => {
    e.preventDefault();

    signin(emailRef.current.value, passwordRef.current.value)
      .then(userCredential => {
        const user = userCredential.user;
        console.log(emailRef.current.value)
        axios.get(`/userData?email=${emailRef.current.value}`)
          .then((response) => {
            console.log('get request response', response);
            setUserDataState(response.data)
          })
          .catch(error => {
            console.error(error)
          })
        history.push('/');
      })
      .catch(error => {
        console.error(error);
      });
  };

  return (
    <div>
      <br />
      <Grid
        container
        spacing={3}
        alignItems='center'
        justifyContent='center'
        direction='column'
      >
        <Grid item>
          <Typography variant='h3'>Sign In</Typography>
        </Grid>
        <br />
        <form id='signupForm'>
          <Grid item>
            <TextField
              id='emailField'
              label='Email'
              variant='outlined'
              inputRef={emailRef}
              required
            />
          </Grid>
          <br />
          <Grid item>
            <TextField
              id='passwordField'
              label='Password'
              variant='outlined'
              inputRef={passwordRef}
              required
            />
          </Grid>
          <Button onClick={handleSubmit}>Submit</Button>
        </form>
      </Grid>
      <Typography variant='body1'>
        Already have an account? Login
        {/* <Link>
        </Link> */}
      </Typography>
    </div>
  );
};

export default UserSignIn;
