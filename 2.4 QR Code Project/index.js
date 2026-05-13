/* 
1. Use the inquirer npm package to get user input.
2. Use the qr-image npm package to turn the user entered URL into a QR code image.
3. Create a txt file to save the user input using the native fs node module.
*/
import inquirer from "inquirer";
import qr from "qr-image";
import fs from "fs";

inquirer
  .prompt([
    {
      type: 'input',
      name: 'url',
      message: 'Enter a URL to generate a QR code:',
    },
  ])
  .then((answers) => {
    const qrCodeImage = qr.image(answers.url, { type: 'png' });
    qrCodeImage.pipe(fs.createWriteStream('qrcode.png'));

    fs.writeFile('user_input.txt', answers.url, (err) => {
      if (err) throw err;
      console.log('User input saved to user_input.txt');
    });

    console.log('QR code generated and saved as qrcode.png');
  })
  .catch((error) => {
    if (error.isTtyError) {
      console.error('Prompt couldn\'t be rendered in the current environment');
    } else {
      console.error('An error occurred:', error);
    }
  });

