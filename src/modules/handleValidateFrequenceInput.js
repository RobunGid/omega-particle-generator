import { validateFrequenceInputValue } from "./validateFrequenceInputValue.js";

export function handleValidateFrequenceInput() {

    const frequenceInput = document.querySelector("#frequence-input");
    
    frequenceInput.value = validateFrequenceInputValue(frequenceInput.value)
}