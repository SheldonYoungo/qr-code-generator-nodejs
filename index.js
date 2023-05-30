import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
// THIS WILL BE THE MESSAGE DISPLAYED WHEN INITIALIZING THE PROGRAM, THE ANSWER WILL BE STORED IN A PROPERTY CALLED "URL"
  .prompt([
    {"message" : "Type in your URL: ", "name" : "URL"}
  ])

  // HANDLING THE ANSWER
  .then((answers) => {

    const url = answers.URL; //Storing the answer inside a constant
  
    try {
      let qr_code = qr.image(url); //Generating the image data
      let domain = new URL(url).hostname; //Converting the url into an URL object to get its domain
      domain = domain.substring(domain.lastIndexOf(".", domain.lastIndexOf(".") - 1) + 1); //Trimming the domain to get only its name

      qr_code.pipe(fs.createWriteStream(`qr_codes/${domain}_qr_code.png`)); //Finally writing the image data inside a .png file with the name of the domain
      
      // Creating a text file to store the given input
      fs.writeFile(`qr_codes/${domain}_input.text`, url, (err) => {
          if(err) throw err;

          console.log("The file has been succesfully saved!!")
      })
    
    // HANDLING ERRORS
    } catch(err) {
      console.log("Invalid URL");
    } 
  })