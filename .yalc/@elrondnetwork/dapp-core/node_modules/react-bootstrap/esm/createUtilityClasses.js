import PropTypes from 'prop-types';
export function responsivePropType(propType) {
  return PropTypes.oneOfType([propType, PropTypes.shape({
    xs: propType,
    sm: propType,
    md: propType,
    lg: propType,
    xl: propType,
    xxl: propType
  })]);
}
export const DEVICE_SIZES = ['xxl', 'xl', 'lg', 'md', 'sm', 'xs'];
export default function createUtilityClassName(utilityValues) {
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