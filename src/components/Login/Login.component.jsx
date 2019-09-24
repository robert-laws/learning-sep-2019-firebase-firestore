import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Card } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { auth, getUserDocument } from '../../firebase/firebase-config';

class Login extends Component {
  state = {
    email: '',
    password: ''
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    });
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { email, password } = this.state;

    try {
      const { user } = await auth.signInWithEmailAndPassword(email, password);
      getUserDocument(user.uid);
    } catch(error) {
      console.log('Error logging into account', error.message);
    }
    
    this.setState({ email: '', password: '' });

    this.props.history.push('/')
  }
  
  render() {
    const { email, password } = this.state;

    return (
      <>
        <Card body>
          <h4>
            Login
          </h4>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email" name="email" id="loginEmail" placeholder="enter your email" value={email} onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="password" name="password" id="loginPassword" placeholder="enter your password" value={password} onChange={this.handleChange} />
            </FormGroup>
            <Button color="primary">Login</Button>
          </Form>
        </Card>
      </>
    )
  }
}

export default withRouter(Login);