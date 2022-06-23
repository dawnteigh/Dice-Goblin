import React, { useState } from 'react';

const DiceContext = React.createContext();

function DiceProvider({ children }) {
    
    const [dice, setDice] = useState([])

    return <DiceContext.Provider value={{ dice, setDice }}>{children}</DiceContext.Provider>
}

export { DiceContext, DiceProvider} 