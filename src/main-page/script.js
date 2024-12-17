import { canvas, colorModeValues, mouse, hsl, ctx } from '../modules/constants.js';

import { createParticle } from '../modules/createParticle.js';
import { handleParticles } from '../modules/handleParticles.js'
import { handleValidateSizeInputMin } from '../modules/handleValidateSizeInputMin.js';
import { handleValidateSizeInputMax } from '../modules/handleValidateSizeInputMax.js';
import { handleValidateFrequenceInput } from '../modules/handleValidateFrequenceInput.js';
import { handleValidateRainbowSpeedChangeInput } from '../modules/handleValidateRainbowSpeedChangeInput.js';
import { validateFrequenceInputValue } from '../modules/validateFrequenceInputValue.js';
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

let intervalTime = 100 - validateFrequenceInputValue(frequenceInput.value);

frequenceInput.addEventListener('blur', () => {
    intervalTime = 100 - validateFrequenceInputValue(frequenceInput.value);
    handleValidateFrequenceInput();
})

frequenceInput.addEventListener('input',() => {
    intervalTime = 100 - validateFrequenceInputValue(frequenceInput.value);
})

rainbowSpeedChangeInput.addEventListener('blur', () => {
    handleValidateRainbowSpeedChangeInput();
})

rainbowSpeedChangeInput.addEventListener('input',() => {

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

let isInCenter = true;
let lastTime = 0;

function animate(time) {
    if (lastTime === 0) {
        lastTime = time;
    }

    if (time - lastTime >= intervalTime) {
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
    
        createParticle({ count: 1 + Math.round(validateFrequenceInputValue(frequenceInput.value) / 20), color, size: particleSize });

        lastTime = time;
    }
    
    const pathVisibility = document.querySelector('#clear-checkbox').checked;

    if (pathVisibility) {
        ctx.fillStyle = 'rgba(0,0,0,0.1)';
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height); 
    }

    handleParticles();
    requestAnimationFrame(animate);
}

requestAnimationFrame(animate);

canvas.addEventListener('mouseover', () => {
    isInCenter = false;
})
canvas.addEventListener('mouseout', () => {
    isInCenter = true;
})


document.addEventListener('mousemove', (event) => {

    const settingsElement = document.querySelector('#settings-container');
    const settingsElementRect = settingsElement.getBoundingClientRect();
    
    if (event.x < settingsElementRect.right && event.y < settingsElementRect.bottom) return
    
    isInCenter = false;

    mouse.x = event.x;
    mouse.y = event.y;
    
}, {once: true})