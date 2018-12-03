import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import GoalList from './components/GoalList';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar />
        <GoalList />
      </div>
    );
  }
}

export default App;
