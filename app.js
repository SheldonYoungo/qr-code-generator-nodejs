import qr from "qr-image";
import express from "express";
import fs from "fs";
import { deletePreviousQR } from "./script.js";

const app = express();

const port = process.env.PORT || 3000;

app.use(express.urlencoded({extended:true}));
app.use(express.static('public'))
// app.use(express.static('public/qr_codes'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index', {qrSource: '', messageDisplay: 'none'});
})

app.post('/', (req, res) => {
    const qrURL = req.body.url;

    let qr_code = qr.image(qrURL); //Generating the image data
    let domain = new URL(qrURL).hostname; //Converting the url into an URL object to get its domain
    domain = domain.substring(domain.lastIndexOf(".", domain.lastIndexOf(".") - 1) + 1); //Trimming the domain to get only its name
    
    // This function checks inside the qr_codes directory an existing qr code todelete it. 
    // It's made to avoid storing lots of qr codes which aren't gonna be useful before the user looks for another qr code.
    deletePreviousQR(); 
    
    qr_code.pipe(fs.createWriteStream(`public/qr_codes/${domain}_qr_code.png`)); //Finally writing the image data inside a .png file with the name of the domain
    
    res.render('index', {qrSource: `${domain}_qr_code.png`, messageDisplay: 'block'});
})

app.listen(port, () => {
  console.log(`Server listening port ${port}`);
})