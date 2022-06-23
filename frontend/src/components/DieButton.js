import React from 'react'

const DieButton = ({ val }) => {

  const { value, times_rolled } = val
  return (
    <div>
      <button>{value}</button><br/>
      {times_rolled}
    </div>
  )
}

export default DieButton