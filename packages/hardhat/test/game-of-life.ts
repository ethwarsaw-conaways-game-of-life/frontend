import {GameOfLife} from '../typechain-types';
import {ContractFactory} from 'ethers';
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/src/signers';
import {ethers} from 'hardhat';
import {expect} from 'chai';

describe("Game Of Life", () => {
    let gameOfLife: GameOfLife;
    let nftFactory: ContractFactory;

    const contractName: string = 'GameOfLife';
    let [owner, user1, user2, user3, user4, user5, user6, user7, user8]: SignerWithAddress[] = [];
    beforeEach("Deploy contract", async () => {
        // @ts-ignore
        [owner, user1, user2, user3, user4, user5, user6, user7, user8] = await ethers.getSigners();

        // Deploy Nft Contract
        nftFactory = await ethers.getContractFactory(contractName);
        gameOfLife = await nftFactory.connect(owner).deploy() as GameOfLife;
        await gameOfLife.deployed();
    });

    it("Contract should be deployed", async () => {
        expect(gameOfLife.deployed()).to.exist;
    });

});
