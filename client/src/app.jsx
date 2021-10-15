import React from 'react';
import "./styles.css";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import DogCard from './components/card/card.jsx';


const App = () => {
  return (
    // <h1 className="app">
    //   Hello World!
    // </h1>
    <DogCard />
  )
};

export default App;