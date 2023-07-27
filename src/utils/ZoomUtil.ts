export const detectZoom = () => {
  let ratio = 0;
  const screen = window.screen;
  const ua = navigator.userAgent.toLowerCase();

  if (window.devicePixelRatio !== undefined) {
    ratio = window.devicePixelRatio;
  } else if (
    window.outerWidth !== undefined &&
    window.innerWidth !== undefined
  ) {
    ratio = window.outerWidth / window.innerWidth;
  }
  
  return ratio ?? 1;
};
