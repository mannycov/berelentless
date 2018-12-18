import React, { Component } from 'react';
import AppNavbar from './components/AppNavbar';
import GoalList from './components/GoalList';
import GoalModal from './components/GoalModal';
import { Container } from 'reactstrap';

import { Provider } from 'react-redux';
import store from './store';

import 'bootstrap/dist/css/bootstrap.min.css'
import './App.css';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <AppNavbar />
          <Container>
            <GoalModal />
            <GoalList />
          </Container>
        </div>
      </Provider>
    );
  }
}

export default App;
