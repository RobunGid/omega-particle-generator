import { validateSizeInputMax } from "./validateSizeInputMax.js";

export function handleValidateSizeInputMax(event) {
    const sizeInputMax = document.querySelector("#size-input-max");
    sizeInputMax.value = validateSizeInputMax(sizeInputMax.value);
}