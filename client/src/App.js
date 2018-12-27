import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import GoalList from './components/GoalList';
import GoalModal from './components/GoalModal';
import { Container } from 'reactstrap';

import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <AppNavbar />
        <Container>
          <GoalModal />
          <GoalList />
        </Container>
      </div>
    );
  }
}

export default App;
