import React from 'react'
import { useState } from 'react'
import PurchaseForm from './forms/purchaseForm'
import GameBoard from './gameBoard'
import styles from './styles.module.css'

export default function GameOfLife() {

  const [tokensPurchased, setPurchaseStatus] = useState(false)

  return (
    <div className={styles.gameWrapper}>
      {
        tokensPurchased ?
        'Create a game link'
        :
        <>
          <GameBoard />
        </>
      }
    </div>
  )
}
