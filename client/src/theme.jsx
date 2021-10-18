import { createTheme } from '@mui/material/';

const theme = createTheme({
  typography: {
    fontFamily: '"Montserrat", Open Sans'
  },

  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#22333B',
        },
      },
    },
  }
});

export default theme;