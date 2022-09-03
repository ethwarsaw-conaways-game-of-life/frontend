// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import '@openzeppelin/contracts/access/Ownable.sol';
import '@openzeppelin/contracts/token/ERC1155/ERC1155.sol';
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/math/SafeMath.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";

// Uncomment this line to use console.log
// import "hardhat/console.sol";

contract GameOfLifeToken is ERC1155, Ownable, ReentrancyGuard {

    using SafeMath for uint256;
    // Contract name
    string public name;
    // Contract symbol
    string public symbol;
    // Contract base uri;
    string private baseTokenURI;
    // Controls tokenId order
    event GameFrame(int [][] _frame);
    // Controls supply of given token Id
    mapping(uint256 => uint256) private tokenSupply;
    // Creator of given token Id, sometimes owner != creator
    mapping(uint256 => address) public creators;
    // Mapping for tokenId to duel results
    mapping(uint256 => string) private dualResult;
    // Track any tokenId for any owner
    // Controls tokenId order
    uint private _currentTokenID = 0;

    constructor (string memory _name, string memory _symbol, string memory _uri) ERC1155(_uri) {
        name = _name;
        symbol = _symbol;
        baseTokenURI = _uri;
    }

    function mint(
        address _to,
        uint256 _quantity,
        string calldata _uri,
        bytes memory _data
    ) public {
        _currentTokenID.add(1);
        _mint(_to, _currentTokenID, _quantity, _data);
        tokenSupply[_currentTokenID] = tokenSupply[_currentTokenID].add(_quantity);
        dualResult[_currentTokenID] = _uri;
    }
}
