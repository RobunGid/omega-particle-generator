import { canvas, colorModeValues, mouse, ctx, defaultInputValues, currentColor, touches } from '../modules/constants.js';

import { convertRGBtoHSL } from '../modules/convertRGBtoHSL.js'

import { createParticle } from '../modules/createParticle.js';
import { handleParticles } from '../modules/handleParticles.js'
import { getRandomInt } from '../modules/getRandomInt.js';

import { handleValidateInput } from '../modules/handleValidateInput.js'
import { validateInputValue } from '../modules/validateInputValue.js';

const colorModes = {
    rainbowColorMode: () => {
        currentColor.hue += rainbowColorChangeSpeed / 50;
        currentColor.hue += getRandomInt(-colorRandomness, colorRandomness);
        currentColor.hue = currentColor.hue % 360;
        return currentColor.getHsl()
    },
    singleColorMode: () => {
        const color = convertRGBtoHSL(singleColorInput.value);
        currentColor.hue = color.hue;
        currentColor.hue += getRandomInt(-colorRandomness, colorRandomness);
        currentColor.hue = currentColor.hue % 360;
        currentColor.saturation = color.saturation;
        currentColor.lightness = color.lightness;
        currentColor.lightness += getRandomInt(-colorRandomness, colorRandomness) * 0.25;
        return currentColor.getHsl();
    },
    multiColorMode: () => {
        const color = convertRGBtoHSL(multiColorInputs[getRandomInt(0, multiColorInputs.length - 1)].value);
        currentColor.hue = color.hue;
        currentColor.hue += getRandomInt(-colorRandomness, colorRandomness);
        currentColor.hue = currentColor.hue % 360;
        currentColor.saturation = color.saturation;
        currentColor.lightness = color.lightness;
        currentColor.lightness += getRandomInt(-colorRandomness, colorRandomness) * 0.25;
        return currentColor.getHsl();
    }
}

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const singleColorInput = document.querySelector('#single-color-input');
const multiColorInputs = document.querySelectorAll('[name="multi-color-input"]');

const sizeInputMinInput = document.querySelector("#size-input-min");
const sizeInputMaxInput = document.querySelector("#size-input-max");

const closeSettingsButtonContainer = document.querySelector("#close-settings-button-container");
const settingsContainer = document.querySelector("#settings-container");

const frequenceInput = document.querySelector("#frequence-input");
const rainbowColorSpeedChangeInput = document.querySelector("#rainbow-speed-change-input");
const colorRandomnessInput = document.querySelector("#color-randomness-input");

let intervalTime = 100 - validateInputValue({ inputElement: frequenceInput, defaultValue: defaultInputValues['frequence'] });
let colorRandomness = validateInputValue({ inputElement: colorRandomnessInput, defaultValue: defaultInputValues['colorRandomness'] });
let rainbowColorChangeSpeed = validateInputValue({ inputElement: rainbowColorSpeedChangeInput, defaultValue: defaultInputValues['rainbowColorChangeSpeed'] });
let particleCount = 1 + Math.round(validateInputValue({ inputElement: frequenceInput, defaultValue: 30}) / 50);
let particleSizeMin = validateInputValue({ inputElement: sizeInputMinInput, defaultValue: 1 });
let particleSizeMax = validateInputValue({ inputElement: sizeInputMaxInput, defaultValue: 20 });

let colorMode = colorModes[colorModeValues[Array.from(document.querySelectorAll('[name="color-mode"]')).find(item => item.checked).dataset.key]];

sizeInputMinInput.addEventListener('blur', (event) => handleValidateInput({ event, defaultValue: defaultInputValues['particleSizeMin']}));
sizeInputMaxInput.addEventListener('blur', (event) => handleValidateInput({ event, defaultValue: defaultInputValues['particleSizeMax']}));

sizeInputMinInput.addEventListener('input', (event) => {
    particleSizeMin = validateInputValue({ inputElement: sizeInputMinInput, defaultValue: 1 });
})

sizeInputMaxInput.addEventListener('input', (event) => {
    particleSizeMax = validateInputValue({ inputElement: sizeInputMaxInput, defaultValue: 20 });
})

