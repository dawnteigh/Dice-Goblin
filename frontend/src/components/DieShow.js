import React, { useContext, useState } from 'react'
import { DiceContext } from "../context/dice";
import DieButton from './DieButton'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Modal from 'react-bootstrap/Modal'

const DieShow = ({ update }) => {
  const { lastValue, setLastValue, showDie } = useContext(DiceContext)
  const { id, description, type_of_die, image_url, total_rolls, average_roll, num_of_values, values } = showDie
  const [show, setShow] = useState(false)
  const [showP, setShowP] = useState(false)

  const buttons = values.map(v => {
    return (
      <DieButton key={v.id} val={v} dieId={id} update={update} setLastValue={setLastValue} />
    )
  }
  )

  const rollTotals = values.map(v => {
    return (
      <p key={v.id} ><span className='values'>{v.value === 0 ? String(v.value) + "0" : v.value}</span>: {v.times_rolled}</p>
    )
  })

  const rollPercentages = values.map(v => {
    let percAvg = Math.round(((1 / num_of_values) * 10) * 100) / 10
    const valAvg = Math.round(((v.times_rolled / total_rolls) * 10) * 100) / 10
    if (type_of_die === "2d6") {
      switch (v.value) {
        case 7:
          percAvg = 16.67
          break;
        case 6 || 8:
          percAvg = 13.89
          break;
        case 5 || 9:
          percAvg = 11.11
          break;
        case 4 || 10:
          percAvg = 8.33
          break;
        case 3 || 11:
          percAvg = 5.56
          break;
        case 2 || 12:
          percAvg = 2.78
          break;
        default:
      }
    }

    const percStyle = (avg) => {
      if (avg === 0 || avg === percAvg) {
        return "white"
      }
      else if (avg > percAvg) {
        return "green"
      }
      else if (avg < percAvg) {
        return "red"
      }
    }

    return (
      <p key={v.id} ><span className='values'>{v.value === 0 ? String(v.value) + "0" : v.value}</span>:
        <span style={{ color: percStyle(valAvg) }}> {total_rolls === 0 ? 0 : valAvg}%</span></p>
    )
  })

  const statAvg = (values[0].value + values[values.length - 1].value) / 2
  const oneRollPerc = Math.round((100 / values.length) * 100) / 100

  const avgStyle = (d) => {
    if (d.total_rolls === 0) {
      return "white"
    }
    else if (d.average_roll > statAvg) {
      return "green"
    }
    else if (d.average_roll < statAvg) {
      return "red"
    }
  }

  const dieWisdom = (d) => {
    const wisdom = `* The statistical average roll for ${d.type_of_die} is ${statAvg}`
    const wisdom2 = `** The percentage to roll any given value is ${oneRollPerc}%`
    if (d.type_of_die === "d10") {
      return (
        <p>{wisdom}<br />{wisdom2}<br />*** The 0 represents a value of 10</p>
      )
    }
    else if (d.type_of_die === "d%") {
      return (
        <p>{wisdom}<br />{wisdom2}<br />*** 00 is treated as the lowest value here because 9 times out of 10, it is</p>
      )
    }
    else if (d.type_of_die === "2d6") {
      return (
        <p>{wisdom}<br />** 2d6 Roll Probabilities are as follows: 7 (16.67%), 6 & 8 (13.89%), 5 & 9 (11.11%), 4 & 10 (8.33%), 3 & 11 (5.56%), 2 & 12 (2.78%)</p>
      )
    } else {
      return (
        <p>{wisdom}<br />{wisdom2}</p>
      )
    }
  }

  const handleUndo = (e) => {
    fetch(`http://localhost:9292/values/${id}/${lastValue.value}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        times_rolled: lastValue.prevTotal
      }),
    })
      .then(r => r.json())
      .then(data => update(data))
      .then(() => setLastValue(false))
      .catch(err => alert("Could not complete your request. Make sure the server at http://localhost:9292 is running!"))
  }

  const handleReset = (e) => {
    fetch(`http://localhost:9292/values/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        times_rolled: 0
      }),
    })
      .then(r => r.json())
      .then(data => update(data))
      .then(() => setLastValue(false))
      .then(() => setShow(false))
      .catch(err => alert("Could not complete your request. Make sure the server at http://localhost:9292 is running!"))
  }

  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <img className="show-img" alt={description} src={image_url} /><br />
          </Col>
          <Col>
            <b>{description}</b><br />
            Total Rolls: {total_rolls}<br />
            Average Roll: <span style={{ color: avgStyle(showDie) }}>{average_roll}</span><br />
            <div className="value-grid" onClick={(e) => setShowP(!showP)}>
              {!showP ? rollTotals : rollPercentages}
            </div>
            <div className='wisdom'>
              {dieWisdom(showDie)}
            </div>
          </Col>
        </Row>
      </Container>
      <div className="button-div">
        {buttons}
      </div>
      <button className="button" onClick={handleUndo} disabled={!lastValue}>Undo Last Roll</button>
      <button className="button" onClick={() => setShow(!show)} disabled={!total_rolls}>Reset All Values</button>
      <Modal show={show} onHide={() => setShow(!show)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Dice Goblin says:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to reset all values associated with <b>{description} ({type_of_die})</b>?
          This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <button className="button" onClick={() => setShow(!show)}>
            Actually, nevermind
          </button>
          <button className="button" onClick={handleReset}>
            Yes, reset them
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default DieShow