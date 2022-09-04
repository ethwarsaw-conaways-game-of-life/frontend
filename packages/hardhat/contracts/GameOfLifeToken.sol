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
    // Player session data
    // sessionId => [player1.address, player2.address]
    mapping(string => address[2]) private playersSessions;
    // Player escrows
    mapping(address => uint256) playersEscrows;

    event PlayerPayment(address _address, uint256 _value, string _sessionId);
    event PlayerSession(address _player1, address _player2);

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
    ) public onlyOwner {
        _currentTokenID = _currentTokenID.add(1);
        _mint(_to, _currentTokenID, _quantity, _data);
        tokenSupply[_currentTokenID] = tokenSupply[_currentTokenID].add(_quantity);
        dualResult[_currentTokenID] = _uri;
    }

    function uri(uint256 _tokenId) public view virtual override returns (string memory) {
        return dualResult[_tokenId];
    }

    function participate(string memory _sessionId) public payable {
        require(playersEscrows[msg.sender] == 0, "Player already paid for the game. You cannot enter multiple times.");
        address[2] memory session = playersSessions[_sessionId];
        if (session[0] == address(0)) {
            playersSessions[_sessionId] = [msg.sender, address(0)];
        } else {
            playersSessions[_sessionId] = [session[0], msg.sender];
        }
        playersEscrows[msg.sender] = msg.value;
        emit PlayerPayment(msg.sender, msg.value, _sessionId);
    }

    function getPlayerSession(string calldata _sessionId) public view onlyOwner returns (address[2] memory){
        return playersSessions[_sessionId];
    }

    function announceWinner(string calldata _sessionId, address _winner, string calldata _uri) external onlyOwner {
        address[2] memory players = playersSessions[_sessionId];
        uint256 prize = playersEscrows[players[0]].add(playersEscrows[players[1]]);
        payable(_winner).transfer(prize);
        playersSessions[_sessionId] = [address(0), address(0)];
        playersEscrows[players[0]] = 0;
        playersEscrows[players[1]] = 0;
        mint(_winner, 1, _uri, "");
    }
}
