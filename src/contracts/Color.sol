// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

contract Color is ERC721Enumerable {
    string[] public colors;
    mapping(string => bool) _colorExists;

    constructor() ERC721("Color", "COLORS") {}

    // TODO: only minter should be able to mint
    // Create a new color given a color name
    function mint(string memory _color) public {
        // Require unique color
        require(!_colorExists[_color]);

        // Add the color
        colors.push(_color);
        uint _id = colors.length - 1;

        // Mint
        _mint(msg.sender, _id);

        // Track it in the mapping
        _colorExists[_color] = true;
    }
}