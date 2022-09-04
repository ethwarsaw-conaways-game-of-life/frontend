import React from 'react'
import { useState, useEffect } from 'react';
import Row from './row';
import styles from './styles.module.css'

export default function GameBoard() {
  const [fundedStatus, setFundedStatus] = useState(true)
  const [player, setPlayer] = useState()

  return (
    <div>
      {
        fundedStatus?
        <Board />
        :
        'You must deposit your funds to play'
      }
    </div>
  )
}

const Board = () => {
  let rows = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
  return (
    <div className={styles.boardWrapper}>
      {
        rows.map((row, i) => {
          return (
            <Row row={row}/>
          )
        })
      }
    </div>
  )
}