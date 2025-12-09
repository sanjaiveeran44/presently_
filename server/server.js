const express = require("express");
const multer = require("multer");
const dotenv = require("dotenv");
dotenv.config();
const cors = require("cors");
const fs = require("fs-extra");
const path = require("path");
const { exec } = require("child_process");

const { v4: uuidv4 } = require("uuid");

let slideMemory = {
  slides: [],
  json: {}
};

const {
  convertToPDF,
  convertPDFToPNG,
  extractAllSlidesJSON
} = require("./utils/slideProcessor.js");


const app = express();
app.use(cors());
app.use(express.json());


app.use("/slides", express.static(path.join(__dirname, "slides")));


const upload = multer({
  storage: multer.diskStorage({
    destination: "uploads/",
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname);
    },
  }),
});




app.post("/upload", upload.single("ppt"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const inputPath = req.file.path;
    const folderId = uuidv4();
    const outputDir = path.join(__dirname, "slides", folderId);

    await fs.ensureDir(outputDir);

    console.log("Processing upload:", inputPath);
    await convertToPDF(inputPath, outputDir);

    const pdfFile = fs.readdirSync(outputDir).find(f => f.endsWith(".pdf"));
    if (!pdfFile) {
      return res.status(500).json({ error: "PDF generation failed" });
    }

    const pdfPath = path.join(outputDir, pdfFile);

    await convertPDFToPNG(pdfPath, outputDir);

    let slideFiles = fs.readdirSync(outputDir)
      .filter(f => f.endsWith(".png"))
      .sort((a, b) => parseInt(a.match(/\d+/)) - parseInt(b.match(/\d+/)));

    const slideURLs = slideFiles.map(
      f => `http://localhost:5000/slides/${folderId}/${f}`
    );

    console.log("Compressing slides...");
    const base64Slides = [];

    for (const file of slideFiles) {
      const filePath = path.join(outputDir, file);
      const compressed = await compressSlidePNG(filePath);
      base64Slides.push(compressed);
    }

    console.log("Extracting ALL slides JSON (Batch Mode)...");
    const slidesJSON = await extractAllSlidesJSON(
      base64Slides,
      process.env.OPENAI_API_KEY
    );

    slideMemory = {
      folderId,
      slides: slideURLs,
      json: slidesJSON
    };

    console.log("Upload complete ✔");

    return res.json({
      folderId,
      slides: slideURLs,
      json: slidesJSON
    });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return res.status(500).json({ error: err.toString() });
  }
});

app.post("/ask-ai", async (req, res) => {
  try {
    const { prompt, slideNum } = req.body;

    let slideContext = "";

    if (slideNum && slideMemory.json[`slide_${slideNum}`]) {
      const s = slideMemory.json[`slide_${slideNum}`];

      slideContext = `
SLIDE CONTENT:

TITLE:
${s.title}

POINTS:
${s.bullet_points.join("\n")}

KEYWORDS:
${s.keywords.join(", ")}

SUMMARY:
${s.summary}
`;
    }

    const finalPrompt = `
USER QUESTION:
${prompt}

${slideContext}

RESPONSE RULES:
- Write the answer ONLY as short, separate lines.
- DO NOT use bullets like • - * #
- DO NOT use markdown formatting.
- Each point must be on a new line.
- Keep sentences short and clear.
- DO NOT add headings.
- Allowed: normal content characters such as &, *, @ if part of words.
`;

    const aiRes = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        input: [
          {
            role: "user",
            content: [
              { type: "input_text", text: finalPrompt }
            ]
          }
        ]
      })
    });

    const data = await aiRes.json();

    const answer = data.output_text || "No response";

   
    const cleaned = answer
      .replace(/^[•\-\*\#]+\s*/gm, "")  // remove bullets
      .replace(/\n{3,}/g, "\n\n");     // keep spacing clean

    return res.json({ answer: cleaned });

  } catch (err) {
    console.error("AI ERROR:", err);
    res.status(500).json({ error: "AI failed" });
  }
});

app.get("/slide-base64", async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "Missing URL" });

    const filePath = url.replace("http://localhost:5000", __dirname);

    const imageBuffer = await fs.readFile(filePath);
    const base64 = `data:image/png;base64,${imageBuffer.toString("base64")}`;

    res.json({ base64 });

  } catch (err) {
    console.error("Base64 Error:", err);
    res.status(500).json({ error: "Failed to convert slide" });
  }
});

app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
