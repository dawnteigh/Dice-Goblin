import React from 'react'
import DieButton from './DieButton'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const DieShow = ({ die, update }) => {
  const { id, description, image_url, total_rolls, average_roll, values } = die

  const buttons = values.map(v => {
    return (
      <DieButton key={v.id} val={v} dieId={id} update={update} />
    )}
  )

  const rollTotals = values.map(v => {
    return (
      <p key={v.id} ><b>{v.value}</b>: {v.times_rolled}</p>
    )
  })

  return (
    <div>
      <Container fluid>
        <Row>
          <Col>
            <img className="thumbnail" src={image_url} /><br/>
          </Col>
          <Col>
            <b>{description}</b><br/>
            Total Rolls: {total_rolls}<br/>
            Average Roll: {average_roll}<br/>
            <div className="valueGrid">
              {rollTotals}
            </div>    
          </Col>
        </Row>
       </Container>
        <div className="buttonDiv">
          {buttons}
        </div>
    </div>
  )
}

export default DieShow