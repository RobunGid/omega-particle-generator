import { validateInputValue } from '../modules/validateInputValue.js'

export function handleValidateInput({ event, defaultValue }) {
    event.target.value = validateInputValue({ inputElement: event.target, defaultValue });
}