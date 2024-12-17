import { validateRainbowSpeedChangeValue } from '../modules/validateRainbowSpeedChangeValue.js'

export function handleValidateRainbowSpeedChangeInput() {
    const rainbowSpeedChangeInput = document.querySelector("#rainbow-speed-change-input");
    rainbowSpeedChangeInput.value = validateRainbowSpeedChangeValue(rainbowSpeedChangeInput.value);
}