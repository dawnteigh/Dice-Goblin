import React from 'react'
import DieButton from './DieButton'

const DieShow = ({ die }) => {
  const { id, description, image_url, total_rolls, average_roll, values } = die

  const buttons = values.map(v => {
    return (
      <DieButton key={v.id} val={v} />
    )}
  )

  return (
    <div>
       <img className="showImg" src={image_url} /><br/>
       <b>{description}</b><br/>
       Total Rolls: {total_rolls}<br/>
       Average Roll: {average_roll}
       <div className="buttonGrid" >
        {buttons}
       </div>
    </div>
  )
}

export default DieShow