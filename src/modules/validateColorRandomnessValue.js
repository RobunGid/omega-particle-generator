export function validateColorRandomnessValue(value) {
    value = parseInt(value);
    const colorRandomnessInput = document.querySelector("#color-randomness-input");
    if (
        value >= colorRandomnessInput.getAttribute('min') &&
        value <= colorRandomnessInput.getAttribute('max')
    ) return value;
    return 15;
}