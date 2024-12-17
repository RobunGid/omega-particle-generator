export function validateRainbowSpeedChangeValue(value) {
    value = parseInt(value);
    const rainbowSpeedChangeInput = document.querySelector("#rainbow-speed-change-input");
    if (
        value >= rainbowSpeedChangeInput.getAttribute('min') &&
        value <= rainbowSpeedChangeInput.getAttribute('max')
    ) return value;
    return 5;
}