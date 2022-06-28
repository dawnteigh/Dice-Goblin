import React from 'react'
import Card from 'react-bootstrap/Card'

const DieCard = ({ die, showDie, handleShowDie }) => {

  const { description, type_of_die, average_roll, image_url, id } = die
  const selectedStyle = { borderWidth: "3px", borderStyle: "solid", borderColor: "#65e6f7", borderRadius: "5px", boxShadow: "rgba(107, 219, 244, 0.35) 0 -25px 18px -14px inset, rgba(107, 219, 244, 0.35) 0 1px 2px, rgba(107, 219, 244, 0.35) 0 2px 4px, rgba(107, 219, 244, 0.35) 0 4px 8px, rgba(107, 219, 244, 0.35) 0 8px 16px, rgba(107, 219, 244, 0.35) 0 16px 32px" }

  return (
    <Card 
    onClick={(e) => handleShowDie(id)}
    style={ (showDie && showDie.id === id) ? selectedStyle : null }
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