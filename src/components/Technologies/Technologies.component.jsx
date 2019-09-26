import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Card, CardBody, CardTitle } from 'reactstrap';
import { Form, FormGroup, Label, Input, Button } from 'reactstrap';
import { ListGroup, ListGroupItem, Badge } from 'reactstrap';

import { firestore } from '../../firebase/firebase-config';

class Technologies extends Component {
  state = {
    technologies: [],
    project: '',
    selection: '',
    projectList: []
  }

  unsubscribeFromProjects = null;

  get techRef() {
    return firestore.collection('technologies');
  }

  get projectRef() {
    return firestore.collection('projects');
  }

  componentDidMount = async () => {
    const snapshot = await this.techRef.orderBy('name', 'asc').get();

    const technologies = snapshot.docs.map(doc => {
      return {
        id: doc.id,
        ...doc.data()
      }
    });

    this.setState({
      technologies
    })

    this.unsubscribeFromProjects = this.projectRef.onSnapshot(snapshot => {
      const projects = snapshot.docs.map(doc => {
        return {
          id: doc.id,
          ...doc.data()
        }
      })

      this.setState({
        projectList: projects
      })
    });
  }

  componentWillUnmount() {
    this.unsubscribeFromProjects();
  }

  handleSubmit = async event => {
    event.preventDefault();

    const { project, selection } = this.state;

    const projectsRef = firestore.collection('projects');

    try {
      await projectsRef.doc().set({
        project,
        selection
      });
    } catch(error) {
      console.log(error.message)
      // this.setState({
      //   error: error.message
      // })
    }

    this.setState({
      project: '',
      selection: ''
    })
  }

  handleChange = event => {
    const { name, value } = event.target;

    this.setState({
      [name]: value
    })
  }

  render() {
    const { technologies, selection, project, projectList } = this.state;

    return (
      <Row>
        <Col sm="12">
          <h4 className='mb-4'>Technologies</h4>
        </Col>
        <Col sm="12" className='mb-3'>
          <Card>              
            <CardBody>
              <CardTitle className='text-bold'>Test Drop Down Select</CardTitle>
              <Form onSubmit={this.handleSubmit} inline>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Label for="project" className="mr-sm-2">Project Name</Label>
                  <Input type="text" id="project" name="project" value={project} onChange={this.handleChange} />
                </FormGroup>
                <FormGroup className="mb-2 mr-sm-2 mb-sm-0">
                  <Label for="selection" className="mr-sm-2">Technology Used</Label>
                  <Input type="select" id="selection" name="selection" value={selection} onChange={this.handleChange}>
                    <option key='0' value='0'>Make a Selection</option>
                    {technologies.map(tech => {
                      return <option key={tech.id} value={tech.name}>{tech.name}</option>
                    })}
                  </Input>
                </FormGroup>
                <Button color="primary" className="mb-2 mr-sm-2 mb-sm-0">Add Project</Button>
              </Form>
            </CardBody>
          </Card>
        </Col>
        <Col sm="12">
          <hr />
        </Col>
        <Col sm="12">
          <h4 className='mb-4'>Project List</h4>
        </Col>
        <Col sm="12">
          <ListGroup>
            {projectList.map(project => {
              return <ListGroupItem key={project.id}>{project.project} <Badge pill>{project.selection}</Badge></ListGroupItem>
            })}
          </ListGroup>
        </Col>
      </Row>
    )
  }
}

export default Technologies;