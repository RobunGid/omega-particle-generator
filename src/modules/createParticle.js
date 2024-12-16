import { particlesArray } from "./constants.js";
import { Particle } from "./Particle.js";

export function createParticle({ count, color, size, speedX, speedY }) {
        for (let i = 0; i < count; i++) {
            particlesArray.push(new Particle({ color, size, speedX, speedY }));
        }
}