import { mouse } from "./constants.js";

export function checkIsMouseOnCanvas() {
    document.addEventListener('mousemove', (event) => {

        const settingsElement = document.querySelector('#settings-container');
        const settingsElementRect = settingsElement.getBoundingClientRect();
        
        if (event.x < settingsElementRect.right && event.y < settingsElementRect.bottom) return
        
        isInCenter = false;

        mouse.x = event.x;
        mouse.y = event.y;
        
    }, {once: true})
}