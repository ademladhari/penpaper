"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _firestore = require("firebase/firestore");

var _FireBase = require("./FireBase");

function OtherCharacterDetails(_ref) {
  var setCharacterData = _ref.setCharacterData,
      collection = _ref.collection,
      collection2 = _ref.collection2;
  (0, _react.useEffect)(function () {
    var fetchCharacterData = function fetchCharacterData() {
      var characterRef, characterSnap, characterData;
      return regeneratorRuntime.async(function fetchCharacterData$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.prev = 0;
              characterRef = (0, _firestore.doc)(_FireBase.db, 'database', 'all', collection, collection2);
              _context.next = 4;
              return regeneratorRuntime.awrap((0, _firestore.getDoc)(characterRef));

            case 4:
              characterSnap = _context.sent;

              if (characterSnap.exists()) {
                characterData = characterSnap.data();
                setCharacterData(characterData);
                console.log(characterData);
              } else {
                console.log("No character data found.");
              }

              _context.next = 11;
              break;

            case 8:
              _context.prev = 8;
              _context.t0 = _context["catch"](0);
              console.error("Error fetching character data:", _context.t0);

            case 11:
            case "end":
              return _context.stop();
          }
        }
      }, null, null, [[0, 8]]);
    };

    fetchCharacterData();
  }, [collection, collection2]);
}

var _default = OtherCharacterDetails;
exports["default"] = _default;