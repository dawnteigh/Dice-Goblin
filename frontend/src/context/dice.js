import React, { useState, useEffect } from 'react';

const DiceContext = React.createContext();

function DiceProvider({ children }) {

	const [dice, setDice] = useState([])
	const [lastValue, setLastValue] = useState(false)

	useEffect(() => {
		fetch("http://localhost:9292/dice")
			.then(r => r.json())
			.then(data => setDice(data))
			.catch(err => alert("Could not access database. Make sure the server at http://localhost:9292 is running!"))
	}, [])

	return <DiceContext.Provider value={{ dice, setDice, lastValue, setLastValue }}>{children}</DiceContext.Provider>
}

export { DiceContext, DiceProvider } 