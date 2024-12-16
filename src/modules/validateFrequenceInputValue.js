export function validateFrequenceInputValue(value) {
    value = parseInt(value);
    const frequenceInput = document.querySelector("#frequence-input");
    if (
        value >= frequenceInput.getAttribute('min') &&
        value <= frequenceInput.getAttribute('max')
    ) return value;
    return 1;
}