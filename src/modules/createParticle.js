import { particlesArray } from "./constants.js";
import { Particle } from "./Particle.js";

export function createParticle({ count, color, particleSize, x, y }) {
        for (let i = 0; i < count; i++) {
            particlesArray.push(new Particle({ color, particleSize, x, y }));
        }
}