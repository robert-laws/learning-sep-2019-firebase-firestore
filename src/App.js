import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { Container } from 'reactstrap';

import Home from './components/Home/Home.component';
import SignupOrLogin from './components/SignupOrLogin/SignupOrLogin.component';
import Logout from './components/Logout/Logout.component';

import { auth, createUserProfileDocument } from './firebase/firebase-config';

import './App.scss';

class App extends Component {
  state = { currentUser: null };

  unsubscribeFromAuth = null;

  componentDidMount = async () => {   
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if(userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          this.setState({ currentUser: { uid: snapshot.id, ...snapshot.data() }})
        })
      }
      this.setState({ currentUser: userAuth })
    })
  }

  componentWillUnmount = () => {
    this.unsubscribeFromAuth();
  }

  render() {
    const { currentUser } = this.state;
    return (
      <Container>
        <h1>Firebase Firestore</h1>
        <Link to="/">Home</Link> | { currentUser ? '' : <Link to="/enter">Sign Up</Link>}
        <p>{ currentUser ? `User ${currentUser.displayName} is Logged In` : 'No User Logged In' }</p>
        { currentUser ? <Logout /> : ''}
        <hr />
        <Switch>
          <Route exact path="/" component={Home} />
          { currentUser ? '' : <Route path='/enter' component={SignupOrLogin} />}
        </Switch>
      </Container>
    )
  }
}

export default App;
