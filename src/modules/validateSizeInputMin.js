export function validateSizeInputMin(value) {
    value = parseInt(value);
    const sizeInputMin = document.querySelector("#size-input-min");
    if (
        value >= sizeInputMin.getAttribute('min') &&
        value <= sizeInputMin.getAttribute('max')
    ) return value
    return 1;
}