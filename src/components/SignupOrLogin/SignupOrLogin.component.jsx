import React from 'react';
import { Row, Col } from 'reactstrap';

import Signup from '../Signup/Signup.component';
import Login from '../Login/Login.component';

const SignupOrLogin = () => {
  return (
    <Row>
      <Col sm='6'>
        <Login />
      </Col>
      <Col sm='6'>
        <Signup />
      </Col>
    </Row>
  )
}

export default SignupOrLogin;