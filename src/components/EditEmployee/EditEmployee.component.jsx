import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';

import { withRouter } from 'react-router-dom';

import { firestore } from '../../firebase/firebase-config';

class EditEmployee extends Component {
  state = {
    fName: '',
    lName: '',
    email: '',
    age: '',
    gender: '0',
    yearsOfExperience: '',
    isFullTime: false
  }

  componentDidMount = async () => {
    const docName = this.props.match.params.docName;

    const employeeRef = firestore.collection('employees').doc(docName);

    const employeeData = await employeeRef.get();

    const { fName, lName, email, age, gender, yearsOfExperience, isFullTime } = employeeData.data();

    this.setState({
      fName,
      lName,
      email,
      age,
      gender,
      yearsOfExperience,
      isFullTime
    })
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

    let docName = this.props.match.params.docName;
    
    const employeesRef = firestore.collection('employees');

    try {
      await employeesRef.doc(docName).set({
        fName,
        lName,
        email,
        age,
        gender,
        yearsOfExperience,
        isFullTime
      },
      {
        merge: true
      });
    } catch(error) {
      console.log('Error creating employee', error.message)
    }

    this.props.history.push('/employees')
  }

  render() {
    const { fName, lName, email, age, gender, yearsOfExperience, isFullTime } = this.state;

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
                    <Input type="text" id="age" name="age" value={age} onChange={this.handleChange} placeholder="Age" />
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
                    <Input type="text" id="yearsOfExperience" name="yearsOfExperience" value={yearsOfExperience} onChange={this.handleChange} placeholder="Years of Experience" />
                  </FormGroup>
                  <FormGroup check className="mb-3">
                    <Label check>
                      <Input type="checkbox" id="isFullTime" name="isFullTime" value={isFullTime} checked={isFullTime} onClick={this.handleClick} />{' '}Full Time
                    </Label>
                  </FormGroup>
                  <Button color="primary">Update Employee</Button>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </>
    )
  }
}

export default withRouter(EditEmployee);