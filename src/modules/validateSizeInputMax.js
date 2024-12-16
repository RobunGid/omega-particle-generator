export function validateSizeInputMax(value) {
    value = parseInt(value);
    const sizeInputMax = document.querySelector("#size-input-max");
    if (
        value >= sizeInputMax.getAttribute('min') &&
        value <= sizeInputMax.getAttribute('max')
    ) return value;
    return 20;
}