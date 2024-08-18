import { useCallback, useEffect, useRef, useState } from "react";
import SignaturePad from "signature_pad";
import ColorInput from "@components/atoms/Inputs/ColorInput";
import { hexToRGB } from "@utils/html";
import { undoSignature } from "@utils/signaturePad";
import { defaultBgColor, pencils } from "@data/Signature.data";
import { Pencil } from "../@types/Signature/Pencil.types";
import CustomButton from "@components/atoms/Buttons/CustomButton";
import DownloadButtons from "@components/molecules/DownloadButtons/DownloadButtons";

const Signature = () => {
  const [bgColor, setBgColor] = useState<string>("#FFFFFF");
  const [fontColor, setFontColor] = useState<string>("#000000");
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [signaturePad, setSignaturePad] = useState<SignaturePad>();
  const [activePencil, setActivePencil] = useState<number>(4);
  const [isSignaturePadEmpty, setIsSignaturePadEmpty] = useState<boolean>(true);

  useEffect(() => {
    document.title = "SignIt";
  }, []);

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
      setSignaturePad(
        new SignaturePad(canvas, {
          backgroundColor: defaultBgColor,
        })
      );
    }
  }, [canvasRef]);

  useEffect(() => {
    if (signaturePad) {
      setIsSignaturePadEmpty(signaturePad.isEmpty());
      if (!signaturePad.isEmpty()) {
        return;
      }

      resizeCanvas();
      signaturePad.on();
      signaturePad.addEventListener("beginStroke", () => {
        console.log("Signature started");
        setIsSignaturePadEmpty(false);
      });
    }

    return () => {
      signaturePad?.off();
    };
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
      const pencil = pencils.find((pencil) => pencil.id === id) as Pencil;
      signaturePad.minWidth = pencil.min;
      signaturePad.maxWidth = pencil.max;
    }
  };

  const handleClearSignature = () => {
    if (signaturePad) {
      signaturePad.clear();
      setIsSignaturePadEmpty(true);
    }
  };

  const handleUndo = () => {
    if (signaturePad) {
      undoSignature(signaturePad);
      setIsSignaturePadEmpty(signaturePad.isEmpty());
    }
  };

  window.addEventListener("resize", resizeCanvas);

  return (
    <>
      <div className="container mx-auto my-10 sm:my-16">
        {/* Signature Pad Controls */}
        <div className="w-full sm:w-8/12 md:w-7/12 lg:w-5/12 xl:w-4/12 mx-auto mb-4 px-4 sm:px-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
            <ColorInput
              className=""
              label="Canvas Background"
              name="background-color"
              value={bgColor}
              onChange={handleBackgroundChange}
            />
            <ColorInput
              className=""
              label="Signature Color"
              name="font-color"
              value={fontColor}
              onChange={handleFontColorChange}
            />
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white">
                Stroke Thickness
              </label>
              <div className="flex justify-between space-x-3">
                {pencils.map((pencil) => (
                  <div
                    key={pencil.id}
                    className={`w-10 h-10 rounded-full flex items-center justify-center border cursor-pointer transition-transform duration-200 text-xs font-normal ${
                      activePencil === pencil.id
                        ? "ring-1 ring-green-500 scale-110 shadow-lg"
                        : "hover:scale-110 shadow-lg"
                    }`}
                    onClick={() => handlePencilClick(pencil.id)}
                  >
                    {pencil.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="sm:col-span-2">
              <label className="block mb-2 text-sm text-left font-medium text-gray-900 dark:text-white">
                Signature Canvas
              </label>
              <canvas
                ref={canvasRef}
                style={{
                  height: "200px",
                }}
                className="shadow-lg w-full border border-gray-300 rounded-md border-inherit border-dashed border-2 max-sm:max-h-[150px]"
              ></canvas>
            </div>
          </div>
          {/* Signature Canvas */}
          <div className="flex flex-row space-x-3 justify-between w-full">
            <CustomButton
              disabled={isSignaturePadEmpty}
              onClick={handleUndo}
              bgColor="bg-pink-100"
              textColor="text-pink-800"
              borderColor="border-pink-500"
              darkBgColor="dark:bg-pink-700"
              darkTextColor="dark:text-pink-400"
            >
              Undo
            </CustomButton>
            <CustomButton
              disabled={isSignaturePadEmpty}
              onClick={handleClearSignature}
              bgColor="bg-gray-100"
              textColor="text-gray-800"
              borderColor="border-gray-500"
              darkBgColor="dark:bg-gray-700"
              darkTextColor="dark:text-gray-400"
            >
              Clear
            </CustomButton>
            {signaturePad && <DownloadButtons signaturePad={signaturePad} />}
          </div>
        </div>
      </div>
    </>
  );
};

export default Signature;
