import React from 'react';

import {
  Grid,
  Paper,
} from '@mui/material';
import ImageNotSupportedIcon from '@mui/icons-material/ImageNotSupported';

const empty = {
  card: {
    width: '200px',
    height: '252px',
    padding: '5px',
    backgroundColor: '#EAE0D5',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },

  icon: {
    color: '#5E503F',
    fontSize: '60px',
  },
};

const EmptyCard = (key) => {
  return (
    <Grid item key={key}>
      <Paper sx={empty.card}>
            <ImageNotSupportedIcon sx={empty.icon} />
      </Paper>
    </Grid>
  );
};

export default EmptyCard;