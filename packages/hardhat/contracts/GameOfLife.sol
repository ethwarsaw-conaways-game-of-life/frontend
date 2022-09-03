// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract GameOfLife is ReentrancyGuard {

    event GameFrame(int [][] _frame);

    constructor() {
    }

    function start(int[][] calldata _player1, int[][] calldata _player2) public nonReentrant {

    }
}
