import { DropdownOption } from "@components/atoms/Buttons/DropdownButton";
import { Pencils } from "../@types/Signature/Pencil.types";

export const defaultBgColor = "rgb(255, 255, 255)";
export const defaultFontColor = "rgb(0, 0, 0)";

export const pencils: Pencils = [
    // { id: 1, label: '0.2', min: 0.15, max: 0.25, description: 'Extremely fine and precise. Used for detailed technical drawing and very fine writing.' },
    // { id: 2, label: '0.3', min: 0.25, max: 0.35, description: 'Very fine. Commonly used for detailed technical drawings, fine writing, and drafting.' },
    { id: 3, label: '0.5', min: 0.45, max: 0.55, description: 'Fine. The most common lead size for general writing and note-taking. Provides a balance between detail and durability.' },
    { id: 4, label: '0.7', min: 0.65, max: 0.75, description: 'Medium. Slightly thicker, preferred for general writing, sketching, and for those who press harder when writing.' },
    { id: 5, label: '0.9', min: 0.85, max: 0.95, description: 'Medium to thick. Used for bolder lines, sketching, and for users who prefer a thicker line or have a heavier hand.' },
    { id: 6, label: '1.0', min: 0.95, max: 1.05, description: 'Thick. Commonly used in mechanical pencils designed for broader strokes and for sketching.' },
    { id: 7, label: '1.15', min: 1.1, max: 1.2, description: 'Medium to thick. Suitable for sketching and writing where a bold line is preferred.' },
    { id: 8, label: '1.8', min: 1.75, max: 1.85, description: 'Thick. Ideal for sketching and creating bold lines.' },
    { id: 9, label: '2.0', min: 1.95, max: 2.05, description: 'Very thick. Ideal for sketching and creating bold lines.' },
];

export const downloadTypes: DropdownOption[] = [
    { label: "PNG", value: "png" },
    { label: "JPG", value: "jpg" },
    { label: "SVG", value: "svg" },
];