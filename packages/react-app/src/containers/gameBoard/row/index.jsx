import React from 'react'
import { useState, useEffect } from 'react'
import styles from './styles.module.css'

export const plays = []

export default function Row({row}) {

  const cols = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]
  const [moves, setMoves] = useState([])
  
  const handleMakePlay = (value) => {
    if(plays.includes(value)){
      console.log('cannot play, this cell is taken')
      return
    }
    if(plays.length === 15){
      console.log('you have played all your moves')
      return
    }
    plays.push(value)
    console.log(plays)
  }

  return (
    <div className={styles.row}>
      {
        cols.map((col, i) => {
          return <button 
            value={[row, col]}  
            className={styles.btn}
            onClick={(e) => handleMakePlay(e.target.value)}  
          >{i}</button>
        })
      }
    </div>
  )
}
