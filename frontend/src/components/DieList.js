import React, { useEffect, useState } from 'react'
import DieCard from './DieCard'




const DieList = ({ dice }) => {

  const [list, setList] = useState([])
  // const [filter, setFilter] = useState("all")
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

  return (
    <div>
      <input onChange={(e) => setSearch(e.target.value)} type="text" size="45" placeholder="Search dice by description" />
      <div className="diceGrid">
          {diceList}
      </div>
    </div>
  )
}

export default DieList