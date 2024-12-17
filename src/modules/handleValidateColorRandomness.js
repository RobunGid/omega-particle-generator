import { validateColorRandomnessValue } from './validateColorRandomnessValue.js'

export function handleValidateColorRandomness() {
    const colorRandomnessInput = document.querySelector("#color-randomness-input");
    colorRandomnessInput.value = validateColorRandomnessValue(colorRandomnessInput.value)
}