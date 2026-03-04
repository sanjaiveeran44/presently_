const AdmZip = require("adm-zip");
const { XMLParser } = require("fast-xml-parser");

function extractTextFromPPTX(pptxPath) {
  const zip = new AdmZip(pptxPath);
  const entries = zip.getEntries();
  const parser = new XMLParser({ ignoreAttributes: false });

  let slides = [];

  // Read slide XML files in correct order
  entries
    .filter(e => e.entryName.startsWith("ppt/slides/slide") && e.entryName.endsWith(".xml"))
    .sort((a, b) => {
      const n1 = parseInt(a.entryName.match(/slide(\d+)/)[1]);
      const n2 = parseInt(b.entryName.match(/slide(\d+)/)[1]);
      return n1 - n2;
    })
    .forEach(entry => {
      const xml = entry.getData().toString("utf8");
      const json = parser.parse(xml);

      const textArray = [];

      function walk(node) {
        if (!node) return;

        if (typeof node === "object") {
          if (node["a:t"]) textArray.push(node["a:t"]);
          Object.values(node).forEach(walk);
        }
      }

      walk(json);

      slides.push(textArray);
    });

  return slides;
}

module.exports = { extractTextFromPPTX };
