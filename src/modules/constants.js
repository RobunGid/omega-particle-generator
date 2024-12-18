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

export const currentColor = {
    hue: 0,
    saturation: 50,
    lightness: 50,
    getHsl() {
        return `hsl(${this.hue}, ${this.saturation}%, ${this.lightness}%)`
    }
}

export const defaultInputValues = {
    colorRandomness: 10,
    rainbowColorChangeSpeed: 50,
    particleSizeMin: 1,
    particleSizeMax: 20,
    frequence: 30,
}