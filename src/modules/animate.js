import { ctx, canvas } from "./constants.js";
import { handleParticles } from "./handleParticles.js";

export function animate() {
    
    const pathVisibility = document.querySelector('#clear-checkbox').checked;

    if (pathVisibility) {
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
    }
    handleParticles();
    requestAnimationFrame(animate.bind(null, { pathVisibility }));
}