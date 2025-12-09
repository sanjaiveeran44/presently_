const fs = require("fs-extra");
const path = require("path");
const { exec } = require("child_process");
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

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

async function extractAllSlidesJSON(base64Slides, apiKey) {
  try {
    const messages = [];

    base64Slides.forEach((img, index) => {
      messages.push({ type: "input_text", text: `Extract JSON for slide ${index + 1}` });
      messages.push({ type: "input_image", image_url: img });
    });

    const systemPrompt = `
Return ONLY pure JSON like:

{
  "slide_1": { "title": "", "bullet_points": [], "keywords": [], "summary": "" },
  "slide_2": {...}
}

NO markdown.
NO explanation.
ONLY the JSON object.
`;

    const res = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${apiKey}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: [
          { role: "user", content: [{ type: "input_text", text: systemPrompt }, ...messages] }
        ]
      })
    });

    const data = await res.json();

    if (!data.output || !data.output[0]?.content?.length) {
      console.log("Batch error:", data);
      throw new Error("AI batch JSON not returned");
    }

    const text = data.output[0].content[0].text;
    return JSON.parse(text);

  } catch (err) {
    console.error("Batch JSON error:", err);
    throw err;
  }
}

module.exports = {
  convertToPDF,
  convertPDFToPNG,
  extractAllSlidesJSON,
  compressSlidePNG
};
