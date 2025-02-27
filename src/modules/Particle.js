import { getRandomInt } from './getRandomInt.js'
import { mouse, canvas, ctx, colorModeValues } from './constants.js';

export class Particle {
    constructor({ color, particleSize, x, y }) {
        [this.x, this.y] = [x, y];
        this.size = particleSize;
        this.speedX = getRandomInt(-300, 300) * 0.01;
        this.speedY = getRandomInt(-300, 300) * 0.01; 
        this.color = color;
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