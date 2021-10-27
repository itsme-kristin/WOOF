import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { Typography, TextField, Grid, Button, Card } from '@mui/material/';

const UserSignIn = ({ history }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const { signin, userData } = useAuth();
  const [userDataState, setUserDataState] = userData;
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = e => {
    e.preventDefault();

    signin(emailRef.current.value, passwordRef.current.value)
      .then(userCredential => {
        setErrorMessage('');
        const user = userCredential.user;
        axios
          .get(`/userData?email=${emailRef.current.value}`)
          .then(response => {
            setUserDataState(response.data);
          })
          .catch(error => {
            console.error(error);
          });
        history.push('/');
      })
      .catch(error => {
        console.error(error);
        if (error.code === 'auth/user-not-found') {
          setErrorMessage('No account found with this email');
        } else if (error.code === 'auth/wrong-password') {
          setErrorMessage('Incorrect password');
        } else if (error.code === 'auth/invalid-email') {
          setErrorMessage('Invalid email address');
        } else if (error.code === 'auth/user-disabled') {
          setErrorMessage('Account had been disabled');
        }
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
          {errorMessage.length > 0 ? (
            <Grid item>
              <Typography sx={{ color: 'red' }}>{errorMessage}</Typography>
            </Grid>
          ) : null}
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
    </div>
  );
};

export default UserSignIn;
