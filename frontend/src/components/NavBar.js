import React, { useContext } from 'react'
import { NavLink } from "react-router-dom";
import { DiceContext } from '../context/dice';

const NavBar = () => {

  const { activeStyle } = useContext(DiceContext)

  return (
    <div className="nav-bar">
      <NavLink
        to="/"
        exact
        className="nav-tab"
        activeStyle={activeStyle}
      >
        Home
      </NavLink>
      <NavLink
        to="/dice"
        exact
        className="nav-tab"
        activeStyle={activeStyle}
      >
        Dice
      </NavLink>
      <NavLink
        to="/stats"
        exact
        className="nav-tab"
        activeStyle={activeStyle}
      >
        Stats
      </NavLink>
    </div>
  )
}

export default NavBar