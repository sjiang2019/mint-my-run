// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract MintMyRun is ERC721, ReentrancyGuard, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;

    Counters.Counter private _tokenIdCounter;

    constructor() ERC721("MintMyRun", "MMR") {}

    uint256 public constant PRICE = 5000000000000000;

    function mint(string[] memory uris) public payable nonReentrant {
      require(saleIsActive, "Sale not active");

      require(msg.value >= PRICE * uris.length, "Insufficient payment, 0.005 ETH per item");

      for (uint256 i = 0; i < uris.length; i++) {
        uint256 tokenId = totalSupply();
        _safeMint(_msgSender(), tokenId);
        _setTokenURI(tokenId, uris[i]);
        _tokenIdCounter.increment();
      }
    }

    function totalSupply() public view returns (uint256) {
      return _tokenIdCounter.current();
    }

    bool public saleIsActive = false;

    function setSaleIsActive(bool saleIsActive_) external onlyOwner {
      saleIsActive = saleIsActive_;
    }

    function withdraw() public nonReentrant {
      uint256 balance = address(this).balance;

      Address.sendValue(payable(owner()), balance);
    }

    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }
}
