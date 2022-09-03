import React from 'react'
import { useState } from 'react'
import PurchaseForm from './forms/purchaseForm'
import styles from './styles.module.css'

export default function GameOfLife() {

  const [tokensPurchased, setPurchaseStatus] = useState(false)
  const rowCount = 144
  const colCount = 144

  return (
    <div className={styles.gameWrapper}>
      {
        tokensPurchased ?
        'Create a game link'
        :
        <PurchaseForm />
      }
    </div>
  )
}
