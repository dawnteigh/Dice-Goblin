import React, { useState, useEffect } from 'react';

const DiceContext = React.createContext();

function DiceProvider({ children }) {

	const [dice, setDice] = useState([])
	const [session, setSession] = useState([])
	const [lastValue, setLastValue] = useState(false)
	const [showDie, setShowDie] = useState(null)
	const [formData, setFormData] = useState({
		description: "",
		image_url: ""
	})

	useEffect(() => {
		fetch("http://localhost:9292/dice")
			.then(r => r.json())
			.then(data => setDice(data))
			.catch(err => alert("Could not access database. Make sure the server at http://localhost:9292 is running!"))
	}, [])

	const activeStyle = {
		background: "#65e6f7",
		color: "#110e35",
		boxShadow: "rgba(107, 219, 244, 0.35) 0 -25px 18px -14px inset, rgba(107, 219, 244, 0.35) 0 1px 2px, rgba(107, 219, 244, 0.35) 0 2px 4px, rgba(107, 219, 244, 0.35) 0 4px 8px, rgba(107, 219, 244, 0.35) 0 8px 16px, rgba(107, 219, 244, 0.35) 0 16px 32px"
	}

	return <DiceContext.Provider value={{ activeStyle, dice, setDice, session, setSession, lastValue, setLastValue, showDie, setShowDie, formData, setFormData }}>{children}</DiceContext.Provider>
}

export { DiceContext, DiceProvider } 