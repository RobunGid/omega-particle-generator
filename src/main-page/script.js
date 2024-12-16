import { canvas, mouse } from '../modules/constants.js';

import { particleInit } from '../modules/particleInit.js';

import { animate } from '../modules/animate.js';
import { getRandomInt } from '../modules/getRandomInt.js';
import { handleValidateSizeInputMin } from '../modules/handleValidateSizeInputMin.js';
import { handleValidateSizeInputMax } from '../modules/handleValidateSizeInputMax.js';
import { handleValidateFrequenceInput } from '../modules/handleValidateFrequenceInput.js';
import { validateFrequenceInputValue } from '../modules/validateFrequenceInputValue.js';

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const sizeInputMin = document.querySelector("#size-input-min");
const sizeInputMax = document.querySelector("#size-input-max");

const frequenceInput = document.querySelector("#frequence-input");

sizeInputMin.addEventListener('blur', () => handleValidateSizeInputMin());
sizeInputMax.addEventListener('blur', () => handleValidateSizeInputMax());

frequenceInput.addEventListener('blur', () => {
    handleValidateFrequenceInput();
})

frequenceInput.addEventListener('input',() => {
    clearInterval(particleSpawnInterval);
    particleSpawnInterval = particleRandomCenterSpawn();
})

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

canvas.addEventListener('mousemove', (event) => {
    const xOffset = canvas.getBoundingClientRect().x;
    const yOffset = canvas.getBoundingClientRect().y;

    const scaleX = canvas.width / canvas.getBoundingClientRect().width;
    const scaleY = canvas.height / canvas.getBoundingClientRect().height;

    mouse.x = (event.clientX - xOffset) * scaleX;
    mouse.y = (event.clientY - yOffset) * scaleY;
})

function particleRandomCenterSpawn() {
    return setInterval(() => {
        mouse.x = canvas.width / 2 + getRandomInt(-150, 150);
        mouse.y = canvas.height / 2 + getRandomInt(-150, 150);
        
        particleInit({ count: 1 });
    }, 30 - validateFrequenceInputValue(frequenceInput.value))
}

function particleSpawn() {
    return setInterval(() => particleInit({ count: 1 }), 51 - validateFrequenceInputValue(frequenceInput.value))
}

let particleSpawnInterval = particleRandomCenterSpawn();

canvas.addEventListener('mouseout', (event) => {
    clearInterval(particleSpawnInterval);
    particleSpawnInterval = particleRandomCenterSpawn();

})

canvas.addEventListener('mouseover', (event) => {
    clearInterval(particleSpawnInterval);
    particleSpawnInterval = particleSpawn();
})

animate();

document.addEventListener('DOMContentLoaded', () => {
    document.addEventListener('mousemove', (event) => {
        const settingsElement = document.querySelector('#settings-container');
        const settingsElementRect = settingsElement.getBoundingClientRect();
        
        if (event.x < settingsElementRect.right && event.y < settingsElementRect.bottom) return
        
        mouse.x = event.x;
        mouse.y = event.y;
        clearInterval(particleSpawnInterval);
        particleSpawnInterval = particleSpawn();
        
    }, {once: true})

})