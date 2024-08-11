import SignaturePad from "signature_pad";

export const dataURLToBlob = (dataURL: string): Blob => {
    // Code taken from https://github.com/ebidel/filer.js
    const parts = dataURL.split(";base64,");
    const contentType = parts[0].split(":")[1];
    const raw = window.atob(parts[1]);
    const rawLength = raw.length;
    const uInt8Array = new Uint8Array(rawLength);

    for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i);
    }

    return new Blob([uInt8Array], { type: contentType });
}

const downloadSignature = (dataURL: string, fileName: string): void => {
    const blob = dataURLToBlob(dataURL);
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.style.display = "none";
    a.href = url;
    a.download = fileName;

    document.body.appendChild(a);
    a.click();

    window.URL.revokeObjectURL(url);
}

export const downloadSignatureAsPNG = (signaturePad?: SignaturePad) => {

    if(!signaturePad) {
        return
    }
    
    if (!signaturePad.isEmpty()) {
        const dataURL = signaturePad.toDataURL('image/png');
        downloadSignature(dataURL, "signature.png");
    }
}

export const downloadSignatureAsJPG = (signaturePad?: SignaturePad) => {

    if(!signaturePad) {
        return
    }
    
    if (!signaturePad.isEmpty()) {
        const dataURL = signaturePad.toDataURL('image/jpeg');
        downloadSignature(dataURL, "signature.jpg");
    }
}

export const downloadSignatureAsSVG = (signaturePad?: SignaturePad, includeBackground: boolean = false) => {
    
    if(!signaturePad) {
        return
    }

    if (!signaturePad.isEmpty()) {
        const dataURL = signaturePad.toDataURL('image/svg+xml', { 
            includeBackgroundColor: includeBackground
        });
        downloadSignature(dataURL, "signature.svg");
    }
}

export const handleUndo = (signaturePad?: SignaturePad): void => {
    
    if(!signaturePad) {
        return
    }
    
    const data = signaturePad.toData();
    if (data) {
        data.pop(); // remove the last dot or line
        signaturePad.fromData(data);
    }
}