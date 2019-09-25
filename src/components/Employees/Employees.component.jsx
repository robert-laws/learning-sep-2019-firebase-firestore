import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Row, Col } from 'reactstrap';
import { Table } from 'reactstrap';
import { Button } from 'reactstrap';
import { FaEdit, FaTrash } from 'react-icons/fa';

import { firestore } from '../../firebase/firebase-config';

class Employees extends Component {
  state = { employeesList: [] }
  unsubscribeFromEmployees = null;

  get employeesRef() {
    return firestore.collection('employees');
  }

  componentDidMount = async () => {
    this.unsubscribeFromEmployees = this.employeesRef.onSnapshot(snapshot => {
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

  handleClick = async (docName) => {
    try {
      await this.employeesRef.doc(docName).delete();
    } catch(error) {
      console.log('Error deleting employee', error.message)
    }
  }

  render() {
    return (
      <Row>
        <Col sm="12">
          <h4 className='mb-4'>Employees List</h4>
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