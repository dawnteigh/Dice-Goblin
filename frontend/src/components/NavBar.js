import React, { useContext } from 'react'
import { NavLink } from "react-router-dom";
import { DiceContext } from '../context/dice';

const NavBar = () => {

  const { activeStyle } = useContext(DiceContext)

  return (
    <div className="navBar">
      <NavLink
        to="/"
        exact
        className="navTab"
        activeStyle={activeStyle}
      >
        Home
      </NavLink>
      <NavLink
        to="/dice"
        exact
        className="navTab"
        activeStyle={activeStyle}
      >
        Dice
      </NavLink>
      <NavLink
        to="/stats"
        exact
        className="navTab"
        activeStyle={activeStyle}
      >
        Stats
      </NavLink>
    </div>
  )
}

export default NavBar