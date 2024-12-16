import { validateSizeInputMin } from "./validateSizeInputMin.js";

export function handleValidateSizeInputMin(event) {
    const sizeInputMin = document.querySelector("#size-input-min");
    sizeInputMin.value = validateSizeInputMin(sizeInputMin.value);
}