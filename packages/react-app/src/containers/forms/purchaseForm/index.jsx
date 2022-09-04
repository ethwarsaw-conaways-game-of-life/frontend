import React from 'react'
import { doc, addDoc, collection, setDoc} from "firebase/firestore"; 
import { db } from "../../../firebase";
import { useState } from 'react'
import { doc, addDoc, collection, setDoc} from "firebase/firestore"; 

import { db } from "../../../firebase";

export default function PurchaseForm() {

  const [roomName, setRoomName] = useState('')

  const [passcode, setPasscode] = useState('')


  const createRoom = async (roomName) => {
    if(!passcode){return}
    await setDoc(doc(db, 'rooms', roomName), {name: roomName, passcode: passcode});
  };

  const createRoom = async (roomName) => {
    await addDoc(collection(db, 'rooms'), {name: roomName});
  };

  const createRoom2 = async (roomName) => {
    await setDoc(doc(db, 'rooms', roomName), {name: roomName});
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
      <label>Passcode</label>
      <input 
        style={{width: '30%', marginTop: '1em', color: 'black'}} 
        type="text" 
        value={passcode}  
        onChange={(e) => {setPasscode(e.target.value)}}
      />
      <label>Room Name</label>
      <input 
        style={{width: '30%', marginTop: '1em', color: 'black'}} 
        type="text" 
        value={roomName}  
        onChange={(e) => {setRoomName(e.target.value)}}
      />

      <button onClick={() => createRoom(roomName)} 
      style={{width: '30%', backgroundColor: 'blue', marginTop: '1em'}}
      >
        Deposit DAI
      </button>

    </div>
  )
}
