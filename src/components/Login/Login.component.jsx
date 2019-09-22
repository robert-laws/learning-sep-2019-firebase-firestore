import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Card } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

import { auth } from '../../firebase/firebase-config';

class Login extends Component {
  state = {
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

    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({ email: '', password: '' });
    } catch(error) {
      console.log('Error logging into account', error.message);
    }
  }
  
  render() {
    const { email, password } = this.state;

    return (
      <Row>
        <Col>
          <Card body>
            <h4>
              Login
            </h4>
            <Form onSubmit={this.handleSubmit}>
              <FormGroup>
                <Label for="email">Email</Label>
                <Input type="email" name="email" id="email" placeholder="enter your email" value={email} onChange={this.handleChange} />
              </FormGroup>
              <FormGroup>
                <Label for="password">Password</Label>
                <Input type="password" name="password" id="password" placeholder="enter your password" value={password} onChange={this.handleChange} />
              </FormGroup>
              <Button color="primary">Login</Button>
            </Form>
          </Card>
        </Col>
      </Row>
    )
  }
}

export default Login;