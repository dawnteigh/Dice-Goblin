import React, { useContext } from 'react'
import Card from 'react-bootstrap/Card'
import { DiceContext } from '../context/dice'

const DieCard = ({ die, showDie, handleShowDie }) => {
  const { session, setSession } = useContext(DiceContext)
  const { description, type_of_die, average_roll, image_url, id } = die
  const selectedStyle = {
    borderWidth: "3px",
    borderStyle: "solid",
    borderColor: "#65e6f7",
    borderRadius: "5px",
    boxShadow: "rgba(107, 219, 244, 0.35) 0 -25px 18px -14px inset, rgba(107, 219, 244, 0.35) 0 1px 2px, rgba(107, 219, 244, 0.35) 0 2px 4px, rgba(107, 219, 244, 0.35) 0 4px 8px, rgba(107, 219, 244, 0.35) 0 8px 16px, rgba(107, 219, 244, 0.35) 0 16px 32px"
  }

  const isInSession = session.includes(id)
  const handleClick = () => {
    if (isInSession) {
      const removed = session.filter(d => d !== id)
      setSession(removed)
    }
    else {
      setSession([...session, id])
    }
  }

  return (
    <Card
      onClick={(e) => handleShowDie(id)}
      style={(showDie && showDie.id === id) ? selectedStyle : null}
    >
      <Card.Img variant="top" src={image_url} alt={description} className="thumbnail" />
      <Card.Text>
        <b>{description}</b>
        <br />
        Type: {type_of_die}
        <br />
        Average: {average_roll}
      </Card.Text>
      <button className="session-btn" onClick={handleClick} title={isInSession ? "Remove from session" : "Add to session"}>{isInSession ? "-" : "+"}</button>
    </Card>
  )
}

export default DieCard