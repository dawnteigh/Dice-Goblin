import React from 'react'
import { NavLink } from "react-router-dom";


const NavBar = () => {

  const active = { background: "#65e6f7",
  boxShadow: "rgba(107, 219, 244, 0.35) 0 -25px 18px -14px inset, rgba(107, 219, 244, 0.35) 0 1px 2px, rgba(107, 219, 244, 0.35) 0 2px 4px, rgba(107, 219, 244, 0.35) 0 4px 8px, rgba(107, 219, 244, 0.35) 0 8px 16px, rgba(107, 219, 244, 0.35) 0 16px 32px" }
  

  return (
    <div className="navBar">
      <NavLink
        to="/"
        exact
        className="navTab"
        activeStyle={active}
      >
        Home
      </NavLink>
      <NavLink
        to="/dice"
        exact
        className="navTab"
        activeStyle={active}
      >
        Dice
      </NavLink>
      <NavLink
        to="/stats"
        exact
        className="navTab"
        activeStyle={active}
      >
        Stats
      </NavLink>
    </div>
  )
}

export default NavBar