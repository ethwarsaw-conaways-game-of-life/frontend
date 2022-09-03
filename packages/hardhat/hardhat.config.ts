import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.9",

  networks: {
    localhost: {
      url: 'ws://localhost:8545',
      chainId: 43112,
    }
  }

};

export default config;
