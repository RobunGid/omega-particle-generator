export function convertRGBtoHSL(RGBstring) {
    const redHex = RGBstring.substring(1, 3);
    const greenHex = RGBstring.substring(3, 5);
    const blueHex = RGBstring.substring(5, 7);

    const redDec = Number(`0x${redHex}`);
    const greenDec = Number(`0x${greenHex}`);
    const blueDec = Number(`0x${blueHex}`);
    
    const primaryRed = redDec / 255;
    const primaryGreen = greenDec / 255;
    const primaryBlue = blueDec / 255;

    const CMAX = Math.max(primaryRed, primaryGreen, primaryBlue);
    const CMIN = Math.min(primaryRed, primaryGreen, primaryBlue);

    const difference = CMAX - CMIN;
    
    const lightness = (CMAX + CMIN) / 2;
    const lightnessString = `${Math.round(lightness * 100)}%`;
    const lightnessValue = Math.round(lightness * 100);

    let saturation;

    if (difference == 0) {
        saturation = 0;
    } else {
        saturation = lightnessValue <= 50 ? difference / (CMAX + CMIN) : difference / (2 - (CMAX + CMIN));
    };
    const saturationString = `${Math.round(saturation * 100)}%`;
    const saturationValue = Math.round(saturation * 100);

    let hue;
    if (difference == 0 ) {
        hue = 0
    }
     else {switch(CMAX){
        case primaryRed: 
            hue = 60 * ((primaryGreen - primaryBlue) / difference % 6);
            if (hue < 0) hue += 360;
            break;

        case primaryGreen:
            hue = 60 * ((primaryBlue - primaryRed) / difference + 2);
            break;

        case primaryBlue:
            hue = 60 * ((primaryRed - primaryGreen) / difference + 4);
            break;
    }
    }

    const hueValue = Math.round(hue);
    const hueString = `${Math.round(hue)}`;

    const hslString = `hsl(${hueString}, ${saturationString}, ${lightnessString})`

    return {hue: hueValue, saturation: saturationValue, lightness: lightnessValue, hslString}
    
}