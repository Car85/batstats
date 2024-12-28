import '@testing-library/react';

if (typeof window.HTMLCanvasElement.prototype.getContext === 'undefined') {
  window.HTMLCanvasElement.prototype.getContext = (contextId: string) => {
    if (contextId === '2d') {
      return {
        canvas: document.createElement('canvas'),
        fillRect: () => {},
        clearRect: () => {},
        getContextAttributes: () => null,
        putImageData: () => {},
        getImageData: () => ({ data: new Uint8ClampedArray(0) }),
        createImageData: () => ({ data: new Uint8ClampedArray(0) }),
        setTransform: () => {},
        resetTransform: () => {},
        rotate: () => {},
        scale: () => {},
        translate: () => {},
        transform: () => {},
        save: () => {},
        restore: () => {},
        beginPath: () => {},
        closePath: () => {},
        moveTo: () => {},
        lineTo: () => {},
        bezierCurveTo: () => {},
        quadraticCurveTo: () => {},
        arc: () => {},
        arcTo: () => {},
        ellipse: () => {},
        rect: () => {},
        clip: () => {},
        stroke: () => {},
        fill: () => {},
        drawImage: () => {},
        measureText: () => ({ width: 0 }),
        strokeText: () => {},
        fillText: () => {},
      } as unknown as CanvasRenderingContext2D;
    }
    return null;
  };
}



  if (typeof window.URL.createObjectURL === 'undefined') {
    window.URL.createObjectURL = () => '';
  }