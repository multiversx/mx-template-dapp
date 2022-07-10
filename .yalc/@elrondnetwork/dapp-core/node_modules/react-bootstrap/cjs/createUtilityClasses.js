"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.DEVICE_SIZES = void 0;
exports.default = createUtilityClassName;
exports.responsivePropType = responsivePropType;

var _propTypes = _interopRequireDefault(require("prop-types"));

function responsivePropType(propType) {
  return _propTypes.default.oneOfType([propType, _propTypes.default.shape({
    xs: propType,
    sm: propType,
    md: propType,
    lg: propType,
    xl: propType,
    xxl: propType
  })]);
}

const DEVICE_SIZES = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
exports.DEVICE_SIZES = DEVICE_SIZES;

function createUtilityClassName(utilityValues) {
  const classes = [];
  Object.entries(utilityValues).forEach(([utilName, utilValue]) => {
    if (utilValue != null) {
      if (typeof utilValue === 'object') {
        DEVICE_SIZES.forEach(brkPoint => {
          const bpValue = utilValue[brkPoint];

          if (bpValue != null) {
            const infix = brkPoint !== 'xs' ? `-${brkPoint}` : '';
            classes.push(`${utilName}${infix}-${bpValue}`);
          }
        });
      } else {
        classes.push(`${utilName}-${utilValue}`);
      }
    }
  });
  return classes;
}