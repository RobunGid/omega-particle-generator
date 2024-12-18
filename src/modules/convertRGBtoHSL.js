export function convertRGBtoHSL(RGBstring) {
    const redHex = RGBstring.substring(1, 3);
    const greenHex = RGBstring.substring(3, 5);
    const blueHex = RGBstring.substring(5, 7);

    const redDec = Number(`0x${redHex}`);
    const greenDec = Number(`0x${greenHex}`);
    const blueDec = Number(`0x${blueHex}`);

    console.log(redDec, greenDec, blueDec)
    
    const primaryRed = redDec / 255;
    const primaryGreen = greenDec / 255;
    const primaryBlue = blueDec / 255;

    const CMAX = Math.max(primaryRed, primaryGreen, primaryBlue);
    const CMIN = Math.min(primaryRed, primaryGreen, primaryBlue);

    const difference = CMAX - CMIN;
    
    const lightness = (CMAX + CMIN) / 2;
    const lightnessString = `${Math.round(lightness * 100)}%`;
    const lightnessValue = Math.round(lightness * 100);

    const saturation = difference == 0 ? 0 : difference / (1 - Math.abs(2 * lightness - 1));
    const saturationString = `${Math.round(saturation * 100)}%`;
    const saturationValue = Math.round(saturation * 100);

    let hue;

    switch(CMAX){
        case primaryRed: 
            hue = 60 * ((primaryGreen - primaryBlue) / difference % 6);
            break;

        case primaryGreen:
            hue = 60 * ((primaryBlue - primaryGreen) / difference + 2);
            break;

        case primaryBlue:
            hue = 60 * ((primaryRed - primaryGreen) / difference + 4)
            break;
    }

    const hueValue = Math.round(hue);
    const hueString = `${Math.round(hue)}`;

    const hslString = `hsl(${hueString}, ${saturationString}, ${lightnessString})`

    return {hue: hueValue, saturation: saturationValue, lightness: lightnessValue, hslString}
    
}