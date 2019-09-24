import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';

class AddEmployee extends Component {

  render() {
    return (
      <Row>
        <Col sm="12">
          <h4 className='mb-4'>Add New Employee</h4>
        </Col>
      </Row>
    )
  }
}

export default AddEmployee;