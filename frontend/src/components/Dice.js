import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import DieList from './DieList'
import DieForm from './DieForm'
import DieShow from './DieShow'

const Dice = ({ dice }) => {

  //const [showDie, setShowDie] = useState({})
  //define callback function to setShowDie here and pass it to DieList
  //showDie gets passed to DieShow

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
                  <DieShow />
                </Accordion.Body>
              </Accordion.Item>
            </Accordion>
            </Col>
            <Col>
              <DieList dice={dice} />
            </Col>
          </Row>
        </Container>
    </div>
  )
}

export default Dice