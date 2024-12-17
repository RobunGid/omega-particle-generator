import { canvas, colorModeValues, mouse, hsl } from '../modules/constants.js';

import { createParticle } from '../modules/createParticle.js';

import { animate } from '../modules/animate.js';
import { handleValidateSizeInputMin } from '../modules/handleValidateSizeInputMin.js';
import { handleValidateSizeInputMax } from '../modules/handleValidateSizeInputMax.js';
import { handleValidateFrequenceInput } from '../modules/handleValidateFrequenceInput.js';
import { handleValidateRainbowSpeedChangeInput } from '../modules/handleValidateRainbowSpeedChangeInput.js';
import { validateFrequenceInputValue } from '../modules/validateFrequenceInputValue.js';
import { checkIsMouseOnCanvas } from '../modules/checkIsMouseOnCanvas.js';
import { getRandomInt } from '../modules/getRandomInt.js';
import { validateSizeInputMinValue } from '../modules/validateSizeInputMinValue.js';
import { validateSizeInputMaxValue } from '../modules/validateSizeInputMaxValue.js';
import { validateRainbowSpeedChangeValue } from '../modules/validateRainbowSpeedChangeValue.js';

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const sizeInputMin = document.querySelector("#size-input-min");
const sizeInputMax = document.querySelector("#size-input-max");

const frequenceInput = document.querySelector("#frequence-input");
const rainbowSpeedChangeInput = document.querySelector("#rainbow-speed-change-input");

sizeInputMin.addEventListener('blur', () => handleValidateSizeInputMin());
sizeInputMax.addEventListener('blur', () => handleValidateSizeInputMax());

frequenceInput.addEventListener('blur', () => {
    checkIsMouseOnCanvas({ particleSpawnInterval, particleSpawn })
    handleValidateFrequenceInput();
})

frequenceInput.addEventListener('input',() => {
    clearInterval(particleSpawnInterval);
    particleSpawnInterval = particleSpawn(true);
})

rainbowSpeedChangeInput.addEventListener('blur', () => {
    checkIsMouseOnCanvas({ particleSpawnInterval, particleSpawn })
    handleValidateRainbowSpeedChangeInput();
})

rainbowSpeedChangeInput.addEventListener('input',() => {
    clearInterval(particleSpawnInterval);
    particleSpawnInterval = particleSpawn(true);
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

function particleSpawn( isInCenter = false ) {
    return setInterval(() => {
        const colorMode = colorModeValues[Array.from(document.querySelectorAll('[name="color-mode"]')).find(item => item.checked).dataset.key];
    
        const singleColor = document.querySelector('#single-color-input').value;
        const multiColors = {
            colors: Array.from(document.querySelectorAll('[name="multi-color-input"]')).map(item => item.value),
            getRandomColor() {
                return this.colors[getRandomInt(0, this.colors.length - 1)]
            }
        };
        hsl.hue += validateRainbowSpeedChangeValue(rainbowSpeedChangeInput.value) / 100;
        const color = {
            rainbowColorMode: hsl.hslText(),
            singleColorMode: singleColor,
            multiColorMode: multiColors.getRandomColor(),
        }[colorMode]
    
        const particleSizeMin = validateSizeInputMinValue(document.querySelector('#size-input-min').value);
        const particleSizeMax = validateSizeInputMaxValue(document.querySelector('#size-input-max').value);
    
        const particleSize = getRandomInt(particleSizeMin, particleSizeMax)

        if (isInCenter) {
            mouse.x = canvas.width / 2 + getRandomInt(-150, 150);
            mouse.y = canvas.height / 2 + getRandomInt(-150, 150);
        }

        createParticle({ count: 1, color, size: particleSize })
    }, parseInt(1000 / validateFrequenceInputValue(frequenceInput.value)))
}

let particleSpawnInterval = particleSpawn(true);

canvas.addEventListener('mouseout', (event) => {
    clearInterval(particleSpawnInterval);
    particleSpawnInterval = particleSpawn(true);

})

canvas.addEventListener('mouseover', (event) => {
    clearInterval(particleSpawnInterval);
    particleSpawnInterval = particleSpawn();
})

animate();

document.addEventListener('DOMContentLoaded', () => {
    checkIsMouseOnCanvas({ particleSpawnInterval, particleSpawn });
})

document.addEventListener('visibilitychange', (event) => {
    console.log(document.hidden)
    if (document.hidden) {
        clearInterval(particleSpawnInterval);
    } else {
        checkIsMouseOnCanvas({particleSpawnInterval, particleSpawn});
    }
})