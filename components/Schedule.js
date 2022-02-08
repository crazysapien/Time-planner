import React from "react"
import Card from './Card'

export default function Schedule({ data }) {
  return (
    <div className='max-w-lg mx-auto'>
      {/* mapping the schedule data if data is available */}
      {data && data.map((elem, index) => {
        return (
          <Card key={index} title={elem.title} start={elem.start} end={elem.end} id={elem._id} />
        );
      })}
    </div>
  )
}