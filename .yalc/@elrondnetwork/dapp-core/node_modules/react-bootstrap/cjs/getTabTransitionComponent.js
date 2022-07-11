"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = getTabTransitionComponent;

var _Fade = _interopRequireDefault(require("./Fade"));

function getTabTransitionComponent(transition) {
  if (typeof transition === 'boolean') {
    return transition ? _Fade.default : undefined;
  }

  return transition;
}

module.exports = exports.default;