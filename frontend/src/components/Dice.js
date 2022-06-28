import React, { useContext, useState } from 'react'
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
  const { dice, setDice, setLastValue } = useContext(DiceContext)
  const [showDie, setShowDie] = useState(null)
  
  const handleShowDie = (id) => {
    fetch(`http://localhost:9292/dice/${id}`)
    .then(r => r.json())
    .then(data => setShowDie(data))
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
                <Accordion defaultActiveKey="1" flush>
                  <Accordion.Item eventKey="0">
                    <Accordion.Header>Add New Die/Dice</Accordion.Header>
                    <Accordion.Body>
                      <DieForm />
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="1">
                    <Accordion.Header>Roll Selected Die/Dice</Accordion.Header>
                    <Accordion.Body>
                      {showDie ? <DieShow die={showDie} update={handleUpdateDie} /> : "Select a die to get started!"}
                    </Accordion.Body>
                  </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Edit Selected Die/Dice</Accordion.Header>
                    <Accordion.Body>
                    {showDie ? <EditDie die={showDie} update={handleUpdateDie} setShowDie={setShowDie} /> : "Select a die to get started!"}
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              </div>
            </Col>
            <Col>
              <DieList handleShowDie={handleShowDie} showDie={showDie} />
            </Col>
          </Row>
        </Container>
    </div>
  )
}

export default Dice