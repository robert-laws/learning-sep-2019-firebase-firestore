import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Alert } from 'reactstrap';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import { withRouter } from 'react-router-dom';

import { firestore } from '../../firebase/firebase-config';

class AddEmployee extends Component {
  state = {
    fName: '',
    lName: '',
    email: '',
    age: '',
    gender: '0',
    yearsOfExperience: '',
    isFullTime: false,
    error: ''
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    })
  }

  handleClick = event => {
    const checked = event.target.checked;

    this.setState({
      isFullTime: checked
    })
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { fName, lName, email, age, gender, yearsOfExperience, isFullTime } = this.state;
    const employeeAge = Number(age);
    const employeeYearsOfExperience = Number(yearsOfExperience);

    let docName = `${fName.charAt(0)}.${lName}`;
    
    const employeesRef = firestore.collection('employees');

    try {
      await employeesRef.doc(docName).set({
        fName,
        lName,
        email,
        age: employeeAge,
        gender,
        yearsOfExperience: employeeYearsOfExperience,
        isFullTime
      });

      this.props.history.push('/employees')
    } catch(error) {
      this.setState({
        error: error.message
      })
    }    
  }

  render() {
    const { fName, lName, email, age, gender, yearsOfExperience, isFullTime, error } = this.state;

    return (
      <>
        <Row>
          <Col sm="12">
            <h4 className='mb-4'>Add New Employee</h4>
          </Col>
        </Row>
        <Row>
          <Col sm="12">
            <Card>              
              <CardBody>
                {error !== '' ? <Alert color='danger'>{error}</Alert> : ''}
                <CardTitle className='text-bold'>New Employee Details</CardTitle>
                <Form onSubmit={this.handleSubmit}>
                  <FormGroup>
                    <Label for="fName">First Name</Label>
                    <Input type="text" id="fName" name="fName" value={fName} onChange={this.handleChange} placeholder="First Name" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="lName">Last Name</Label>
                    <Input type="text" id="lName" name="lName" value={lName} onChange={this.handleChange} placeholder="Last Name" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="email">Email Address</Label>
                    <Input type="email" id="email" name="email" value={email} onChange={this.handleChange} placeholder="Email Address" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="age">Age</Label>
                    <Input type="number" id="age" name="age" value={age} onChange={this.handleChange} placeholder="Age" />
                  </FormGroup>
                  <FormGroup>
                    <Label for="gender">Gender</Label>
                    <Input type="select" id="gender" name="gender" value={gender} onChange={this.handleChange}>
                      <option value="0">Select a Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                    </Input>
                  </FormGroup>
                  <FormGroup>
                    <Label for="yearsOfExperience">Years Of Experience</Label>
                    <Input type="number" id="yearsOfExperience" name="yearsOfExperience" value={yearsOfExperience} onChange={this.handleChange} placeholder="Years of Experience" />
                  </FormGroup>
                  <FormGroup check className="mb-3">
                    <Label check>
                      <Input type="checkbox" id="isFullTime" name="isFullTime" value={isFullTime} onClick={this.handleClick} />{' '}Full Time
                    </Label>
                  </FormGroup>
                  <Button color="primary">Add Employee</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}

export default withRouter(AddEmployee);