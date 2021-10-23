import React from "react";
import "./styles.css";
import { useAuth } from "./contexts/AuthContext.jsx";
import Header from "./components/header.jsx";
import Footer from "./components/footer.jsx";
import HomePage from "./components/homePage.jsx";
import UserPage from "./components/userProfile/userPage.jsx";
import UserSignup from "./components/UserSignup/UserSignupPage.jsx";
import SearchForPets from "./components/searchForPets.jsx";
import ResearchPage from "./components/researchPage.jsx";
import AnimalPage from "./components/animalPage.jsx";
import BreedPage from "./components/breedPage.jsx";
import DogCard from "./components/card/dogCard.jsx";
import UserSignIn from "./components/UserSignup/UserSigninPage.jsx";

import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@material-ui/core/Grid";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Container from "@mui/material/Container";

export default function App() {
  const { isLoading } = useAuth();
  const [isLoadingState, setIsLoadingState] = isLoading;
  if (isLoadingState) {
    return (
      <Container maxWidth="lg" className="loading">
        <Grid container justifyContent="center" alignItems="center">
          <CircularProgress />
        </Grid>
      </Container>
    );
  }

  return (
    <>
      <Router>
        <Header />
        <Container id="appContainer">
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/user" exact component={UserPage} />
            <Route path="/research" exact component={ResearchPage} />
            <Route path="/animal" component={AnimalPage} />
            <Route path="/search" component={SearchForPets} />
            <Route path="/signup" component={UserSignup} />
            <Route path="/breed" component={BreedPage} />
            <Route path="/signin" component={UserSignIn} />
          </Switch>
        </Container>
        <Footer />
      </Router>
    </>
  );
}
