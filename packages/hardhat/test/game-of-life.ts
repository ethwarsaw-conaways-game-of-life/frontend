import {GameOfLifeToken} from '../typechain-types';
import {BigNumber, ContractFactory} from 'ethers';
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/src/signers';
import {ethers} from 'hardhat';
import {expect} from 'chai';
import {lastValueFrom, timer} from 'rxjs';

describe("Game Of Life", () => {
    let gameOfLifeToken: GameOfLifeToken;
    let nftFactory: ContractFactory;

    const contractName: string = 'GameOfLifeToken';
    let [owner, user1, user2, user3, user4, user5, user6, user7, user8]: SignerWithAddress[] = [];
    beforeEach("Deploy contract", async () => {
        // @ts-ignore
        [owner, user1, user2, user3, user4, user5, user6, user7, user8] = await ethers.getSigners();

        // Deploy Nft Contract
        nftFactory = await ethers.getContractFactory(contractName);
        gameOfLifeToken = await nftFactory.connect(owner).deploy("Conways game of life", "GOL", "") as GameOfLifeToken;
        await gameOfLifeToken.deployed();
    });

    it("Contract should be deployed", async () => {
        expect(gameOfLifeToken.deployed()).to.exist;
    });

    it("Should mint a token", async () => {

        // Given
        const duelResult = "http://some-duel-result";

        const transferSingleListener = ethers.provider.on("TransferSingle", (id)=>{
           console.log(id);
        });

        const transactionReceipt = await
            (await gameOfLifeToken.connect(owner).mint(user1.address, BigNumber.from(1), duelResult,[0x0])).wait();

        console.log(transactionReceipt.events);

        expect((await gameOfLifeToken.connect(owner).balanceOf(user1.address, BigNumber.from(1))).toNumber()).to.eq(1);
    });

});
