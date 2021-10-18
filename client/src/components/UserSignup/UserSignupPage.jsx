import React from 'react';

import { Typography,
  TextField,
  Grid,
  Button,
  Card } from '@mui/material/';


const UserSignup = () => {
  return (
    <div>
      <br />
      <Grid container spacing={3} alignItems='center' justifyContent='center' direction='column'>
        <Card>
          <Grid item>
            <Typography variant='h3'>Sign Up</Typography>
          </Grid>
          <form id='signupForm'>
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
            <Button onClick={handleClick}>Submit</Button>
          </form>
        </Card>
      </Grid>
      <Typography variant='body1'>Already have an account? Login
        {/* <Link>
        </Link> */}
      </Typography>
    </div>
  )
}


export default UserSignup;