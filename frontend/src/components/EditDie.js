import React, { useContext, useState } from 'react'
import { DiceContext } from "../context/dice";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const EditDie = ({ die, update, setShowDie }) => {

	const { id, description, image_url, type_of_die } = die
	const { dice, setDice } = useContext(DiceContext)
	const [show, setShow] = useState(false);
	const [formData, setFormData] = useState({
    description: description,
    image_url: image_url
  })

	const handleChange = (e) => {
    const key = e.target.name
    const value = e.target.value
    setFormData({
      ...formData,
      [key]: value
    })
  }

	const handleSubmit = (e) => {
    e.preventDefault()
    fetch(`http://localhost:9292/dice/${id}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          description: formData.description,
          image_url: formData.image_url
      }),
  })
    .then(r => r.json())
    .then(data => update(data))
    e.target.reset()
  }

	const handleShow = () => setShow(true)
	const handleClose = () => setShow(false)

	const handleDelete = (e) => {
		fetch(`http://localhost:9292/dice/${id}`, {
			method: "DELETE",
		})
		.then(r => r.json())
		const updatedDice = dice.filter(d => d.id !== id)
		setDice(updatedDice)
		setShowDie(null)
		handleClose()
	}
	

	return (
		<div>
			<p>You are currently editing <b>{description} ({type_of_die})</b></p>
			<form onSubmit={handleSubmit} >
				<input type="text" size="60" name="description" onChange={handleChange} placeholder={description} /><br/>
				<input type="text" size="60" name="image_url" onChange={handleChange} placeholder={image_url} /><br/>
				<input type="submit" value="Submit Changes" />
			</form><br/><br/>
			<Button onClick={handleShow} >Delete</Button>
			<Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Dice Goblin says:</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete <b>{description} ({type_of_die})</b> and all statistics tied to it?
				This action cannot be undone.</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Actually, nevermind
          </Button>
          <Button variant="primary" onClick={handleDelete}>
            Yes, delete it
          </Button>
        </Modal.Footer>
      </Modal>
		</div>
	)
}

export default EditDie