import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Table } from 'reactstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

import { firestore } from '../../firebase/firebase-config';

class Employees extends Component {
  state = { 
    employeesList: [],
    gender: '0',
    age: 0,
    employeeSearch: ''
  }

  unsubscribeFromEmployees = null;

  get employeesRef() {
    return firestore.collection('employees');
  }

  componentDidMount = async () => {
    this.unsubscribeFromEmployees = this.employeesRef.orderBy('fName', 'asc').limit(15).onSnapshot(snapshot => {
      const employees = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })

      this.setState({
        employeesList: employees
      })
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromEmployees();
  }

  getDocName(employeeId) {
    return `/edit/${employeeId}`;
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    })
  }

  handleClick = async (docName) => {
    try {
      await this.employeesRef.doc(docName).delete();
    } catch(error) {
      console.log('Error deleting employee', error.message)
    }
  }

  handleSubmit = event => {
    event.preventDefault();

    this.employeesRef.where('gender', '==', this.state.gender).where('age', '>', Number(this.state.age)).onSnapshot(snapshot => {
      const employees = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })

      this.setState({
        employeesList: employees
      })
    })
  }

  handleCancelClick = event => {
    event.preventDefault();

    this.employeesRef.limit(5).onSnapshot(snapshot => {
      const employees = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })

      this.setState({
        employeesList: employees,
        gender: '0',
        age: 10
      })
    })
  }

  render() {
    const { gender, age, employeeSearch } = this.state;

    return (
      <Row>
        <Col sm="12">
          <h4 className='mb-4'>Employees List</h4>
        </Col>
        <Col sm="12" className='mb-3'>
          <Card>              
            <CardBody>
              <CardTitle className='text-bold'>Filters</CardTitle>
              <Form onSubmit={this.handleSubmit} inline>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Label for="gender" className="mr-sm-2">Gender</Label>
                  <Input type="select" id="gender" name="gender" value={gender} onChange={this.handleChange}>
                    <option value="0">Select a Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </Input>
                </FormGroup>          
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Label for="age" className="mr-sm-2">and Age is Greater Than</Label>
                  <Input type="select" id="age" name="age" value={age} onChange={this.handleChange}>
                    <option value="10">10</option>
                    <option value="20">20</option>
                    <option value="30">30</option>
                    <option value="40">40</option>
                    <option value="50">50</option>
                    <option value="60">60</option>
                  </Input>
                </FormGroup>          
                <Button color="primary" className="mb-2 mr-sm-2 mb-sm-0">Apply Filter</Button>
                <Button color="secondary" onClick={this.handleCancelClick}>Clear Filter</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col sm="12" className='mb-3'>
          <Card>              
            <CardBody>
              <CardTitle className='text-bold'>Search</CardTitle>
              <Input type='text' id='employeeSearch' name='employeeSearch' placeholder='Search for an Employee by First Name' value={employeeSearch} onChange={this.handleChange} />
            </CardBody>
          </Card>
        </Col>
        <Col sm="12" className='mb-3'>
          <Table hover size='md'>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Age</th>
                <th>Gender</th>
                <th>Full Time</th>
                <th>Experience</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {this.state.employeesList.map(employee => (
                <tr key={employee.id}>
                  <td>{employee.fName}</td>
                  <td>{employee.lName}</td>
                  <td>{employee.email}</td>
                  <td>{employee.age}</td>
                  <td>{employee.gender}</td>
                  <td>{employee.isFullTime.toString()}</td>
                  <td>{employee.yearsOfExperience}</td>
                  <td className='text-center'><Link to={this.getDocName(employee.id)}><FaEdit className='text-success' /></Link></td>
                  <td className='text-center'><Button color="link" className="btn-delete" onClick={(event) => {this.handleClick(employee.id)}}><FaTrash className='text-danger' /></Button></td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>        
      </Row>
    )
  }
}

export default Employees;