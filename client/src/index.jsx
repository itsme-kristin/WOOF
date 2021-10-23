import React from "react";
import ReactDOM from "react-dom";
import App from "./app.jsx";
import theme from "./theme.jsx";
import AuthProvider from "./contexts/AuthContext.jsx";

import { ThemeProvider } from "@mui/material/styles";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <AuthProvider>
      <App />
    </AuthProvider>
  </ThemeProvider>,
  document.getElementById("app")
);
