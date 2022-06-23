import React from 'react'

const DieButton = ({ val, dieId, update }) => {
  const { value, times_rolled } = val


  const handleClick = (e) => {
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
      <button onClick={handleClick }>{value}</button>
  )
}

export default DieButton