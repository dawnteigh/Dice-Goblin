import React, { useEffect, useState } from 'react'
import DieCard from './DieCard'




const DieList = ({ dice }) => {

  const [list, setList] = useState([])
  // const [filter, setFilter] = useState("all")
  // const [search, setSearch] = useState("")

  useEffect(()=> {
    setList(dice)
  }, [dice])

  const diceList = list.map(d => {
    return (
        <DieCard key={d.id} die={d} />
    )
  })

  return (
    <div>

      <div className="diceGrid">
          {diceList}
      </div>
    </div>
  )
}

export default DieList