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
      const min = Math.max(...timesRolledArr)
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
      <h5>General Stats</h5>
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
      <h5>Stats by Die Type</h5>
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
            <td title="# of d4 in Your Collection">{totalDice("d4")}</td>
            <td title="# of d6 in Your Collection">{totalDice("d6")}</td>
            <td title="# of d8 in Your Collection">{totalDice("d8")}</td>
            <td title="# of d10 in Your Collection">{totalDice("d10")}</td>
            <td title="# of d% in Your Collection">{totalDice("d%")}</td>
            <td title="# of d12 in Your Collection">{totalDice("d12")}</td>
            <td title="# of d20 in Your Collection">{totalDice("d20")}</td>
            <td title="# of 2d6 in Your Collection">{totalDice("2d6")}</td>
          </tr>
          <tr>
            <td># of Rolls</td>
            <td title={`Combined Total Rolls for All d4`}>{totalRolls("d4")}</td>
            <td title={`Combined Total Rolls for All d6`}>{totalRolls("d6")}</td>
            <td title={`Combined Total Rolls for All d8`}>{totalRolls("d8")}</td>
            <td title={`Combined Total Rolls for All d10`}>{totalRolls("d10")}</td>
            <td title={`Combined Total Rolls for All d%`}>{totalRolls("d%")}</td>
            <td title={`Combined Total Rolls for All d12`}>{totalRolls("d12")}</td>
            <td title={`Combined Total Rolls for All d20`}>{totalRolls("d20")}</td>
            <td title={`Combined Total Rolls for All 2d6`}>{totalRolls("2d6")}</td>
          </tr>
          <tr>
            <td>Highest Average<br/>
            (min. 50 rolls)</td>
            <td title={`The d4 with the Highest Average Roll`}>{highestAvg("d4")}</td>
            <td title={`The d6 with the Highest Average Roll`}>{highestAvg("d6")}</td>
            <td title={`The d8 with the Highest Average Roll`}>{highestAvg("d8")}</td>
            <td title={`The d10 with the Highest Average Roll`}>{highestAvg("d10")}</td>
            <td title={`The d% with the Highest Average Roll`}>{highestAvg("d%")}</td>
            <td title={`The d12 with the Highest Average Roll`}>{highestAvg("d12")}</td>
            <td title={`The d20 with the Highest Average Roll`}>{highestAvg("d20")}</td>
            <td title={`The 2d6 with the Highest Average Roll`}>{highestAvg("2d6")}</td>
          </tr>
          <tr>
            <td>Lowest Average<br/>
            (min. 50 rolls)</td>
            <td title={`The d4 with the Lowest Average Roll`}>{lowestAvg("d4")}</td>
            <td title={`The d6 with the Lowest Average Roll`}>{lowestAvg("d6")}</td>
            <td title={`The d8 with the Lowest Average Roll`}>{lowestAvg("d8")}</td>
            <td title={`The d10 with the Lowest Average Roll`}>{lowestAvg("d10")}</td>
            <td title={`The d% with the Lowest Average Roll`}>{lowestAvg("d%")}</td>
            <td title={`The d12 with the Lowest Average Roll`}>{lowestAvg("d12")}</td>
            <td title={`The d20 with the Lowest Average Roll`}>{lowestAvg("d20")}</td>
            <td title={`The 2d6 with the Lowest Average Roll`}>{lowestAvg("2d6")}</td>
          </tr>
          <tr>
            <td>Maximum Roll Percentage<br/>
            (min. 50 rolls)</td>
            <td title={`Highest Percentage of "4" Rolls`}>{maxValPer("d4")}</td>
            <td title={`Highest Percentage of "6" Rolls`}>{maxValPer("d6")}</td>
            <td title={`Highest Percentage of "8" Rolls`}>{maxValPer("d8")}</td>
            <td title={`Highest Percentage of "0" Rolls`}>{maxValPer("d10")}</td>
            <td title={`Highest Percentage of "90" Rolls`}>{maxValPer("d%")}</td>
            <td title={`Highest Percentage of "12" Rolls`}>{maxValPer("d12")}</td>
            <td title={`Highest Percentage of "20" Rolls`}>{maxValPer("d20")}</td>
            <td title={`Highest Percentage of "12" Rolls`}>{maxValPer("2d6")}</td>
          </tr>
          <tr>
            <td>Minimum Roll Percentage<br/>
            (min. 50 rolls)</td>
            <td title={`Highest Percentage of "1" Rolls`}>{minValPer("d4")}</td>
            <td title={`Highest Percentage of "1" Rolls`}>{minValPer("d6")}</td>
            <td title={`Highest Percentage of "1" Rolls`}>{minValPer("d8")}</td>
            <td title={`Highest Percentage of "1" Rolls`}>{minValPer("d10")}</td>
            <td title={`Highest Percentage of "00" Rolls`}>{minValPer("d%")}</td>
            <td title={`Highest Percentage of "1" Rolls`}>{minValPer("d12")}</td>
            <td title={`Highest Percentage of "1" Rolls`}>{minValPer("d20")}</td>
            <td title={`Highest Percentage of "2" Rolls`}>{minValPer("2d6")}</td>
          </tr>
        </tbody>
      </Table>
    </div>
  )
}

export default Stats