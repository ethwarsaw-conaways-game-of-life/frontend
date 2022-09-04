import React from 'react'
import {useState, useEffect} from 'react'

export default function Cell({row, col}) {

  const [cellState, setCellState] = useState('')

  return (
    <button 
      value={[row, col]}
      onClick={(e) => {}}
    >
      {row}
      {col}
    </button>
  )
}
