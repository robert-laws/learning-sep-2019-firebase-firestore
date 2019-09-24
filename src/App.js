import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { Container } from 'reactstrap';

import Navigation from './components/Navigation/Navigation.component';
import Home from './components/Home/Home.component';
import Employees from './components/Employees/Employees.component';
import AddEmployee from './components/AddEmployee/AddEmployee.component';
import EditEmployee from './components/EditEmployee/EditEmployee.component';
import SignupOrLogin from './components/SignupOrLogin/SignupOrLogin.component';

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
      <>
        <Container fluid className='nav-navigation'>
          <Navigation user={currentUser} />
        </Container>
        <Container>          
          <Switch>
            <Route exact path="/" component={Home} />
            <Route exact path="/employees" component={Employees} />
            <Route exact path="/add-employee" component={AddEmployee} />
            <Route exact path="/edit/:docName" component={EditEmployee} />
            { currentUser ? '' : <Route path='/enter' component={SignupOrLogin} />}
          </Switch>
        </Container>
      </>
    )
  }
}

export default App;
