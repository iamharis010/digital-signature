import {
    downloadSignatureAsJPG,
    downloadSignatureAsPNG,
    downloadSignatureAsSVG,
} from "@utils/signaturePad";
import DropdownButton, {
    DropdownOption,
} from "@components/atoms/Buttons/DropdownButton";
import SignaturePad from "signature_pad";
import { downloadTypes } from "@data/Signature.data";

type DownloadButtonsProps = {
    signaturePad: SignaturePad;
};
const DownloadButtons = ({ signaturePad }: DownloadButtonsProps) => {
    return (
        <DropdownButton
            variantClassName="bg-green-400 hover:bg-green-500 focus:ring-green-200 dark:bg-green-500 dark:hover:bg-green-600 dark:focus:ring-green-700 disabled:opacity-50 disabled:cursor-not-allowed"
            label="Download"
            options={downloadTypes}
            onOptionClick={(option: DropdownOption) => {
                const { value } = option;
                const downloader = {
                    png: downloadSignatureAsPNG,
                    jpg: downloadSignatureAsJPG,
                    svg: (signaturePad: SignaturePad) =>
                        downloadSignatureAsSVG(signaturePad, true),
                }[value];
                downloader?.(signaturePad);
            }}
            disabled={signaturePad.isEmpty()}
        />
    );
};

export default DownloadButtons;
