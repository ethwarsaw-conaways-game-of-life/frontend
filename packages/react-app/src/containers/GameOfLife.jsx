import React from 'react'
import { useState, useEffect } from 'react'
import PurchaseForm from './forms/purchaseForm'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { db } from '../firebase'
import { useLocation } from 'react-router-dom'
import GameBoard from './gameBoard'
import styles from './styles.module.css'

export default function GameOfLife({address}) {

  const [tokensPurchased, setPurchaseStatus] = useState(false)

  const [passcode, setPasscode] = useState('')
  const [secret, setSecret] = useState('')
  const [playerAddress, setAddress] = useState('')

  const location = useLocation();

  const getData = async() => {
    let room = location.pathname.slice(6);
    console.log('here please ', location, room)
    const docRef = doc(db, "rooms", room);
    try {
        const docSnap = await getDoc(docRef);
        console.log(docSnap.data());
        let key = docSnap.data();
        setSecret(key.passcode)
        console.log(secret, 'got the key')
        await setDoc(doc(db, `rooms/${key.name}/players`, address), {player: address});
    } catch(error) {
        console.log(error)
    }
  }

  useEffect(() => {
    if(!address){
      console.log('connect wallet to continue')
      return
    }
    setAddress(address)
    getData()
  }, [passcode])

  return (
    <div className={styles.gameWrapper}>
      {
        passcode === secret && secret !== '' ?
        <>
          <GameBoard />
        </>
        :
        <div>
        <label>Enter Passcode</label>
        <input 
          style={{
            color: 'black'
          }}
          value={passcode}
          onChange={(e) => setPasscode(e.target.value)}
        />
      </div>
      }
    </div>
  )
}
