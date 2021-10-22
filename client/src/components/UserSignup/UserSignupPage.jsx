import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { Typography, TextField, Grid, Button, Card } from '@mui/material/';

const UserSignup = ({ history }) => {
  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const passwordConfRef = useRef();
  const streetRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const zipcodeRef = useRef();
  const { signup, userData, convertAddressToLatLng } = useAuth();
  const [userDataState, setUserDataState] = userData;
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = e => {
    e.preventDefault();
    let queryAddress =
      streetRef.current.value +
      ' ' +
      cityRef.current.value +
      ' ' +
      stateRef.current.value +
      ' ' +
      zipcodeRef.current.value;
    let latLngArray;
    convertAddressToLatLng(queryAddress).then(coordinates => {
      latLngArray = coordinates;
    });
    if (passwordRef.current.value === passwordConfRef.current.value) {
      signup(emailRef.current.value, passwordRef.current.value)
        .then(userCredential => {
          setErrorMessage('');
          const user = userCredential.user;
          //request to /userData post email n password (address)  POST
          const params = {
            name: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            street_address: streetRef.current.value,
            city: cityRef.current.value,
            state: stateRef.current.value,
            zip: zipcodeRef.current.value,
            lat: latLngArray[0],
            lng: latLngArray[1]
          };
          axios
            .post('/userData', params)
            .then(response => {
              console.log('response from post: ', response.data);
              setUserDataState(response.data);
              history.push('/user');
            })
            .catch(error => {
              console.error(error);
            });
          //set context for current user.email location (passed to homepage, and adopt), password, savedDog, savedBreed
        })
        .catch(error => {
          if (error.code === 'auth/email-already-in-use') {
            setErrorMessage('Account with this email already exists');
          } else if (error.code === 'auth/weak-password') {
            setErrorMessage('Password must be at least 6 characters');
          } else if (error.code === 'auth/invalid-email') {
            setErrorMessage('Invalid email address');
          }
        });
    } else {
      //error with matching passwords
      setErrorMessage('Passwords do not match');
    }
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
          <Typography variant='h3'>Sign Up</Typography>
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
              id='usernameField'
              label='Username'
              variant='outlined'
              inputRef={usernameRef}
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
          <br />
          <Grid item>
            <TextField
              id='passwordConfField'
              label='Password Confirmation'
              variant='outlined'
              inputRef={passwordConfRef}
              required
            />
          </Grid>
          <br />
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
            {/*TODO: add other address fields (street, city, state, zip) with corresponding REFS */}
            <TextField
              id='streetField'
              label='Street Address'
              variant='outlined'
              inputRef={streetRef}
              required
            />
            <Grid item>
              <TextField
                id='cityField'
                label='City'
                variant='outlined'
                inputRef={cityRef}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                id='stateField'
                label='State'
                variant='outlined'
                inputRef={stateRef}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                id='zipcodeField'
                label='Zipcode'
                variant='outlined'
                inputRef={zipcodeRef}
                required
              />
            </Grid>
          </Grid>
          <Button onClick={handleSubmit}>Submit</Button>
        </form>
      </Grid>
    </div>
  );
};

export default UserSignup;
