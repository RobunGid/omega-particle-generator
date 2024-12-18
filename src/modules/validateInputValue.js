export function validateInputValue({ inputElement, defaultValue }) {
   
    const value = parseInt(inputElement.value);
    if (
        value >= inputElement.getAttribute('min') &&
        value <= inputElement.getAttribute('max')
    ) return value;
    return defaultValue;

}