import React, { useContext, useEffect, useState } from 'react';
import { DiceContext } from "../context/dice";
import Table from 'react-bootstrap/Table';


const Stats = () => {

  const { dice } = useContext(DiceContext)
  const [values, setValues] = useState([])

  useEffect(() => {
    fetch('http://localhost:9292/values')
    .then(r => r.json())
    .then(data => setValues(data))
  }, [])

  const totalDice = (type) => dice.filter(d => d.type_of_die === type).length
  const highestAvg = (type) => {
    const eligibleDice = dice.filter(d => d.type_of_die === type && d.total_rolls >= 50)
    const averages = eligibleDice.map(d => d.average_roll)
    const max = Math.max(...averages)
    if (max === -Infinity) {
      return "N/A"
    }
    const desc = dice.find(d => d.average_roll === max).description
    return (
      <p><b>{max}</b><br/><i>{desc}</i></p>
      )
  }

  const lowestAvg = (type) => {
    const eligibleDice = dice.filter(d => d.type_of_die === type && d.total_rolls >= 50)
    const averages = eligibleDice.map(d => d.average_roll)
    const min = Math.min(...averages)
    if (min === Infinity) {
      return "N/A"
    }
    const desc = dice.find(d => d.average_roll === min).description
    return (
      <p><b>{min}</b><br/><i>{desc}</i></p>
      )
  }

  return (
    <div>
      <Table striped bordered hover variant="dark">
  <thead>
    <tr>
      <th>Stat</th>
      <th>d4</th>
      <th>d6</th>
      <th>d8</th>
      <th>d10</th>
      <th>d%</th>
      <th>d12</th>
      <th>d20</th>
      <th>2d6</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td># of Dice</td>
      <td>{totalDice("d4")}</td>
      <td>{totalDice("d6")}</td>
      <td>{totalDice("d8")}</td>
      <td>{totalDice("d10")}</td>
      <td>{totalDice("d%")}</td>
      <td>{totalDice("d12")}</td>
      <td>{totalDice("d20")}</td>
      <td>{totalDice("2d6")}</td>
    </tr>
    <tr>
      <td>Highest Average<br/>
      (min. 50 rolls)</td>
      <td>{highestAvg("d4")}</td>
      <td>{highestAvg("d6")}</td>
      <td>{highestAvg("d8")}</td>
      <td>{highestAvg("d10")}</td>
      <td>{highestAvg("d%")}</td>
      <td>{highestAvg("d12")}</td>
      <td>{highestAvg("d20")}</td>
      <td>{highestAvg("2d6")}</td>
    </tr>
    <tr>
      <td>Lowest Average<br/>
      (min. 50 rolls)</td>
      <td>{lowestAvg("d4")}</td>
      <td>{lowestAvg("d6")}</td>
      <td>{lowestAvg("d8")}</td>
      <td>{lowestAvg("d10")}</td>
      <td>{lowestAvg("d%")}</td>
      <td>{lowestAvg("d12")}</td>
      <td>{lowestAvg("d20")}</td>
      <td>{lowestAvg("2d6")}</td>
    </tr>
  </tbody>
</Table>
    </div>
  )
}

export default Stats