import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Container, Row } from 'reactstrap';

import Home from './components/Home/Home.component';
import Signup from './components/Signup/Signup.component';

import './App.scss';

class App extends Component {
  constructor() {
    super();

    this.state = {
      currentUser: null
    }
  }

  

  render() {
    return (
      <Container>
        <h1>Firebase Firestore</h1>
        <Link to="/">Home</Link> | <Link to="/signup">Sign Up</Link>
        <p>{ this.state.currentUser ? 'User is Logged In' : 'No User Logged In' }</p>
        <hr />
        <Row>
          <Switch>
            <Route exact path="/" component={Home} />
            <Route path='/signup' component={Signup} />
          </Switch>
        </Row>
      </Container>
    )
  }
}

export default App;
