import React, { useState, useRef } from 'react';
import axios from 'axios';
import { useAuth } from '../../contexts/AuthContext.jsx';
import { Typography,
  TextField,
  Grid,
  Button,
  Card } from '@mui/material/';


const UserSignup = ({ history }) => {
  const usernameRef = useRef()
  const emailRef = useRef()
  const passwordRef = useRef()
  const passwordConfRef = useRef()
  const streetRef = useRef();
  const cityRef = useRef();
  const stateRef = useRef();
  const zipcodeRef = useRef();
  const { signup, setUserData } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();


    if (passwordRef.current.value === passwordConfRef.current.value) {
      signup(emailRef.current.value, passwordRef.current.value)
        .then(userCredential => {
          const user = userCredential.user;
          //request to /userData post email n password (address)  POST
          const params = {
            name: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
            street_address: streetRef.current.value,
            city: cityRef.current.value,
            state: stateRef.current.value,
            zip: zipcodeRef.current.value
          }
          axios.post('/userData', params)
            .then(response => {
              console.log('response from post: ', params)
              setUserData(params)
              history.push('/');
            })
            .catch(error => {
              console.error(error);
            })
          //set context for current user.email location (passed to homepage, and adopt), password, savedDog, savedBreed
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
            {/*TODO: add other address fields (street, city, state, zip) with corresponding REFS */}
            <TextField
              id='streetField'
              label='Street Address'
              variant='outlined'
              inputRef={streetRef}
              required/>
            <Grid item>
            <TextField
              id='cityField'
              label='City'
              variant='outlined'
              inputRef={cityRef}
              required/>
          </Grid><Grid item>
            <TextField
              id='stateField'
              label='State'
              variant='outlined'
              inputRef={stateRef}
              required/>
          </Grid>
          <Grid item>
            <TextField
              id='zipcodeField'
              label='Zipcode'
              variant='outlined'
              inputRef={zipcodeRef}
              required/>
          </Grid>
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