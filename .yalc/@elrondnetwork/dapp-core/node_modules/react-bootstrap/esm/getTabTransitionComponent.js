import Fade from './Fade';
export default function getTabTransitionComponent(transition) {
  if (typeof transition === 'boolean') {
    return transition ? Fade : undefined;
  }

  return transition;
}