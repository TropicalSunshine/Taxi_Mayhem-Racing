


var canvasWidth = 0;
var canvasHeight = 0;
var canvas = null;


export const setHeight = (height) => {
    canvasWidth = height;
}

export const setWidth = (width) => {
    canvasHeight = width;
}

export const setCanvas = (ctx) => {
    canvas = ctx;
}


export const getCanvas = () => {
    return canvas;
}

export const getHeight = () => {
    return canvasHeight;
}

export const getWidth = () => {
    return canvasWidth;
}