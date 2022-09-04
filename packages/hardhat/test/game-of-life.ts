import {GameOfLifeToken} from '../typechain-types';
import {BigNumber, ContractFactory} from 'ethers';
import {SignerWithAddress} from '@nomiclabs/hardhat-ethers/src/signers';
import {ethers} from 'hardhat';
import {expect} from 'chai';

describe("Game Of Life", () => {
    let gameOfLifeToken: GameOfLifeToken;
    let nftFactory: ContractFactory;
    const contractName: string = 'GameOfLifeToken';
    let [owner, player1, player2, player3, player4, player5, player6, player7, player8, player9, player10]: SignerWithAddress[] = [];

    before("Deploy contract", async () => {
        // @ts-ignore
        [owner, player1, player2, player3, player4, player5, player6, player7, player8, player9, player10] = await ethers.getSigners();
        // Deploy Nft Contract
        nftFactory = await ethers.getContractFactory(contractName);
        gameOfLifeToken = await nftFactory.connect(owner).deploy("Conways game of life", "GOL", "") as GameOfLifeToken;
        await gameOfLifeToken.deployed();
    });

    it("Contract should be deployed", async () => {
        expect(gameOfLifeToken.deployed()).to.exist;
    });

    it("Should mint a token", async () => {

        // When
        const transactionReceipt = await
            (await gameOfLifeToken.connect(owner).mint(player1.address, BigNumber.from(1), "", [0x0])).wait();
        // @ts-ignore
        const mintedTokenId: BigNumber = transactionReceipt.events?.filter(e => e.event === 'TransferSingle')[0].args['id'];

        // Then
        expect((await gameOfLifeToken.connect(owner).balanceOf(player1.address, mintedTokenId)).eq(BigNumber.from(1)));
    });

    it("Should mint a token with unique URI", async () => {

        // Given
        const duelResultURI = "ipfs://ej7qwyr8oj3429sdamfiowemr8pu";

        // When
        const transactionReceipt = await
            (await gameOfLifeToken.connect(owner).mint(player1.address, BigNumber.from(1), duelResultURI, [0x0])).wait();
        // @ts-ignore
        const mintedTokenId: BigNumber = transactionReceipt.events?.filter(e => e.event === 'TransferSingle')[0].args['id'];

        // Then
        expect(await gameOfLifeToken.connect(owner).uri(mintedTokenId)).to.eq(duelResultURI);
    });

    it("Should accept escrow from 2 players and store player addresses in playersSessions", async () => {

        // Given
        const gameSessionId = "session123234134";

        // When
        await gameOfLifeToken.connect(player1).participate(gameSessionId, {value: 15});
        await gameOfLifeToken.connect(player2).participate(gameSessionId, {value: 15});
        const playerAddresses = await gameOfLifeToken.connect(owner).getPlayerSession(gameSessionId);
        const player1Balance = await player1.getBalance();
        const player2Balance = await player2.getBalance();

        // Then
        expect(playerAddresses[0]).to.eq(player1.address);
        expect(playerAddresses[1]).to.eq(player2.address);

        expect(player1Balance.lt(ethers.utils.parseEther('9985')));
        expect(player2Balance.lt(ethers.utils.parseEther('9985')));
    });

    it("Should fail if the player tries to enter more than once", async () => {

        // Given
        const gameSessionId = "ewu8923uoiu23e823eoiu";

        // When
        await gameOfLifeToken.connect(player3).participate(gameSessionId, {value: 15});
        await gameOfLifeToken.connect(player4).participate(gameSessionId, {value: 15});

        // Then
        await expect(gameOfLifeToken.connect(player3).participate(gameSessionId, {value: 15}))
            .revertedWith('Player already paid for the game. You cannot enter multiple times.')
    });

    it("Should announce winner and transfer the price", async () => {

        // Given
        const gameSessionId = "yte6e23ej72y3e9y";
        const winnerGIF = "yte6e23ej72y3e9y";

        // When
        await gameOfLifeToken.connect(player5).participate(gameSessionId, {value: ethers.utils.parseEther('15')});
        await gameOfLifeToken.connect(player6).participate(gameSessionId, {value: ethers.utils.parseEther('15')});
        await gameOfLifeToken.connect(owner).announceWinner(gameSessionId, player4.address, winnerGIF);

        const winnerBalance: BigNumber = await player5.getBalance();
        const looserBalance: BigNumber = await player6.getBalance();

        // Then
        expect(winnerBalance.gt(ethers.utils.parseEther('10014')));
        expect(looserBalance.lt(ethers.utils.parseEther('9985')));

    });

    it("Should announce winner, transfer the price and mint a token for winner", async () => {

        // Given
        const gameSessionId = "yte6e23ej72y3e9y";
        const winnerGIF = "ipfs://ej7qwyr8oj3429sdamfiowemr8pu";

        // When
        await gameOfLifeToken.connect(player7).participate(gameSessionId, {value: ethers.utils.parseEther('15')});
        await gameOfLifeToken.connect(player8).participate(gameSessionId, {value: ethers.utils.parseEther('15')});
        const transactionReceipt = await (await gameOfLifeToken.connect(owner).announceWinner(gameSessionId, player7.address, winnerGIF)).wait();

        const winnerBalance: BigNumber = await player7.getBalance();
        const looserBalance: BigNumber = await player8.getBalance();

        // @ts-ignore
        const mintedTokenId: BigNumber = transactionReceipt.events?.filter(e => e.event === 'TransferSingle')[0].args['id'];

        // Then
        expect(winnerBalance.gt(ethers.utils.parseEther('10014')));
        expect(looserBalance.lt(ethers.utils.parseEther('9985')));
        expect((await gameOfLifeToken.connect(owner).balanceOf(player7.address, mintedTokenId)).eq(BigNumber.from(1)));

    });

    it("Should announce winner, transfer the price and mint a token for winner, and reenter competition again", async () => {

        // Given
        let gameSessionId = "yte6e23ej72y3e9y";
        let winnerGIF = "ipfs://ej7qwyr8oj3429sdamfiowemr8pu";

        // When
        await gameOfLifeToken.connect(player9).participate(gameSessionId, {value: ethers.utils.parseEther('15')});
        await gameOfLifeToken.connect(player10).participate(gameSessionId, {value: ethers.utils.parseEther('15')});
        let transactionReceipt = await (await gameOfLifeToken.connect(owner).announceWinner(gameSessionId, player9.address, winnerGIF)).wait();

        let winnerBalance: BigNumber = await player9.getBalance();
        let looserBalance: BigNumber = await player10.getBalance();


        // @ts-ignore
        let mintedTokenId: BigNumber = transactionReceipt.events?.filter(e => e.event === 'TransferSingle')[0].args['id'];

        // Then
        expect(winnerBalance.gt(ethers.utils.parseEther('10014')));
        expect(looserBalance.lt(ethers.utils.parseEther('9985')));
        expect((await gameOfLifeToken.connect(owner).balanceOf(player9.address, mintedTokenId)).eq(BigNumber.from(1)));

        // Given
        gameSessionId = "yte6e23ej72y3e9y";
        winnerGIF = "ipfs://ej7qwyr8234234234234amfiowemr8pu";

        // When
        await gameOfLifeToken.connect(player9).participate(gameSessionId, {value: ethers.utils.parseEther('15')});
        await gameOfLifeToken.connect(player10).participate(gameSessionId, {value: ethers.utils.parseEther('15')});
        transactionReceipt = await (await gameOfLifeToken.connect(owner).announceWinner(gameSessionId, player9.address, winnerGIF)).wait();

        winnerBalance = await player8.getBalance();
        looserBalance = await player9.getBalance();

        // @ts-ignore
        mintedTokenId = transactionReceipt.events?.filter(e => e.event === 'TransferSingle')[0].args['id'];

        // Then
        expect(winnerBalance.gt(ethers.utils.parseEther('10028')));
        expect(looserBalance.lt(ethers.utils.parseEther('9970')));
        expect((await gameOfLifeToken.connect(owner).balanceOf(player9.address, mintedTokenId)).eq(BigNumber.from(1)));

    });

});
