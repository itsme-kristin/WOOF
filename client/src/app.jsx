import React from 'react';
import Header from './components/header.jsx';
import UserPage from './components/userPage.jsx';
import ResearchPage from './components/researchPage.jsx';
import AnimalPage from './components/animalPage.jsx';
import "./styles.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DogCard from './components/card/dogCard.jsx';

import { Container } from '@mui/material';


const App = () => {
  return (
    <>
    <Router>
      <div class="app">
        <Header />
        <Container maxWidth="lg">
        <Route path='/user'/>
        <Route path='/research'/>
        <Route path='/dogProfile' />
        </Container>
        {/* <Footer /> */}
      </div>
    </Router>
    </>
  )
};

export default App;


