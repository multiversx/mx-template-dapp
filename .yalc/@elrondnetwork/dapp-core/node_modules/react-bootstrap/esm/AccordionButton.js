import * as React from 'react';
import { useContext } from 'react';
import classNames from 'classnames';
import AccordionContext from './AccordionContext';
import AccordionItemContext from './AccordionItemContext';
import { useBootstrapPrefix } from './ThemeProvider';
import { jsx as _jsx } from "react/jsx-runtime";
export function useAccordionButton(eventKey, onClick) {
  const {
    activeEventKey,
    onSelect
  } = useContext(AccordionContext);
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
  bsPrefix = useBootstrapPrefix(bsPrefix, 'accordion-button');
  const {
    eventKey
  } = useContext(AccordionItemContext);
  const accordionOnClick = useAccordionButton(eventKey, onClick);
  const {
    activeEventKey
  } = useContext(AccordionContext);

  if (Component === 'button') {
    props.type = 'button';
  }

  return /*#__PURE__*/_jsx(Component, {
    ref: ref,
    onClick: accordionOnClick,
    ...props,
    "aria-expanded": eventKey === activeEventKey,
    className: classNames(className, bsPrefix, eventKey !== activeEventKey && 'collapsed')
  });
});
AccordionButton.displayName = 'AccordionButton';
export default AccordionButton;