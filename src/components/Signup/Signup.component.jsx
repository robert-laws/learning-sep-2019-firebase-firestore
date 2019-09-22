import React, { Component } from 'react';
import { Col } from 'reactstrap';
import { Card } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { auth } from '../../firebase/firebase-config';

class Signup extends Component {
  state = {
    displayName: '',
    email: '',
    password: ''
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    })
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { displayName, email, password } = this.state;

    try {
      const userRef = auth.createUserWithEmailAndPassword(email, password).then(user => {
        console.log(user);
      });

      console.log(userRef);

      console.log(displayName);
      console.log(email);
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    const { displayName, email, password } = this.state;
    
    return(
      <Col sm="6">
        <Card body>
          <h4>
            Sign Up
          </h4>
          <Form onSubmit={this.handleSubmit}>
            <FormGroup>
              <Label for="displayName">Display Name</Label>
              <Input type="displayName" name="displayName" id="displayName" placeholder="enter your display name" value={displayName} onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input type="email" name="email" id="email" placeholder="enter your email" value={email} onChange={this.handleChange} />
            </FormGroup>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input type="password" name="password" id="password" placeholder="enter your password" value={password} onChange={this.handleChange} />
            </FormGroup>
            <Button color="primary">Sign Up</Button>
          </Form>
        </Card>
      </Col>
    )
  }
}

export default Signup;