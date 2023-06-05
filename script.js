import fs from "fs";

function deletePreviousQR() {
    const urlExtentions = ['.com', '.net', '.io', '.gob', '.org', '.us', '.co']; // Parameter to check if the QR name match one of this common domain extentions
    let currentQR = fs.readdirSync('public/qr_codes'); // Looks inside the qr_codes directory and returns an array with the files inside it.
    let filesToDelete; 

    urlExtentions.forEach(extention => {
        currentQR.forEach(qr => {
            if(qr.includes(extention)) {
               filesToDelete = qr;
            }
        })
    })

    fs.unlinkSync(`public/qr_codes/${filesToDelete}`)
}

export {deletePreviousQR};



