import React, { useContext } from "react"
import scheduleContext from "../context/scheduleContext"

export default function Card({ title, start, end, id }) {

  // accesing delete schedule function from scedule state to be able to delete a particular schedule
  const { deletedata } = useContext(scheduleContext);

  return (
    <>
      <div className="container shadow-lg p-2 rounded-lg my-4 flex items-center justify-between gap-2">
        <div className="flex-1 flex flex-col gap-2">
          <div className="">
            <div className="text-xl font-medium">{title}</div>
            <div className="text-red-500">{new Date(end) < Date.now() ? 'due date passed' : ''}</div>
          </div>
          <div className="text-gray-500">Start : {new Date(start).toDateString()}</div>
          <div className="text-gray-500">End : {new Date(end).toDateString()}</div>
        </div>
        <div onClick={() => { deletedata(id) }} className="bg-green-400 hover:bg-green-500 text-white font-bold py-2 px-4 rounded">done</div>
      </div>
    </>
  )
}