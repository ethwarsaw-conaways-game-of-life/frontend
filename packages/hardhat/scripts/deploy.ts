import { ethers } from "hardhat";
//TODO: add If you want to verify on https://tenderly.co/
async function main() {
  const owner = (await ethers.getSigners())[0];
  const gameOfLife = await ethers.getContractFactory("GameOfLifeToken");
  const contractReceipt = await gameOfLife.connect(owner).deploy("GameOfLife", "GOL", "");
  await contractReceipt.deployed();
  console.log("Contract Address : " +contractReceipt.address);
  console.log("Owner Address : " +(await ethers.getSigners())[0].address);
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
