import React from 'react'
import DieButton from './DieButton'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

const DieShow = ({ die }) => {
  const { id, description, image_url, total_rolls, average_roll, values } = die

  const buttons = values.map(v => {
    return (
      <DieButton key={v.id} val={v} />
    )}
  )

  const rollTotals = values.map(v => {
    return (
      <p><b>{v.value}</b>: {v.times_rolled}</p>
    )
  })

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