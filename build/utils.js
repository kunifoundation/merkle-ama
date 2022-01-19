"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.normalizeOneToken = exports.hashOneToken = exports.fetchData = exports["default"] = void 0;

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _defineProperty2 = _interopRequireDefault(require("@babel/runtime/helpers/defineProperty"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _lodash = require("lodash");

var _ethers = require("ethers");

var _axios = _interopRequireDefault(require("axios"));

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { (0, _defineProperty2["default"])(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

var keccak256 = _ethers.utils.keccak256,
    defaultAbiCoder = _ethers.utils.defaultAbiCoder;

var normalizeOneToken = function normalizeOneToken(tokenId, _ref) {
  var attributes = _ref.attributes,
      image = _ref.image,
      name = _ref.name;
  var sortedAttrs = (0, _lodash.sortBy)(attributes, 'trait_type');
  return {
    id: _ethers.BigNumber.from(tokenId),
    attrNames: (0, _lodash.map)(sortedAttrs, function (_ref2) {
      var trait_type = _ref2.trait_type;
      return trait_type;
    }),
    attrValues: (0, _lodash.map)(sortedAttrs, function (_ref3) {
      var value = _ref3.value;
      return value;
    }),
    imgMD5: image,
    name: name
  };
};

exports.normalizeOneToken = normalizeOneToken;

var hashOneToken = function hashOneToken(tokenId, token) {
  var _normalizeOneToken = normalizeOneToken(tokenId, token),
      id = _normalizeOneToken.id,
      attrNames = _normalizeOneToken.attrNames,
      attrValues = _normalizeOneToken.attrValues,
      imgMD5 = _normalizeOneToken.imgMD5,
      name = _normalizeOneToken.name;

  return keccak256(defaultAbiCoder.encode(['uint256', 'string[]', 'string[]', 'string', 'string'], [id, attrNames, attrValues, imgMD5, name]));
};

exports.hashOneToken = hashOneToken;

var fetchData = /*#__PURE__*/function () {
  var _ref4 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(url, tokenId) {
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt("return", new Promise(function (resolve, reject) {
              _axios["default"].get("".concat(url, "/").concat(tokenId)).then(function (_ref5) {
                var data = _ref5.data;
                return resolve(_objectSpread(_objectSpread({}, data), {}, {
                  id: tokenId
                }));
              })["catch"](function (err) {
                return reject(err);
              });
            }));

          case 1:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchData(_x, _x2) {
    return _ref4.apply(this, arguments);
  };
}();

exports.fetchData = fetchData;
var _default = {
  normalizeOneToken: normalizeOneToken,
  hashOneToken: hashOneToken,
  fetchData: fetchData
};
exports["default"] = _default;