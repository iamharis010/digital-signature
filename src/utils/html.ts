import { defaultBgColor } from "@data/Signature.data";

export const hexToRGB = (hex: string, defaultColor?: string): string => {
    // Expand shorthand hex code to full form

    const fullHex = hex.replace(
        /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
        (m, r, g, b) => "#" + r + r + g + g + b + b
    );

    // Match the full hex format and convert to RGB
    const result = fullHex.substring(1).match(/.{2}/g);

    // Ensure that result is not null and has exactly 3 components
    if (result && result.length === 3) {
        const rgb = result.map((x) => parseInt(x, 16));
        return "rgb(" + rgb.join(", ") + ")";
    }

    // Return default color if the input is not a valid hex color
    return defaultColor ?? defaultBgColor;
}