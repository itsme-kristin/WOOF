import React from 'react';
import Header from './components/header.jsx';
import UserPage from './components/userPage.jsx';
import ResearchPage from './components/researchPage.jsx';
import AnimalPage from './components/animalPage.jsx';
import "./styles.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DogCard from './components/card/card.jsx';


const App = () => {
  return (
<<<<<<< HEAD
    // <h1 className="app">
    //   Hello World!
    // </h1>
    <DogCard />
=======
    <Router>
      <h1 className="app">
        <Header />
        <Route path='/user' component={UserPage}/>
        <Route path='/research' component={ResearchPage}/>
        <Route path='/animal' component={AnimalPage}/>
      </h1>
    </Router>
>>>>>>> main
  )
};

export default App;