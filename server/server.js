const express = require("express");
const multer = require("multer");
const cors = require("cors");
const fs = require("fs-extra");
const path = require("path");
const { exec } = require("child_process");

let activeSlides = { images: [], text: [] };


const {
  convertToPDF,
  convertPDFToPNG,
  compressSlidePNG
} = require("./utils/slideProcessor.js");

const {
  convertToFODP,
  extractPPTText,
  cleanSlideText
} = require("./utils/extractText");

const { extractTextFromPPTX } = require("./utils/pptxParser");

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
    const outputDir = path.join(__dirname, "slides", "active");

    // Delete old slides
    await fs.emptyDir(outputDir);

    console.log("Processing upload:", inputPath);

    // -----------------------------
    // 1️⃣ Extract TEXT directly from PPTX (NO LibreOffice)
    // -----------------------------
    console.log("Extracting text from PPTX...");
    const extractedText = extractTextFromPPTX(inputPath); // array of slides
    activeSlides.text = extractedText.map(slide =>
      cleanSlideText(slide)
    );
    console.log("========= PPT TEXT CHECK =========");
    activeSlides.text.forEach((slide, i) => {
    console.log(`Slide ${i + 1}:`);
    console.log(slide);
    });
    console.log("=================================");


    // -----------------------------
    // 2️⃣ Convert PPT → PDF
    // -----------------------------
    await convertToPDF(inputPath, outputDir);

    const pdfFile = fs.readdirSync(outputDir).find(f => f.endsWith(".pdf"));
    const pdfPath = path.join(outputDir, pdfFile);

    // -----------------------------
    // 3️⃣ Convert PDF → PNG slides
    // -----------------------------
    await convertPDFToPNG(pdfPath, outputDir);

    // Collect slide image URLs
    const slideFiles = fs.readdirSync(outputDir)
      .filter(f => f.endsWith(".png"))
      .sort((a, b) => parseInt(a.match(/\d+/)) - parseInt(b.match(/\d+/)));

    const slideURLs = slideFiles.map(f =>
      `http://localhost:5001/slides/active/${f}`
    );

    activeSlides.images = slideURLs;

    console.log("✔ Upload complete");
    console.log("✔ Text extracted:");
    console.log(activeSlides.text);

    return res.json({
      slides: slideURLs,
      totalSlides: slideURLs.length
    });

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return res.status(500).json({ error: err.toString() });
  }
});


app.get("/slide-base64", async (req, res) => {
  try {
    const { url } = req.query;
    if (!url) return res.status(400).json({ error: "Missing URL" });

    const filePath = url.replace("http://localhost:5001", __dirname);

    const imageBuffer = await fs.readFile(filePath);
    const base64 = `data:image/png;base64,${imageBuffer.toString("base64")}`;

    res.json({ base64 });

  } catch (err) {
    console.error("Base64 Error:", err);
    res.status(500).json({ error: "Failed to convert slide" });
  }
});

const PORT = process.env.PORT || 5001;

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}).on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${PORT} is already in use. Please free the port or specify a different port.`);
  } else {
    console.error('Failed to start server:', err);
  }
  process.exit(1);
});
