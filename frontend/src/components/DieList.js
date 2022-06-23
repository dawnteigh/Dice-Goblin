import React, { useEffect, useState } from 'react'
import DieCard from './DieCard'





const DieList = ({ dice }) => {

  const [list, setList] = useState([])
  const [filter, setFilter] = useState("all")
  const [search, setSearch] = useState("")

  useEffect(()=> {
    setList(dice)
  }, [dice])

  const searchList = list.filter(d => d.description.toLowerCase().includes(search.toLowerCase()))

  const diceList = searchList.map(d => {
    return (
        <DieCard key={d.id} die={d} />
    )
  })

  const handleFilterChange = (e) => {
    if (e.target.value === "all") {
      setList(dice)
    } else {
      const filteredDice = dice.filter(d => d.type_of_die === e.target.value)
      setList(filteredDice)
    }
    setFilter(e.target.value)
  }

  return (
    <div>
      <input onChange={(e) => setSearch(e.target.value)} type="text" size="60" placeholder="Search dice by description" />
      <select onChange={handleFilterChange}>
        <option value="all">All Dice</option>
        <option value="d4">d4</option>
        <option value="d6">d6</option>
        <option value="d8">d8</option>
        <option value="d10">d10</option>
        <option value="d%">d%</option>
        <option value="d12">d12</option>
        <option value="d20">d20</option>
        <option value="2d6">2d6</option>
      </select>
      <div className="diceGrid">
          {diceList}
      </div>
    </div>
  )
}

export default DieList