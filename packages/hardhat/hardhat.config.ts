import {HardhatUserConfig, task} from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
    solidity: "0.8.9",

    networks: {
        localhost: {
            url: 'ws://localhost:8545',
            chainId: 43112,
        },
        goerli: {
            url: 'https://eth-goerli.g.alchemy.com/v2/WLC9yefwiOgbApMjFD65UGuV_JCmPXJ9',
            chainId: 5,
            accounts: ['33be01b6fe832050d1a13bbd9ca032571fdcf26377dfe51d6a7dc524e18b81e4']
        }
    }

};

export default config;
task("deploy", async (args, hre) => {
    const owner = (await hre.ethers.getSigners())[0];
    const gameOfLife = await hre.ethers.getContractFactory("GameOfLifeToken");
    const contractReceipt = await gameOfLife.connect(owner).deploy("GameOfLife", "GOL", "");
    await contractReceipt.deployed();
    console.log("Contract Address : " + contractReceipt.address);
    console.log("Owner Address : " + owner.address);
})
