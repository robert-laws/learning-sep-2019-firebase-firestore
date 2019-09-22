import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Card } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { auth, createUserProfileDocument } from 'firebase';

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
      const { user } = await auth.createUserWithEmailAndPassword(email, password);

      await createUserProfileDocument(user, { displayName });

      this.setState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: ''
      });
    } catch(error) {
      console.log(error);
    }
  }

  render() {
    const { displayName, email, password } = this.state;
    
    return(
      <Row>
        <Col>
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
      </Row>
    )
  }
}

export default Signup;