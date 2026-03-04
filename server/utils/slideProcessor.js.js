const fs = require("fs-extra");
const path = require("path");
const { exec } = require("child_process");

const LIBRE = `"C:\\Program Files\\LibreOffice\\program\\soffice.exe"`;
const MAGICK = `"C:\\Program Files\\ImageMagick-7.1.2-Q16-HDRI\\magick.exe"`;
const sharp = require("sharp");

async function compressSlidePNG(filePath) {
  
  const buffer = await sharp(filePath)
    .resize({ width: 900 })       
    .png({ quality: 35 })       
    .toBuffer();

  return `data:image/png;base64,${buffer.toString("base64")}`;
}

function convertToPDF(inputPath, outputDir) {
  return new Promise((resolve, reject) => {
    const cmd = `${LIBRE} --headless --convert-to pdf "${inputPath}" --outdir "${outputDir}"`;

    exec(cmd, (err) => {
      if (err) reject("PPT → PDF failed");
      else resolve();
    });
  });
}

function convertPDFToPNG(pdfPath, outputDir) {
  return new Promise((resolve, reject) => {
    const cmd = `${MAGICK} "${pdfPath}" "${outputDir}\\slide_%d.png"`;

    exec(cmd, (err) => {
      if (err) reject("PDF → PNG failed");
      else resolve();
    });
  });
}

module.exports = {
  convertToPDF,
  convertPDFToPNG,
  compressSlidePNG
};
