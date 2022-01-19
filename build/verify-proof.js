"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _keccak = _interopRequireDefault(require("keccak256"));

var _ethers = require("ethers");

var _utils = require("./utils");

var _lodash = require("lodash");

var _default = function _default(proof, merkleRoot, tokenId, metadata) {
  var computeHash = _ethers.utils.hexlify((0, _utils.hashOneToken)(tokenId, metadata));

  (0, _lodash.forEach)(proof, function (proItem) {
    var hexProof = _ethers.utils.hexlify(proItem);

    if (computeHash <= hexProof) {
      computeHash = _ethers.utils.hexlify((0, _keccak["default"])(computeHash + hexProof.substring(2)));
    } else {
      computeHash = _ethers.utils.hexlify((0, _keccak["default"])(proItem + computeHash.substring(2)));
    }
  });

  if (_ethers.utils.hexlify(computeHash) != merkleRoot) {
    console.log("Inconstent root: root computed from proofs is " + _ethers.utils.hexlify(computeHash) + ", expected root is " + merkleRoot);
  }

  return _ethers.utils.hexlify(computeHash) == merkleRoot;
};

exports["default"] = _default;