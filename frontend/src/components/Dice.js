import React, { useState } from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import DieList from './DieList'
import DieForm from './DieForm'
import DieShow from './DieShow'
import EditDie from './EditDie'

const Dice = () => {

  const [showDie, setShowDie] = useState(null)
  //define callback function to setShowDie here and pass it to DieList
  //showDie gets passed to DieShow
  const handleShowDie = (id) => {
    fetch(`http://localhost:9292/dice/${id}`)
    .then(r => r.json())
    .then(data => setShowDie(data))
  }

  return (
    <div>
        <Container fluid>
          <Row>
            <Col>
            <Accordion defaultActiveKey="0" flush>
              <Accordion.Item eventKey="0">
                <Accordion.Header>Add New Die/Dice</Accordion.Header>
                <Accordion.Body>
                  <DieForm />
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="1">
                <Accordion.Header>Roll Selected Die/Dice</Accordion.Header>
                <Accordion.Body>
                  {showDie ? <DieShow die={showDie} /> : "Select a die to get started!"}
                </Accordion.Body>
              </Accordion.Item>
              <Accordion.Item eventKey="2">
                <Accordion.Header>Edit Selected Die/Dice</Accordion.Header>
                <Accordion.Body>
                {showDie ? <EditDie die={showDie} /> : "Select a die to get started!"}
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            </Col>
            <Col>
              <DieList handleShowDie={handleShowDie} />
            </Col>
          </Row>
        </Container>
    </div>
  )
}

export default Dice