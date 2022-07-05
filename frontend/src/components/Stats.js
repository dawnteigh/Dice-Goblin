import React, { useContext, useEffect, useState } from 'react';
import { DiceContext } from "../context/dice";
import Table from 'react-bootstrap/Table';

const Stats = () => {

  const { dice } = useContext(DiceContext)
  const [stats, setStats] = useState(false)

  useEffect(() => {
    fetch('http://localhost:9292/stats')
    .then(r => r.json())
    .then(data => setStats(data))
    .catch(err => alert("Could not find statistics. Make sure the server at http://localhost:9292 is running!"))
  }, [])

  const { total_dice, total_rolls, total_twenties, total_ones, seven_perc, type_stats } = stats
  
  const totalDice = (type) => dice.filter(d => d.type_of_die === type).length
  const totalRolls = (type) => dice.filter(d => d.type_of_die === type).map(d => d.total_rolls).reduce((a, b) => a + b, 0)

  return (
    <div className="stats">
      {stats ? 
        <>
          <h5>General Stats</h5>
          <Table className="topTable" striped bordered hover size="sm" variant="dark">
            <tbody>
              <tr>
                <td>Total Dice</td>
                <td>{total_dice}</td>
              </tr>
              <tr>
                <td>Total Rolls</td>
                <td>{total_rolls}</td>
              </tr>
              <tr>
                <td>Total Natural Ones (d20)</td>
                <td>{total_ones}</td>
              </tr>
              <tr>
                <td>Total Natural Twenties (d20)</td>
                <td>{total_twenties}</td>
              </tr>
              <tr>
                <td>Seven Percentage (2d6)</td>
                <td>{!seven_perc ? "N/A" : `${seven_perc}%`}</td>
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
                <td title={`The d4 with the Highest Average Roll`}>{type_stats["d4"].max_avg}<br/><i>{type_stats["d4"].max_avg_name}</i></td>
                <td title={`The d6 with the Highest Average Roll`}>{type_stats["d6"].max_avg}<br/><i>{type_stats["d6"].max_avg_name}</i></td>
                <td title={`The d8 with the Highest Average Roll`}>{type_stats["d8"].max_avg}<br/><i>{type_stats["d8"].max_avg_name}</i></td>
                <td title={`The d10 with the Highest Average Roll`}>{type_stats["d10"].max_avg}<br/><i>{type_stats["d10"].max_avg_name}</i></td>
                <td title={`The d% with the Highest Average Roll`}>{type_stats["d%"].max_avg}<br/><i>{type_stats["d%"].max_avg_name}</i></td>
                <td title={`The d12 with the Highest Average Roll`}>{type_stats["d12"].max_avg}<br/><i>{type_stats["d12"].max_avg_name}</i></td>
                <td title={`The d20 with the Highest Average Roll`}>{type_stats["d20"].max_avg}<br/><i>{type_stats["d20"].max_avg_name}</i></td>
                <td title={`The 2d6 with the Highest Average Roll`}>{type_stats["2d6"].max_avg}<br/><i>{type_stats["2d6"].max_avg_name}</i></td>
              </tr>
              <tr>
                <td>Lowest Average<br/>
                (min. 50 rolls)</td>
                <td title={`The d4 with the Lowest Average Roll`}>{type_stats["d4"].min_avg}<br/><i>{type_stats["d4"].min_avg_name}</i></td>
                <td title={`The d6 with the Lowest Average Roll`}>{type_stats["d6"].min_avg}<br/><i>{type_stats["d6"].min_avg_name}</i></td>
                <td title={`The d8 with the Lowest Average Roll`}>{type_stats["d8"].min_avg}<br/><i>{type_stats["d8"].min_avg_name}</i></td>
                <td title={`The d10 with the Lowest Average Roll`}>{type_stats["d10"].min_avg}<br/><i>{type_stats["d10"].min_avg_name}</i></td>
                <td title={`The d% with the Lowest Average Roll`}>{type_stats["d%"].min_avg}<br/><i>{type_stats["d%"].min_avg_name}</i></td>
                <td title={`The d12 with the Lowest Average Roll`}>{type_stats["d12"].min_avg}<br/><i>{type_stats["d12"].min_avg_name}</i></td>
                <td title={`The d20 with the Lowest Average Roll`}>{type_stats["d20"].min_avg}<br/><i>{type_stats["d20"].min_avg_name}</i></td>
                <td title={`The 2d6 with the Lowest Average Roll`}>{type_stats["2d6"].min_avg}<br/><i>{type_stats["2d6"].min_avg_name}</i></td>
              </tr>
              <tr>
                <td>Maximum Roll Percentage<br/>
                (min. 50 rolls)</td>
                <td title={`Highest Percentage of "4" Rolls`}>{type_stats["d4"].max_perc}%<br/><i>{type_stats["d4"].max_perc_name}</i></td>
                <td title={`Highest Percentage of "6" Rolls`}>{type_stats["d6"].max_perc}%<br/><i>{type_stats["d6"].max_perc_name}</i></td>
                <td title={`Highest Percentage of "8" Rolls`}>{type_stats["d8"].max_perc}%<br/><i>{type_stats["d8"].max_perc_name}</i></td>
                <td title={`Highest Percentage of "0" Rolls`}>{type_stats["d10"].max_perc}%<br/><i>{type_stats["d10"].max_perc_name}</i></td>
                <td title={`Highest Percentage of "90" Rolls`}>{type_stats["d%"].max_perc}%<br/><i>{type_stats["d%"].max_perc_name}</i></td>
                <td title={`Highest Percentage of "12" Rolls`}>{type_stats["d12"].max_perc}%<br/><i>{type_stats["d12"].max_perc_name}</i></td>
                <td title={`Highest Percentage of "20" Rolls`}>{type_stats["d20"].max_perc}%<br/><i>{type_stats["d20"].max_perc_name}</i></td>
                <td title={`Highest Percentage of "12" Rolls`}>{type_stats["2d6"].max_perc}%<br/><i>{type_stats["2d6"].max_perc_name}</i></td>
              </tr>
              <tr>
                <td>Minimum Roll Percentage<br/>
                (min. 50 rolls)</td>
                <td title={`Highest Percentage of "1" Rolls`}>{type_stats["d4"].min_perc}%<br/><i>{type_stats["d4"].min_perc_name}</i></td>
                <td title={`Highest Percentage of "1" Rolls`}>{type_stats["d6"].min_perc}%<br/><i>{type_stats["d6"].min_perc_name}</i></td>
                <td title={`Highest Percentage of "1" Rolls`}>{type_stats["d8"].min_perc}%<br/><i>{type_stats["d8"].min_perc_name}</i></td>
                <td title={`Highest Percentage of "1" Rolls`}>{type_stats["d10"].min_perc}%<br/><i>{type_stats["d10"].min_perc_name}</i></td>
                <td title={`Highest Percentage of "00" Rolls`}>{type_stats["d%"].min_perc}%<br/><i>{type_stats["d%"].min_perc_name}</i></td>
                <td title={`Highest Percentage of "1" Rolls`}>{type_stats["d12"].min_perc}%<br/><i>{type_stats["d12"].min_perc_name}</i></td>
                <td title={`Highest Percentage of "1" Rolls`}>{type_stats["d20"].min_perc}%<br/><i>{type_stats["d20"].min_perc_name}</i></td>
                <td title={`Highest Percentage of "2" Rolls`}>{type_stats["2d6"].min_perc}%<br/><i>{type_stats["2d6"].min_perc_name}</i></td>
              </tr>
            </tbody>
          </Table>
        </>
      : <h1>Loading...</h1>
}
    </div>
  )
}

export default Stats