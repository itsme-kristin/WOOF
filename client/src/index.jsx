import React from 'react';
import ReactDOM from 'react-dom';
import App from './app.jsx';
import theme from './theme.jsx';

import { ThemeProvider } from '@mui/material/styles'

ReactDOM.render(
<ThemeProvider theme={theme}>
<App />
</ThemeProvider>
, document.getElementById('app'));