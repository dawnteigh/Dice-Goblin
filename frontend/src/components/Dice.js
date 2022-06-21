import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import DieList from './DieList'
import DieForm from './DieForm'
import DieShow from './DieShow'

const Dice = ({ dice }) => {

  //const [showDie, setShowDie] = useState({})
  //define callback function to setShowDie here and pass it to DieList
  //showDie gets passed to DieShow

  return (
    <div>
        <DieForm />
        <Container fluid>
          <Row>
            <Col>
              <DieShow />
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