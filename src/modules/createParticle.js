import { particlesArray } from "./constants.js";
import { Particle } from "./Particle.js";

export function createParticle({ count, color, particleSize, speedX, speedY }) {
        for (let i = 0; i < count; i++) {
            particlesArray.push(new Particle({ color, particleSize, speedX, speedY }));
        }
}