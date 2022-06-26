import React from 'react'

const DieButton = ({ val, dieId, update, setLastValue }) => {
  const { value, times_rolled } = val


  const handleClick = (e) => {
    setLastValue({
      value: value,
      prevTotal: times_rolled
    })
    fetch(`http://localhost:9292/values/${dieId}/${value}`, {
      method: "PATCH",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify({
          times_rolled: times_rolled + 1
      }),
  })
    .then(r => r.json())
    .then(data => update(data))
  }

  return (
      <button className="button" onClick={handleClick }>{value === 0 ? String(value) + "0" : value}</button>
  )
}

export default DieButton