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

var TOTAL_SUPPLY = 10000;
var STEP = 500;
var WAIT_TIME = 1500; // milisecond

var argv = process.argv;
var MERKLE_ROOT_PUBLIC = argv[2];

function wait(waitTime) {
  return new Promise(function (resolve) {
    return setTimeout(function () {
      resolve();
    }, waitTime);
  });
}

var fetchPart = /*#__PURE__*/function () {
  var _ref = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee(from, to) {
    var fData, data;
    return _regenerator["default"].wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            fData = _.range(from, to, 1).map(function (tokenId) {
              return (0, _utils.fetchData)('http://cjqvfn6rle.execute-api.us-east-2.amazonaws.com/api/kuni-saru', tokenId + 1);
            });
            _context.next = 3;
            return Promise.all(fData);

          case 3:
            data = _context.sent;
            return _context.abrupt("return", data);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));

  return function fetchPart(_x, _x2) {
    return _ref.apply(this, arguments);
  };
}();

var failed = function failed(data) {
  var index = _.findIndex(data, function (item) {
    return item === null;
  });

  if (index >= 0) {
    console.log('Failed: ' + index + '. Abort.');
    process.exit();
  }
};

var mainApi = /*#__PURE__*/function () {
  var _ref2 = (0, _asyncToGenerator2["default"])( /*#__PURE__*/_regenerator["default"].mark(function _callee2() {
    var now, dataRS, data, merkle_root, diff;
    return _regenerator["default"].wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            now = new Date();
            dataRS = [];
            console.log('Download part', 1);
            _context2.next = 5;
            return fetchPart(0, 500);

          case 5:
            data = _context2.sent;
            failed(data);
            dataRS = _.concat(dataRS, data);
            _context2.next = 10;
            return wait(WAIT_TIME);

          case 10:
            console.log('Download part', 2);
            _context2.next = 13;
            return fetchPart(500, 1000);

          case 13:
            data = _context2.sent;
            failed(data);
            dataRS = _.concat(dataRS, data);
            _context2.next = 18;
            return wait(WAIT_TIME);

          case 18:
            console.log('Download part', 3);
            _context2.next = 21;
            return fetchPart(1000, 1500);

          case 21:
            data = _context2.sent;
            failed(data);
            dataRS = _.concat(dataRS, data);
            _context2.next = 26;
            return wait(WAIT_TIME);

          case 26:
            console.log('Download part', 4);
            _context2.next = 29;
            return fetchPart(1500, 2000);

          case 29:
            data = _context2.sent;
            failed(data);
            dataRS = _.concat(dataRS, data);
            _context2.next = 34;
            return wait(WAIT_TIME);

          case 34:
            console.log('Download part', 5);
            _context2.next = 37;
            return fetchPart(2000, 2500);

          case 37:
            data = _context2.sent;
            failed(data);
            dataRS = _.concat(dataRS, data);
            _context2.next = 42;
            return wait(WAIT_TIME);

          case 42:
            console.log('Download part', 6);
            _context2.next = 45;
            return fetchPart(2500, 3000);

          case 45:
            data = _context2.sent;
            failed(data);
            dataRS = _.concat(dataRS, data);
            _context2.next = 50;
            return wait(WAIT_TIME);

          case 50:
            console.log('Download part', 7);
            _context2.next = 53;
            return fetchPart(3000, 3500);

          case 53:
            data = _context2.sent;
            failed(data);
            dataRS = _.concat(dataRS, data);
            _context2.next = 58;
            return wait(WAIT_TIME);

          case 58:
            console.log('Download part', 8);
            _context2.next = 61;
            return fetchPart(3500, 4000);

          case 61:
            data = _context2.sent;
            failed(data);
            dataRS = _.concat(dataRS, data);
            _context2.next = 66;
            return wait(WAIT_TIME);

          case 66:
            console.log('Download part', 9);
            _context2.next = 69;
            return fetchPart(4000, 4500);

          case 69:
            data = _context2.sent;
            failed(data);
            dataRS = _.concat(dataRS, data);
            _context2.next = 74;
            return wait(WAIT_TIME);

          case 74:
            console.log('Download part', 10);
            _context2.next = 77;
            return fetchPart(4500, 5000);

          case 77:
            data = _context2.sent;
            failed(data);
            dataRS = _.concat(dataRS, data);
            _context2.next = 82;
            return wait(WAIT_TIME);

          case 82:
            console.log('Download part', 11);
            _context2.next = 85;
            return fetchPart(5000, 5500);

          case 85:
            data = _context2.sent;
            failed(data);
            dataRS = _.concat(dataRS, data);
            _context2.next = 90;
            return wait(WAIT_TIME);

          case 90:
            console.log('Download part', 12);
            _context2.next = 93;
            return fetchPart(5500, 6000);

          case 93:
            data = _context2.sent;
            failed(data);
            dataRS = _.concat(dataRS, data);
            _context2.next = 98;
            return wait(WAIT_TIME);

          case 98:
            console.log('Download part', 13);
            _context2.next = 101;
            return fetchPart(6000, 6500);

          case 101:
            data = _context2.sent;
            failed(data);
            dataRS = _.concat(dataRS, data);
            _context2.next = 106;
            return wait(WAIT_TIME);

          case 106:
            console.log('Download part', 14);
            _context2.next = 109;
            return fetchPart(6500, 7000);

          case 109:
            data = _context2.sent;
            failed(data);
            dataRS = _.concat(dataRS, data);
            _context2.next = 114;
            return wait(WAIT_TIME);

          case 114:
            console.log('Download part', 15);
            _context2.next = 117;
            return fetchPart(7000, 7500);

          case 117:
            data = _context2.sent;
            failed(data);
            dataRS = _.concat(dataRS, data);
            _context2.next = 122;
            return wait(WAIT_TIME);

          case 122:
            console.log('Download part', 16);
            _context2.next = 125;
            return fetchPart(7500, 8000);

          case 125:
            data = _context2.sent;
            failed(data);
            dataRS = _.concat(dataRS, data);
            _context2.next = 130;
            return wait(WAIT_TIME);

          case 130:
            console.log('Download part', 17);
            _context2.next = 133;
            return fetchPart(8000, 8500);

          case 133:
            data = _context2.sent;
            failed(data);
            dataRS = _.concat(dataRS, data);
            _context2.next = 138;
            return wait(WAIT_TIME);

          case 138:
            console.log('Download part', 18);
            _context2.next = 141;
            return fetchPart(8500, 9000);

          case 141:
            data = _context2.sent;
            failed(data);
            dataRS = _.concat(dataRS, data);
            _context2.next = 146;
            return wait(WAIT_TIME);

          case 146:
            console.log('Download part', 19);
            _context2.next = 149;
            return fetchPart(9000, 9500);

          case 149:
            data = _context2.sent;
            failed(data);
            dataRS = _.concat(dataRS, data);
            _context2.next = 154;
            return wait(WAIT_TIME);

          case 154:
            console.log('Download part', 20);
            _context2.next = 157;
            return fetchPart(9500, 10000);

          case 157:
            data = _context2.sent;
            failed(data);
            dataRS = _.concat(dataRS, data);
            console.log('Download Done', dataRS.length, 'Saru hero.');
            data = (0, _parseData["default"])(dataRS);
            console.log("Merkle Root", data.root);
            console.log("Verify all proofs in the merkle data:");
            merkle_root = MERKLE_ROOT_PUBLIC || data.root;

            _.forEach(data.tokens, function (_ref3) {
              var proof = _ref3.proof,
                  id = _ref3.id,
                  name = _ref3.name,
                  image = _ref3.image,
                  attributes = _ref3.attributes;

              if (!(0, _verifyProof["default"])(proof, merkle_root, id, {
                name: name,
                image: image,
                attributes: attributes
              })) {
                console.log('Failed at id: ' + id + '. Abort.');
                process.exit();
              }
            });

            diff = (new Date().getTime() - now.getTime()) / 1000;
            console.log('All passed successfully.', "".concat(diff, "s"));

          case 168:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));

  return function mainApi() {
    return _ref2.apply(this, arguments);
  };
}();

mainApi();