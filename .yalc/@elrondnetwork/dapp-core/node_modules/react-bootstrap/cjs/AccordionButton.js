"use strict";

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

exports.__esModule = true;
exports.default = void 0;
exports.useAccordionButton = useAccordionButton;

var React = _interopRequireWildcard(require("react"));

var _classnames = _interopRequireDefault(require("classnames"));

var _AccordionContext = _interopRequireDefault(require("./AccordionContext"));

var _AccordionItemContext = _interopRequireDefault(require("./AccordionItemContext"));

var _ThemeProvider = require("./ThemeProvider");

var _jsxRuntime = require("react/jsx-runtime");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function useAccordionButton(eventKey, onClick) {
  const {
    activeEventKey,
    onSelect
  } = (0, React.useContext)(_AccordionContext.default);
  return e => {
    /*
      Compare the event key in context with the given event key.
      If they are the same, then collapse the component.
    */
    const eventKeyPassed = eventKey === activeEventKey ? null : eventKey;
    if (onSelect) onSelect(eventKeyPassed, e);
    if (onClick) onClick(e);
  };
}

const AccordionButton = /*#__PURE__*/React.forwardRef(({
  // Need to define the default "as" during prop destructuring to be compatible with styled-components github.com/react-bootstrap/react-bootstrap/issues/3595
  as: Component = 'button',
  bsPrefix,
  className,
  onClick,
  ...props
}, ref) => {
  bsPrefix = (0, _ThemeProvider.useBootstrapPrefix)(bsPrefix, 'accordion-button');
  const {
    eventKey
  } = (0, React.useContext)(_AccordionItemContext.default);
  const accordionOnClick = useAccordionButton(eventKey, onClick);
  const {
    activeEventKey
  } = (0, React.useContext)(_AccordionContext.default);

  if (Component === 'button') {
    props.type = 'button';
  }

  return /*#__PURE__*/(0, _jsxRuntime.jsx)(Component, {
    ref: ref,
    onClick: accordionOnClick,
    ...props,
    "aria-expanded": eventKey === activeEventKey,
    className: (0, _classnames.default)(className, bsPrefix, eventKey !== activeEventKey && 'collapsed')
  });
});
AccordionButton.displayName = 'AccordionButton';
var _default = AccordionButton;
exports.default = _default;