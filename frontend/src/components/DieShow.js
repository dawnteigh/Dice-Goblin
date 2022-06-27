import React, { useContext } from 'react'
import { DiceContext } from "../context/dice";
import DieButton from './DieButton'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const DieShow = ({ die, update }) => {
  const { id, description, image_url, total_rolls, average_roll, values } = die
  const { lastValue, setLastValue } = useContext(DiceContext)
  
  const buttons = values.map(v => {
    return (
      <DieButton key={v.id} val={v} dieId={id} update={update} setLastValue={setLastValue} />
    )}
  )

  const rollTotals = values.map(v => {
    return (
      <p key={v.id} ><b>{v.value === 0 ? String(v.value) + "0" : v.value}</b> : {v.times_rolled}</p>
    )
  })

  const statAvg = (values[0].value + values[values.length - 1].value) / 2
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
    const wisdom = `* The statistical average for ${d.type_of_die} is ${statAvg}`
    if (d.type_of_die === "d10") {
      return (
      <p>{wisdom}<br/><br/>** The 0 represents a value of 10</p>
      )
    }
    else if (d.type_of_die === "d%") {
      return (
      <p>{wisdom}<br/><br/>** 00 is treated as the lowest value here because 9 times out of 10, it is</p>
      )
    } else {
      return (
        <p>{wisdom}</p>
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
  }

  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <img className="showImg" src={image_url} /><br/>
          </Col>
          <Col>
            <b>{description}</b><br/>
            Total Rolls: {total_rolls}<br/>
            Average Roll: <span style={{color: avgStyle(die)}}>{average_roll}</span><br/>
            <div className="valueGrid">
              {rollTotals}
            </div>
            <div className='wisdom'>
              {dieWisdom(die)}
            </div>   
          </Col>
        </Row>
       </Container>
        <div className="buttonDiv">
          {buttons}
        </div>
        <button className="button" onClick={handleUndo} disabled={!lastValue}>Undo Last Roll</button>
        <button className="button" onClick={handleReset} disabled={!total_rolls}>Reset All Values</button>
    </div>
  )
}

export default DieShow