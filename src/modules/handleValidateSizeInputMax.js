import { validateSizeInputMaxValue } from "./validateSizeInputMaxValue.js";

export function handleValidateSizeInputMax() {
    const sizeInputMax = document.querySelector("#size-input-max");
    sizeInputMax.value = validateSizeInputMaxValue(sizeInputMax.value);
}