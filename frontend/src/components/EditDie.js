import React, { useContext, useState } from 'react'
import { DiceContext } from "../context/dice";

const EditDie = ({ die, setShowDie }) => {

	const { id, description, image_url, type_of_die } = die
	const { dice, setDice } = useContext(DiceContext)
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

	const handleUpdateDie = (updatedDie) => {
		const updatedDice = dice.map(d => {
			if (d.id === updatedDie.id) {
				return updatedDie;
			} else {
				return d;
			}
		});
		setDice(updatedDice);
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
    .then(data => handleUpdateDie(data))
    e.target.reset()
  }

	const handleDelete = (e) => {
		fetch(`http://localhost:9292/dice/${id}`, {
			method: "DELETE",
		})
		.then(r => r.json())
		const updatedDice = dice.filter(d => d.id !== id)
		setDice(updatedDice)
		setShowDie(null)
	}
	

	return (
		<div>
			<p>You are currently editing <b>{description} ({type_of_die})</b></p>
			<form onSubmit={handleSubmit} >
				<input type="text" size="60" name="description" onChange={handleChange} placeholder={description} /><br/>
				<input type="text" size="60" name="image_url" onChange={handleChange} placeholder={image_url} /><br/>
				<input type="submit" value="Submit Changes" />
			</form><br/><br/>
			<button onClick={handleDelete} >Delete</button>
		</div>
	)
}

export default EditDie