import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import AppNavbar from './components/layout/AppNavbar';
import Footer from './components/layout/Footer';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import LogIn from './components/auth/LogIn';
import GoalList from './components/GoalList';
import GoalModal from './components/GoalModal';

import { Container } from 'reactstrap';

import './App.css';

class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <AppNavbar />
          <Route exact path="/" component={ Landing } />
          <div className="container">
            <Route exact path="/register" component={ Register } />
            <Route exact path="/login" component={ LogIn } />
          </div>
          {/* <Container>
            <GoalModal />
            <GoalList />
          </Container> */}
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
