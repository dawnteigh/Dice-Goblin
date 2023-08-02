import React, { useContext, useState } from 'react'
import { DiceContext } from "../context/dice";
import Modal from 'react-bootstrap/Modal'

const EditDie = ({ update }) => {

	const { dice, setDice, showDie, setShowDie, formData, setFormData } = useContext(DiceContext)
	const { id, description, image_url, type_of_die } = showDie
	const [show, setShow] = useState(false);

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
				<input type="submit" className="button" value="Submit Changes" />
			</form><br/><br/>
			<button className="button" onClick={handleShow} >Delete</button>
			<Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Dice Goblin says:</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete <b>{description} ({type_of_die})</b> and all statistics tied to it?
				  This action cannot be undone.
        </Modal.Body>
        <Modal.Footer>
          <button className="button" onClick={handleClose}>
            Actually, nevermind
          </button>
          <button className="button" onClick={handleDelete}>
            Yes, delete it
          </button>
        </Modal.Footer>
      </Modal>
		</div>
	)
}

export default EditDie