"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _typeof = require("@babel/runtime/helpers/typeof");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _path = _interopRequireDefault(require("path"));

var _fs = _interopRequireDefault(require("fs"));

var _ = _interopRequireWildcard(require("lodash"));

var _utils = require("./utils");

var _parseData = _interopRequireDefault(require("./parse-data"));

var _verifyProof = _interopRequireDefault(require("./verify-proof"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

var TOTAL_SUPPLY = 50;
var argv = process.argv;
var filename = argv[2]; // Read data from file

var MERKLE_ROOT_PUBLIC = argv[3];
if (!MERKLE_ROOT_PUBLIC) MERKLE_ROOT_PUBLIC = argv[2];

var mainFile = function mainFile() {
  var data = _fs["default"].readFileSync(_path["default"].join(__dirname, '../', filename), {
    encoding: 'utf-8'
  });

  data = JSON.parse(data);
  data = (0, _parseData["default"])(data);
  console.log("Merkle Root", data.root);
  console.log('All passed successfully.');
};

var mainApi = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee() {
    var fData, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fData = _.range(0, TOTAL_SUPPLY, 1).map(function (tokenId) {
              return (0, _utils.fetchData)('https://cjqvfn6rle.execute-api.us-east-2.amazonaws.com/api/saru', tokenId + 1);
            });
            _context.next = 3;
            return Promise.all(fData);

          case 3:
            data = _context.sent;
            data = (0, _parseData["default"])(data);
            console.log("Merkle Root", data.root);
            console.log("Verify all proofs in the merkle data:");

            _.forEach(data.tokens, function (_ref2) {
              var proof = _ref2.proof,
                  id = _ref2.id,
                  name = _ref2.name,
                  image = _ref2.image,
                  attributes = _ref2.attributes;

              if (!(0, _verifyProof["default"])(proof, MERKLE_ROOT_PUBLIC, id, {
                name: name,
                image: image,
                attributes: attributes
              })) {
                console.log('Failed at id: ' + id + '. Abort.');
                process.exit();
              }
            });

            console.log('All passed successfully.');

          case 9:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function mainApi() {
    return _ref.apply(this, arguments);
  };
}();

mainApi();