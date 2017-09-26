function addOpacityToHex(property: string, hex: string, opacity: number): {[k: string]: string} {
    const {r, g, b} = hexToRgb(hex);
    return {[property]: `rgba(${[r, g, b, opacity].join()})`};
}

function hexToRgb(hex: string): {r: number, g: number, b: number} {
    const bigint = parseInt(hex, 16);
    const r = (bigint >> 16) & 255; // tslint:disable-line no-bitwise
    const g = (bigint >> 8) & 255;  // tslint:disable-line no-bitwise
    const b = bigint & 255; // tslint:disable-line no-bitwise

    return {r, g, b};
}
