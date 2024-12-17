export const canvas = document.querySelector("#main-canvas");

export const ctx = canvas.getContext('2d');

export const particlesArray = [];

export const mouse = {
    x: null,
    y: null,
}

export const colorModeValues = {
    rainbowColorMode: 'rainbowColorMode',
    singleColorMode: 'singleColorMode',
    multiColorMode: 'multiColorMode',
}

export const hsl = {
    hue: 0,
    saturation: 100,
    lightness: 50,
    hslText: function() {return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`}
}