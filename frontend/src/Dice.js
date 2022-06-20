import React from 'react'
import DieList from './DieList'
import DieForm from './DieForm'
import DieShow from './DieShow'

const Dice = () => {
  return (
    <div>
        <DieForm />
        <DieList />
        <DieShow />
    </div>
  )
}

export default Dice