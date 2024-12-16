import { mouse } from "./constants.js";

export function checkIsMouseOnCanvas({ particleSpawnInterval, particleSpawn }) {
    document.addEventListener('mousemove', (event) => {
        const settingsElement = document.querySelector('#settings-container');
        const settingsElementRect = settingsElement.getBoundingClientRect();
        
        if (event.x < settingsElementRect.right && event.y < settingsElementRect.bottom) return
        
        mouse.x = event.x;
        mouse.y = event.y;
        clearInterval(particleSpawnInterval);
        particleSpawnInterval = particleSpawn();
        
    }, {once: true})
}