import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Container } from 'reactstrap';

import Home from './components/Home/Home.component';
import Signup from './components/Signup/Signup.component';

import { auth, createUserProfileDocument } from './firebase/firebase-config';

import './App.scss';

class App extends Component {
  state = { currentUser: null }

  unsubscribeFromAuth = null;

  componentDidMount = () => {
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          this.setState({
            currentUser: {
              id: snapShot.id,
              ...snapShot.data()
            }
          })
        })
      }
      this.setState({ currentUser: userAuth })
    })
  }

  componentWillUnmount = () => {
    this.unsubscribeFromAuth();
  }

  render() {
    return (
      <Container>
        <h1>Firebase Firestore</h1>
        <Link to="/signup">Sign Up</Link>
        <p>{ this.state.currentUser ? 'User is Logged In' : 'No User Logged In' }</p>
        <hr />
        <Switch>
          <Route exact path="/" component={Home} />
          <Route path='/signup' component={Signup} />
        </Switch>
      </Container>
    )
  }
}

export default App;
