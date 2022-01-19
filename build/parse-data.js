"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _merkletreejs = require("merkletreejs");

var _keccak = _interopRequireDefault(require("keccak256"));

var _utils = _interopRequireDefault(require("./utils"));

var _lodash = require("lodash");

var _default = function _default(data) {
  data = (0, _lodash.sortBy)(data, 'id');
  var leaves = (0, _lodash.map)(data, function (token) {
    return _utils["default"].hashOneToken(token.id, token);
  });
  var tree = new _merkletreejs.MerkleTree(leaves, _keccak["default"], {
    sort: true
  });
  var tokenWithProof = (0, _lodash.map)(data, function (item, index) {
    item.proof = tree.getHexProof(leaves[index]);
    return item;
  });
  return {
    tokens: tokenWithProof,
    root: tree.getHexRoot()
  };
};

exports["default"] = _default;