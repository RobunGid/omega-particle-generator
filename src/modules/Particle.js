import { getRandomInt } from './getRandomInt.js'
import { mouse, canvas, ctx, colorModeValues } from './constants.js';
import { hue } from './handleParticles.js';
import { validateSizeInputMin } from './validateSizeInputMin.js';
import { validateSizeInputMax } from './validateSizeInputMax.js';

export class Particle {
    constructor() {
        const colorMode = colorModeValues[Array.from(document.querySelectorAll('[name="color-mode"]')).find(item => item.checked).dataset.key];
        
        const singleColor = document.querySelector('#single-color-input').value;
        const multiColors = {
            colors: Array.from(document.querySelectorAll('[name="multi-color-input"]')).map(item => item.value),
            getRandomColor() {
                return this.colors[getRandomInt(0, this.colors.length - 1)]
            }
        };

        const particleSizeMin = validateSizeInputMin(document.querySelector('#size-input-min').value);
        const particleSizeMax = validateSizeInputMax(document.querySelector('#size-input-max').value);

        [this.x, this.y] = [getRandomInt(0, canvas.width), getRandomInt(0, canvas.height)];
        [this.x, this.y] = [mouse.x, mouse.y];
        this.size = getRandomInt(particleSizeMin, particleSizeMax);
        this.speedX = getRandomInt(-300, 300) * 0.01;
        this.speedY = getRandomInt(-300, 300) * 0.01; 
        this.color = {
            rainbowColorMode: `hsl(${(hue + getRandomInt(-10, 10)) % 360}, 100%, 50%)`,
            singleColorMode: singleColor,
            multiColorMode: multiColors.getRandomColor(),
        }[colorMode];
    }

    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.size > 0.2) this.size -= 0.1;
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}