frequenceInput.addEventListener('blur', (event) => {
    handleValidateInput({ event, defaultValue: defaultInputValues['frequence'] });
})

frequenceInput.addEventListener('input', (event) => {
    particleCount = 1 + Math.round(validateInputValue({ inputElement: frequenceInput, defaultValue: 30}) / 50);
    intervalTime = 100 - validateInputValue({ inputElement: frequenceInput, defaultValue: defaultInputValues['frequence'] });
})

rainbowColorSpeedChangeInput.addEventListener('input', () => {
    rainbowColorChangeSpeed = validateInputValue({ inputElement: rainbowColorSpeedChangeInput, defaultValue: defaultInputValues['rainbowColorChangeSpeed'] });
})

rainbowColorSpeedChangeInput.addEventListener('blur', (event) => {
    handleValidateInput({ event, defaultValue: defaultInputValues['rainbowColorChangeSpeed']});
})

colorRandomnessInput.addEventListener('input', (event) => {
    colorRandomness = validateInputValue({ inputElement: colorRandomnessInput, defaultValue: 30 });
})

colorRandomnessInput.addEventListener('blur', (event) => {
    handleValidateInput({ event, defaultValue: 30 });
})

document.querySelectorAll('[name="color-mode"]').forEach(element => {
    element.addEventListener('input', (event) => {
        colorMode = colorModes[event.target.dataset.key];
    })
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

    mouse.x = (event.pageX - xOffset) * scaleX;
    mouse.y = (event.pageY - yOffset) * scaleY;
})

let isInCenter = true;
let lastTime = 0;

ctx.fillStyle = 'rgb(42,42,42)';
ctx.fillRect(0, 0, canvas.width, canvas.height);

function animate(time) {
    if (lastTime === 0) {
        lastTime = time;
    }

    if (time - lastTime >= intervalTime) {
        const color = colorMode();
        
        const particleSize = getRandomInt(particleSizeMin, particleSizeMax);

        if (isInCenter) {
            mouse.x = canvas.width / 2 + getRandomInt(-150, 150);
            mouse.y = canvas.height / 2 + getRandomInt(-150, 150);
        }

        if (!touches.length) {
        
            createParticle({ count: particleCount, color, particleSize, x: mouse.x, y: mouse.y });
    
            
        } else {
            touches.forEach(touch => {
                
                createParticle({ count: particleCount, color, particleSize, x: touch.x, y: touch.y });

            })
        }

        lastTime = time;
      
    }
    
    const pathVisibility = document.querySelector('#clear-checkbox').checked;

    if (pathVisibility) {
        ctx.fillStyle = 'rgba(0,0,0,0.09)';
        ctx.fillRect(0, 0, canvas.width, canvas.height)
    } else {
        ctx.fillStyle = 'rgb(5,5,5)';
        ctx.fillRect(0, 0, canvas.width, canvas.height)
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

canvas.addEventListener('touchmove', event => {
    event.preventDefault();
    Array.from(event.touches).forEach(touch => {
        const touchesIds = touches.map(touchItem => touchItem.identifier);
        touches[touchesIds.indexOf(touch.identifier)] = {identifier: touch.identifier, x: touch.pageX, y: touch.pageY};
    })
})

canvas.addEventListener('touchstart', event => {
    isInCenter = false;

    Array.from(event.touches).forEach(touch => {

        const touchesIds = touches.map(touchItem => touchItem.identifier);

        if (touch.identifier in touchesIds) {
            touches[touchesIds.indexOf(touch.identifier)] = {identifier: touch.identifier, x: touch.pageX, y: touch.pageY}
        } else {
            const touchObject = {identifier: touch.identifier, x: touch.pageX, y: touch.pageY};
            touches.push(touchObject)
        }

    })
})

canvas.addEventListener('touchend', event => {

    Array.from(event.touches).forEach(touch => {
        const touchesIds = touches.map(touchItem => touchItem.identifier);
        touches.splice(touchesIds.indexOf(touch.identifier), 1)
    })

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

settingsContainer.addEventListener('show.bs.collapse', (event) => {
    closeSettingsButtonContainer.style.left = '350px';
})

settingsContainer.addEventListener('hide.bs.collapse', (event) => {
    closeSettingsButtonContainer.style.left = '7px';
})