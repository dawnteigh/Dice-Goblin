import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DieList from './DieList'
import DieForm from './DieForm'
import DieShow from './DieShow'

const Dice = () => {
  return (
    <div>
        <DieForm />
        <Container fluid>
          <Row>
            <Col>
              <DieShow />
            </Col>
            <Col>
              <DieList />
            </Col>
          </Row>
        </Container>
    </div>
  )
}

export default Dice