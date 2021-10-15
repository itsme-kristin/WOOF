import React from 'react';
import Header from './components/header.jsx';
import Footer from './components/footer.jsx';
import HomePage from './components/homePage.jsx';
import UserPage from './components/userPage.jsx';
import ResearchPage from './components/researchPage.jsx';
import AnimalPage from './components/animalPage.jsx';
import "./styles.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DogCard from './components/card/card.jsx';


const App = () => {
  return (
    <Router>
      <div className="app">
        <Header />
        <Switch>
          <Route path='/' exact component={HomePage}/>
          <Route path='/user' exact component={UserPage}/>
          <Route path='/research' exact component={ResearchPage}/>
          <Route path='/animal' component={AnimalPage}/>
        </Switch>
        <Footer />
      </div>
    </Router>
  )
};

export default App;