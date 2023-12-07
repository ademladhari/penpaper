"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetCharacterDetails = GetCharacterDetails;
exports.GetWeaponsData = GetWeaponsData;
exports.GetInventoryData = GetInventoryData;
exports.GetSpiritsData = GetSpiritsData;

var _firestore = require("firebase/firestore");

var _FireBase = require("./FireBase");

function GetCharacterDetails(_ref) {
  var user, collection, group, characterRef, characterSnap, characterData;
  return regeneratorRuntime.async(function GetCharacterDetails$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          user = _ref.user, collection = _ref.collection, group = _ref.group;
          _context.prev = 1;
          characterRef = (0, _firestore.doc)(_FireBase.db, 'database', 'groups', group, user, "character", collection);
          _context.next = 5;
          return regeneratorRuntime.awrap((0, _firestore.getDoc)(characterRef));

        case 5:
          characterSnap = _context.sent;

          if (!characterSnap.exists()) {
            _context.next = 12;
            break;
          }

          characterData = characterSnap.data();
          console.log(characterData);
          return _context.abrupt("return", characterData);

        case 12:
          console.log("No character data found.", collection);

        case 13:
          _context.next = 18;
          break;

        case 15:
          _context.prev = 15;
          _context.t0 = _context["catch"](1);
          console.error("Error fetching character data:", _context.t0);

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[1, 15]]);
}

function GetWeaponsData(_ref2) {
  var user, collection, group, characterRef, characterSnap, characterData;
  return regeneratorRuntime.async(function GetWeaponsData$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          user = _ref2.user, collection = _ref2.collection, group = _ref2.group;
          _context2.prev = 1;
          characterRef = (0, _firestore.doc)(_FireBase.db, 'database', 'groups', group, user, "weapons", collection);
          _context2.next = 5;
          return regeneratorRuntime.awrap((0, _firestore.getDoc)(characterRef));

        case 5:
          characterSnap = _context2.sent;

          if (!characterSnap.exists()) {
            _context2.next = 12;
            break;
          }

          characterData = characterSnap.data();
          console.log(characterData);
          return _context2.abrupt("return", characterData);

        case 12:
          console.log("No character data found.", collection);

        case 13:
          _context2.next = 18;
          break;

        case 15:
          _context2.prev = 15;
          _context2.t0 = _context2["catch"](1);
          console.error("Error fetching character data:", _context2.t0);

        case 18:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[1, 15]]);
}

function GetInventoryData(_ref3) {
  var user, group, characterRef, characterSnap, characterData;
  return regeneratorRuntime.async(function GetInventoryData$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          user = _ref3.user, group = _ref3.group;
          _context3.prev = 1;
          characterRef = (0, _firestore.doc)(_FireBase.db, 'database', 'groups', group, user, "inventory", "inventory");
          _context3.next = 5;
          return regeneratorRuntime.awrap((0, _firestore.getDoc)(characterRef));

        case 5:
          characterSnap = _context3.sent;

          if (!characterSnap.exists()) {
            _context3.next = 12;
            break;
          }

          characterData = characterSnap.data();
          console.log(characterData);
          return _context3.abrupt("return", characterData);

        case 12:
          console.log("No inventory data found.");

        case 13:
          _context3.next = 18;
          break;

        case 15:
          _context3.prev = 15;
          _context3.t0 = _context3["catch"](1);
          console.error("Error fetching inventory data:", _context3.t0);

        case 18:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[1, 15]]);
}

function GetSpiritsData(_ref4) {
  var user, group, characterRef, characterSnap, characterData;
  return regeneratorRuntime.async(function GetSpiritsData$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          user = _ref4.user, group = _ref4.group;
          _context4.prev = 1;
          characterRef = (0, _firestore.doc)(_FireBase.db, 'database', 'groups', group, user, "spirits", "spirits");
          _context4.next = 5;
          return regeneratorRuntime.awrap((0, _firestore.getDoc)(characterRef));

        case 5:
          characterSnap = _context4.sent;

          if (!characterSnap.exists()) {
            _context4.next = 11;
            break;
          }

          characterData = characterSnap.data();
          return _context4.abrupt("return", characterData);

        case 11:
          console.log("No inventory data found.");

        case 12:
          _context4.next = 17;
          break;

        case 14:
          _context4.prev = 14;
          _context4.t0 = _context4["catch"](1);
          console.error("Error fetching inventory data:", _context4.t0);

        case 17:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[1, 14]]);
}