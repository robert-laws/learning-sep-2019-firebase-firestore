import React from 'react';
import { Row, Col } from 'reactstrap';
import { Card, CardBody } from 'reactstrap';
import { Button } from 'reactstrap';


const Logout = () => {
  return (
    <Row className="mt-2">
      <Col>
        <Card>
          <CardBody>
            <Button onClick={() => auth.signOut()}>
              Logout
            </Button>
          </CardBody>
        </Card>
      </Col>
    </Row>
  )
}

export default Logout;