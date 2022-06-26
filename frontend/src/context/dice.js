import React, { useState } from 'react';

const DiceContext = React.createContext();

function DiceProvider({ children }) {
    
    const [dice, setDice] = useState([])
    const [lastValue, setLastValue] = useState(false)

    return <DiceContext.Provider value={{ dice, setDice, lastValue, setLastValue }}>{children}</DiceContext.Provider>
}

export { DiceContext, DiceProvider} 