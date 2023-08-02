import React, { useContext } from 'react'
import { DiceContext } from "../context/dice";
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Accordion from 'react-bootstrap/Accordion'
import DieList from './DieList'
import DieForm from './DieForm'
import DieShow from './DieShow'
import EditDie from './EditDie'

const Dice = () => {
  const { dice, setDice, setLastValue, showDie, setShowDie, setFormData } = useContext(DiceContext)
  
  const { message, defAcc } = dice.length !== 0 ? { message: "Select a die to get started!", defAcc: "1" } : { message: "Your collection is empty, add some dice to get rolling!", defAcc: "0" }

  const handleShowDie = (id) => {
    fetch(`http://localhost:9292/dice/${id}`)
    .then(r => r.json())
    .then(data => {
      setShowDie(data)
      setFormData({
        description: data.description,
        image_url: data.image_url
      })
    })
    .catch(err => alert("Could not complete your request. Make sure the server at http://localhost:9292 is running!"))
    setLastValue(false)
  }

  const handleUpdateDie = (updatedDie) => {
		const updatedDice = dice.map(d => {
			if (d.id === updatedDie.id) {
				return updatedDie;
			} else {
				return d;
			}
		});
    setShowDie(updatedDie)
		setDice(updatedDice);
	}

  return (
    <div>
        <Container fluid>
          <Row>
            <Col>
              <div className='accDiv'>
                <Accordion defaultActiveKey={defAcc} flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Add New Die/Dice</Accordion.Header>
                    <Accordion.Body>
                      <DieForm />
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Roll Selected Die/Dice</Accordion.Header>
                    <Accordion.Body>
                      {showDie ? <DieShow update={handleUpdateDie} /> : message}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Edit Selected Die/Dice</Accordion.Header>
                    <Accordion.Body>
                    {showDie ? <EditDie update={handleUpdateDie} /> : message}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
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