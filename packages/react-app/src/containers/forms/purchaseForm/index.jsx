import React from 'react'
import { useState } from 'react'
import { doc, addDoc, collection } from "firebase/firestore"; 

import { db } from "../../../firebase";

export default function PurchaseForm() {

  const [roomName, setRoomName] = useState('')
  

  const depositBet = () => {
    console.log('purchased')
  }

  const createRoom = async (roomName) => {
    await addDoc(collection(db, 'rooms'), {name: roomName});
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2em'
      }}
    >
      <h3>Create a name for the room and deposit your 15 DAI bet to create a game room</h3>
      <label>Room Name</label>
      <input 
        style={{width: '30%', marginTop: '1em', color: 'black'}} 
        type="text" 
        value={roomName}  
        onChange={(e) => {setRoomName(e.target.value)}}
      />
      <button onClick={() => createRoom(roomName)} style={{width: '30%', backgroundColor: 'blue', marginTop: '1em'}}>Deposit DAI</button>
    </div>
  )
}
