import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import GameOfLife from "../containers/GameOfLife";
import { db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { 
  useLocation,
  useParams, 
} from "react-router-dom";
import React from "react";

import { Link } from "react-router-dom";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function Home({ yourLocalBalance, readContracts }) {
  // you can also use hooks locally in your component of choice
  // in this case, let's keep track of 'purpose' variable from our contract
  const purpose = useContractReader(readContracts, "YourContract", "purpose");
  const location = useLocation();

  const params = useParams();

  console.log(location.pathname, params, 'this')

  const getRoom = async () => {
    const noteSnapshot = await getDoc(doc(db, 'rooms', location.pathname));
    if (noteSnapshot.exists()) {
        console.log(noteSnapshot.data(), 'test')
        return noteSnapshot.data();
    } else {
        console.log("Note doesn't exist");
    }
  };

  if(location.pathname){
    getRoom()
  }

  return (
    <div>
      <GameOfLife />
    </div>
  );
}

export default Home;
