import { useCallback, useEffect, useRef, useState } from "react";
import SignaturePad from "signature_pad";
import ColorInput from "./atoms/Inputs/ColorInput";
import { hexToRGB } from "@utils/html";
import {
    downloadSignatureAsJPG,
    downloadSignatureAsPNG,
    downloadSignatureAsSVG,
    handleUndo,
} from "@utils/signaturePad";
import { defaultBgColor, pencils } from "@data/Signature.data";
import { Pencil } from "../@types/Signature/Pencil.types";
import CustomButton from "./atoms/Buttons/CustomButton";

const Signature = () => {
    const [bgColor, setBgColor] = useState<string>("#FFFFFF");
    const [fontColor, setFontColor] = useState<string>("#000000");
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [signaturePad, setSignaturePad] = useState<SignaturePad>();
    const [activePencil, setActivePencil] = useState<number>(4);

    useEffect(()=> {
        document.title = "SignIt"
    }, [])

    const resizeCanvas = useCallback(() => {
        if (canvasRef.current && signaturePad) {
            const ratio = Math.max(window.devicePixelRatio || 1, 1);
            canvasRef.current.width = canvasRef.current.offsetWidth * ratio;
            canvasRef.current.height = canvasRef.current.offsetHeight * ratio;
            canvasRef.current.getContext("2d")?.scale(ratio, ratio);
            signaturePad.clear();
        }
    }, [canvasRef, signaturePad]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (canvas) {
            setSignaturePad(new SignaturePad(canvas));
        }
    }, [canvasRef]);

    useEffect(() => {
        if (signaturePad) {
            
            if(!signaturePad.isEmpty()) {
                return;
            }

            resizeCanvas();
            signaturePad.on();
        }

        return () => {
            signaturePad?.off();
        }
    }, [signaturePad, resizeCanvas]);

    const handleBackgroundChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setBgColor(e.target.value);
        if (signaturePad) {
            signaturePad.backgroundColor = hexToRGB(e.target.value, defaultBgColor);
            const data = signaturePad.toData();
            signaturePad.clear();
            signaturePad.fromData(data);
        }
    };

    const handleFontColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFontColor(e.target.value);
        if (signaturePad) {
            signaturePad.penColor = e.target.value;
        }
    };

    const handlePencilClick = (id: number) => {
        setActivePencil(id);
        if (signaturePad) {
            const pencil = pencils.find(pencil => pencil.id === id) as Pencil;
            signaturePad.minWidth = pencil.min;
            signaturePad.maxWidth = pencil.max;
        }
    }

    window.addEventListener("resize", resizeCanvas);

    return (
        <div className="container mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <ColorInput
                    label="Background Color"
                    name="background-color"
                    value={bgColor}
                    onChange={handleBackgroundChange}
                />
                <ColorInput
                    label="Font Color"
                    name="font-color"
                    value={fontColor}
                    onChange={handleFontColorChange}
                />
                <div className="w-full">
                    <label
                        className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white"
                    >
                        Pencil Thikness
                    </label>
                    <div className="flex justify-start space-x-3">
                        {pencils.map((pencil) => (
                            <div
                                key={pencil.id}
                                className={`w-10 h-10 rounded-full flex items-center justify-center border cursor-pointer transition-transform duration-200 text-xs font-normal ${
                                    activePencil === pencil.id ? "ring-1 ring-green-500 scale-110 shadow-lg" : "hover:scale-110 shadow-lg"
                                }`}
                                onClick={() => handlePencilClick(pencil.id)}
                            >
                                {pencil.label}
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Signature Canvas */}
            <div className="mx-auto grid grid-cols-1 mb-4 w-100">
                <label className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white">
                    Signature
                </label>
                <canvas
                    ref={canvasRef}
                    style={{
                        display: "block",
                        height: "300px",
                    }}
                    className="w-full border border-gray-300 rounded-md"
                ></canvas>
            </div>

            {/* Footer with Buttons */}
            <div className="flex gap-4 flex-row justify-around md:justify-start flex-wrap">
                <CustomButton onClick={() => handleUndo(signaturePad)} bgColor="bg-pink-100" textColor="text-pink-800" borderColor="border-pink-500" darkBgColor="dark:bg-pink-700" darkTextColor="dark:text-pink-400">
                    Undo
                </CustomButton>
                <CustomButton onClick={() => signaturePad?.clear()} bgColor="bg-gray-100" textColor="text-gray-800" borderColor="border-gray-500" darkBgColor="dark:bg-gray-700" darkTextColor="dark:text-gray-400">
                    Clear
                </CustomButton>
                <CustomButton onClick={() => downloadSignatureAsPNG(signaturePad)} bgColor="bg-green-100" textColor="text-green-800" borderColor="border-green-400" darkBgColor="dark:bg-gray-700" darkTextColor="dark:text-green-400">
                    Download PNG
                </CustomButton>
                <CustomButton onClick={() => downloadSignatureAsJPG(signaturePad)} bgColor="bg-green-100" textColor="text-green-800" borderColor="border-green-400" darkBgColor="dark:bg-gray-700" darkTextColor="dark:text-green-400">
                    Download JPG
                </CustomButton>
                <CustomButton onClick={() => downloadSignatureAsSVG(signaturePad)} bgColor="bg-green-100" textColor="text-green-800" borderColor="border-green-400" darkBgColor="dark:bg-gray-700" darkTextColor="dark:text-green-400">
                    Download SVG
                </CustomButton>
                <CustomButton onClick={() => downloadSignatureAsSVG(signaturePad, true)} bgColor="bg-green-100" textColor="text-green-800" borderColor="border-green-400" darkBgColor="dark:bg-gray-700" darkTextColor="dark:text-green-400">
                    Download SVG + Background
                </CustomButton>
            </div>

            <footer className="w-full text-center py-4">
                <p className="text-gray-600">
                    Introduced with <span className="text-red-500">❤️</span> by Mohammad Haris
                </p>
            </footer>
        </div>
    );
};

export default Signature;
