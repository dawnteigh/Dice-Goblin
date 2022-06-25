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
  const totalRolls = (type) => dice.filter(d => d.type_of_die === type).map(d => d.total_rolls).reduce((a, b) => a + b, 0)
  const twenties = dice.filter(d => d.type_of_die === "d20").map(d => d.id)
  const nattyOnes = values.filter(v => twenties.includes(v.die_id)).filter(v => v.value === 1).map(v => v.times_rolled).reduce((a, b) => a + b, 0)
  const nattyTwenties = values.filter(v => twenties.includes(v.die_id)).filter(v => v.value === 20).map(v => v.times_rolled).reduce((a, b) => a + b, 0)
  const craps = dice.filter(d => d.type_of_die === "2d6").map(d => d.id)
  const sevens = values.filter(v => craps.includes(v.die_id)).filter(v => v.value === 7).map(v => v.times_rolled).reduce((a, b) => a + b, 0)
  const sevenPercentage = Math.round(((sevens / totalRolls("2d6")) * 100) * 100) / 100 
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
  const maxValPer = (type) => {
    const eligibleDice = dice.filter(d => d.type_of_die === type && d.total_rolls >= 50)
    if (eligibleDice.length === 0) {
      return "N/A"
    } else {
      const maxValues = eligibleDice.map(d => {
        return [d.description, d.total_rolls, d.values]
        }
      )
      const timesRolledArr = maxValues.map(d => d[2][d[2].length - 1].times_rolled)
      const max = Math.max(...timesRolledArr)
      const maxArr = maxValues.find(arr => arr[2][arr[2].length - 1].times_rolled === max)
      const percentage = Math.round(((max / maxArr[1]) * 100) * 100) / 100 
      const desc = maxArr[0]
      return (
        <p><b>{percentage}%</b><br/><i>{desc}</i></p>
      )
    }
  }
  const minValPer = (type) => {
    const eligibleDice = dice.filter(d => d.type_of_die === type && d.total_rolls >= 50)
    if (eligibleDice.length === 0) {
      return "N/A"
    } else {
      const minValues = eligibleDice.map(d => {
        return [d.description, d.total_rolls, d.values]
        }
      )
      const timesRolledArr = minValues.map(d => d[2][0].times_rolled)
      const min = Math.min(...timesRolledArr)
      const minArr = minValues.find(arr => arr[2][0].times_rolled === min)
      const percentage = Math.round(((min / minArr[1]) * 100) * 100) / 100 
      const desc = minArr[0]
      return (
        <p><b>{percentage}%</b><br/><i>{desc}</i></p>
      )
    }
  }

  return (
    <div className="stats">
      <Table className="topTable" striped bordered hover size="sm" variant="dark">
        <tbody>
          <tr>
            <td>Total Dice</td>
            <td>{dice.length}</td>
          </tr>
          <tr>
            <td>Total Rolls</td>
            <td>{dice.map(d => d.total_rolls).reduce((a, b) => a + b, 0)}</td>
          </tr>
          <tr>
            <td>Total Natural Ones (d20)</td>
            <td>{nattyOnes}</td>
          </tr>
          <tr>
            <td>Total Natural Twenties (d20)</td>
            <td>{nattyTwenties}</td>
          </tr>
          <tr>
            <td>Seven Percentage (2d6)</td>
            <td>{isNaN(sevenPercentage) ? "N/A" : `${sevenPercentage}%`}</td>
          </tr>
          </tbody>
      </Table>
      <Table className="bottomTable" striped bordered hover size="sm" variant="dark">
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
            <td># of Rolls</td>
            <td>{totalRolls("d4")}</td>
            <td>{totalRolls("d6")}</td>
            <td>{totalRolls("d8")}</td>
            <td>{totalRolls("d10")}</td>
            <td>{totalRolls("d%")}</td>
            <td>{totalRolls("d12")}</td>
            <td>{totalRolls("d20")}</td>
            <td>{totalRolls("2d6")}</td>
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
          <tr>
            <td>Maximum Roll Percentage<br/>
            (min. 50 rolls)</td>
            <td>{maxValPer("d4")}</td>
            <td>{maxValPer("d6")}</td>
            <td>{maxValPer("d8")}</td>
            <td>{maxValPer("d10")}</td>
            <td>{maxValPer("d%")}</td>
            <td>{maxValPer("d12")}</td>
            <td>{maxValPer("d20")}</td>
            <td>{maxValPer("2d6")}</td>
          </tr>
          <tr>
            <td>Minimum Roll Percentage<br/>
            (min. 50 rolls)</td>
            <td>{minValPer("d4")}</td>
            <td>{minValPer("d6")}</td>
            <td>{minValPer("d8")}</td>
            <td>{minValPer("d10")}</td>
            <td>{minValPer("d%")}</td>
            <td>{minValPer("d12")}</td>
            <td>{minValPer("d20")}</td>
            <td>{minValPer("2d6")}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default Stats