import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { Table } from 'reactstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

import { firestore } from '../../firebase/firebase-config';

class Employees extends Component {
  state = { employeesList: [] }

  componentDidMount = async () => {
    const employeesRef = firestore.collection('employees');

    const snapshot = await employeesRef.get();

    snapshot.forEach(doc => {
      const id = doc.id;
      const { age, email, fName, lName, gender, isFullTime, yearsOfExperience } = doc.data();

      this.setState({
        employeesList: [...this.state.employeesList, { id, age, email, fName, lName, gender, isFullTime, yearsOfExperience }]
      })
    })
  }

  render() {
    return (
      <Row>
        <Col sm="12">
          <h4>Employees List</h4>
        </Col>
        <Col sm="12">
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
                  <td className='text-center'><Link to='/'><FaEdit className='text-success' /></Link></td>
                  <td className='text-center'><Link to='/'><FaTrash className='text-danger' /></Link></td>
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