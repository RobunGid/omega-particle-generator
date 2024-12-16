import { validateSizeInputMinValue } from "./validateSizeInputMinValue.js";

export function handleValidateSizeInputMin() {
    const sizeInputMin = document.querySelector("#size-input-min");
    sizeInputMin.value = validateSizeInputMinValue(sizeInputMin.value);
}