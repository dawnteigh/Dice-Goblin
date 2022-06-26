import React, { useContext, useState } from 'react'
import { DiceContext } from "../context/dice";
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'

const DieForm = () => {

  const { dice, setDice } = useContext(DiceContext)
  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("")
  const [formData, setFormData] = useState({
    description: "",
    type_of_die: "",
    image_url: "https://mario.wiki.gallery/images/thumb/4/48/Question_Block_Artwork_-_Super_Mario_3D_World.png/1600px-Question_Block_Artwork_-_Super_Mario_3D_World.png"
  })

  const handleShow = () => setShow(true)
	const handleClose = () => setShow(false)

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
    if (formData.description === "") {
      setMessage("You need to add a name or description first!")
      handleShow()
    }
    else if (formData.type_of_die === "") {
      setMessage("Please select the type of die you are adding.")
      handleShow()
    } else {
      fetch("http://localhost:9292/dice", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            description: formData.description,
            type_of_die: formData.type_of_die,
            image_url: formData.image_url
        }),
    })
      .then(r => r.json())
      .then(data => setDice([...dice, data]))
      .then(() => setFormData({
        ...formData,
        description: "",
        type_of_die: "",
      }))
      e.target.reset()
    }
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" size="60" name="description" onChange={handleChange} placeholder="Name or short description of your die/dice" /><br/>
        <input type="text" size="60" name="image_url" onChange={handleChange} placeholder="Image URL (optional)" /><br/>
        {/* Would like to put a photo upload widget in here someday */}
        <select name="type_of_die" onChange={handleChange}>
          <option value="">Select Type</option>
          <option value="d4">d4</option>
          <option value="d6">d6</option>
          <option value="d8">d8</option>
          <option value="d10">d10</option>
          <option value="d%">d%</option>
          <option value="d12">d12</option>
          <option value="d20">d20</option>
          <option value="2d6">2d6</option>
        </select><br/>
        <input className="button" type="submit" value="Add" />
        <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Dice Goblin says:</Modal.Title>
        </Modal.Header>
        <Modal.Body>{message}</Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleClose}>
            Okay, sorry
          </Button>
        </Modal.Footer>
      </Modal>
      </form>

    </div>
  )
}

export default DieForm