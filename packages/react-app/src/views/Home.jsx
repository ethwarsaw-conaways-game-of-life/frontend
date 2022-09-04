import { useContractReader } from "eth-hooks";

import { useLocation } from "react-router-dom";
import PurchaseForm from "../containers/forms/purchaseForm";
import React from "react";


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


  return (
    <div>
      <PurchaseForm />
    </div>
  );
}

export default Home;
