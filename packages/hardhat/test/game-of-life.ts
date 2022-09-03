import {GameOfLifeToken} from '../typechain-types';
import {BigNumber, ContractFactory} from 'ethers';
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/src/signers';
import {ethers} from 'hardhat';
import {expect} from 'chai';

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

        const transactionReceipt = await
            (await gameOfLifeToken.connect(owner).mint(user1.address, BigNumber.from(1), "", [0x0])).wait();

        // @ts-ignore
        const mintedTokenId: BigNumber = transactionReceipt.events?.filter(e => e.event === 'TransferSingle')[0].args['id'];

        expect((await gameOfLifeToken.connect(owner).balanceOf(user1.address, BigNumber.from(1))).toNumber()).to.eq(mintedTokenId.toNumber());
    });

    it("Should mint a token with unique URI", async () => {

        const duelResultURI = "ipfs://ej7qwyr8oj3429sdamfiowemr8pu";

        const transactionReceipt = await
            (await gameOfLifeToken.connect(owner).mint(user1.address, BigNumber.from(1), duelResultURI, [0x0])).wait();

        // @ts-ignore
        const mintedTokenId: BigNumber = transactionReceipt.events?.filter(e => e.event === 'TransferSingle')[0].args['id'];

        expect(await gameOfLifeToken.connect(owner).uri(mintedTokenId)).to.eq(duelResultURI);
    });

});
