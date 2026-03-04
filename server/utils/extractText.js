const fs = require("fs");
const path = require("path");
const { XMLParser } = require("fast-xml-parser");

async function convertToFODP(inputPath, outputDir) {
  return new Promise((resolve, reject) => {
    const cmd = `"C:\\Program Files\\LibreOffice\\program\\soffice.exe" --headless --convert-to fodp "${inputPath}" --outdir "${outputDir}"`;
    require('child_process').exec(cmd, (err) => {
      if (err) return reject(err);
      resolve();
    });
  });
}

async function extractPPTText(fodpPath) {
  try {
    // Read and clean the XML
    let xml = fs.readFileSync(fodpPath, "utf8");
    
    // Try to extract text using a simpler approach first
    const simpleText = extractSimpleText(xml);
    if (simpleText) return simpleText;

    
    return await parseXMLWithParser(xml);
  } catch (error) {
    console.error('Error in extractPPTText:', error);
    return [{ slide: 1, text: "Could not extract text from the presentation" }];
  }
}

function extractSimpleText(xml) {
  try {
   
    const text = xml
      .replace(/<[^>]+>/g, ' ')  // Remove tags
      .replace(/\s+/g, ' ')      // Normalize whitespace
      .trim();
    
    if (text.length > 100) { 
      return [{ slide: 1, text }];
    }
    return null;
  } catch (e) {
    return null;
  }
}

async function parseXMLWithParser(xml) {
  const parser = new XMLParser({
    ignoreAttributes: false,
    attributeNamePrefix: "",
    removeNSPrefix: true,
    isArray: (name) => {
      const arrayFields = ['draw:page', 'text:p', 'text:span', 'text:a'];
      return arrayFields.includes(name);
    }
  });

  try {
    const data = parser.parse(xml);
    const slides = findSlides(data);
    
    if (!slides.length) {
      console.warn('No slides found in the document');
      return [];
    }

    return slides.map((slide, index) => ({
  slide: index + 1,
  text: extractTextFromNode(slide).split(/\s{2,}/)
}));

  } catch (error) {
    console.error('Error parsing XML:', error);
    return null;
  }
}

function findSlides(data) {
  // Try different possible locations for slides
  const possiblePaths = [
    data?.['office:document']?.['draw:page'],
    data?.['office:document']?.['office:body']?.['office:drawing']?.['draw:page'],
    data?.['office:document']?.['office:body']?.['office:presentation']?.['draw:page'],
    data?.['document']?.['body']?.['draw:page'],
    data?.['draw:page']
  ];

  // Find the first non-empty array of slides
  return (possiblePaths.find(slides => Array.isArray(slides) && slides.length > 0) || []);
}

function extractTextFromNode(node) {
  let collected = [];

  function scan(n) {
    if (!n) return;

    if (typeof n === "string") {
      const clean = n.trim();
      if (clean.length > 0) collected.push(clean);
      return;
    }

    if (Array.isArray(n)) {
      n.forEach(scan);
      return;
    }

    if (typeof n === "object") {

      if (n["text:p"]) scan(n["text:p"]);
      if (n["text:h"]) scan(n["text:h"]);
      if (n["text:span"]) scan(n["text:span"]);

      if (n["draw:text-box"]) scan(n["draw:text-box"]);
      if (n["draw:frame"]) scan(n["draw:frame"]);
      if (n["draw:page"]) scan(n["draw:page"]);

      Object.values(n).forEach(scan);
    }
  }

  scan(node);
  return collected.join(" ").trim();
}

function cleanSlideText(slideArray) {
  if (!Array.isArray(slideArray)) return [];

  // 1. Trim and remove empty entries
  let cleaned = slideArray
    .map(item => String(item).trim())
    .filter(item => item.length > 0);

  // 2. Remove standalone bullet symbols
  cleaned = cleaned.filter(item => item !== "•");

  // 3. Merge split technical tokens
  const merged = [];
  for (let i = 0; i < cleaned.length; i++) {
    let current = cleaned[i];

    // merge std:: + name + ()
    if (
      current.endsWith("::") &&
      cleaned[i + 1] &&
      cleaned[i + 2] === "()"
    ) {
      merged.push(current + cleaned[i + 1] + "()");
      i += 2;
      continue;
    }

    // merge >>auto + var + =
    if (current === ">>auto" && cleaned[i + 1]) {
      merged.push(">>auto " + cleaned[i + 1]);
      i += 1;
      continue;
    }

    merged.push(current);
  }

  return merged;
}

module.exports = { convertToFODP, extractPPTText , cleanSlideText };