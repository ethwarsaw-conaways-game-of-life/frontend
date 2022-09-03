import { useContractReader } from "eth-hooks";
import { ethers } from "ethers";
import GameOfLife from "../containers/GameOfLife";
import { useParams } from "react-router-dom";
import React from "react";
import { Link } from "react-router-dom";

/**
 * web3 props can be passed from '../App.jsx' into your local view component for use
 * @param {*} yourLocalBalance balance on current network
 * @param {*} readContracts contracts from current chain already pre-loaded using ethers contract module. More here https://docs.ethers.io/v5/api/contract/contract/
 * @returns react component
 **/
function Game({ yourLocalBalance, readContracts }) {
  // you can also use hooks locally in your component of choice
  // in this case, let's keep track of 'purpose' variable from our contract
  const purpose = useContractReader(readContracts, "YourContract", "purpose");
  const {id} = useParams();

  console.log('here please ', id)

  return (
    <div>
      <GameOfLife />
    </div>
  );
}

export default Game;
