import React from 'react'
import Card from 'react-bootstrap/Card'

const DieCard = ({ die, showDie, handleShowDie }) => {

  const { description, type_of_die, average_roll, image_url, id } = die
  return (
    <Card 
    onClick={(e) => handleShowDie(id)}
    style={ (showDie.id === id) ? {borderWidth: "3px", borderStyle: "solid", borderColor: "#65e6f7"} : null }
    >
      <Card.Img variant="top" src={image_url} alt={description} className="thumbnail"/>
      <Card.Text>
        <b>{description}</b>
        <br/>
        Type: {type_of_die}
        <br/>
        Average: {average_roll}
      </Card.Text>
    </Card>
  )
}

export default DieCard