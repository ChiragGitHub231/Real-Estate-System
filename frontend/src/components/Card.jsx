import React from 'react'

export default function Card({title, value}) {
  return (
    <div className="bg-white shadow-md rounded-md p-4 w-64">
      <h2 className="text-xl font-semibold mb-4">{title}</h2>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  )
}
